/**
 * Precedence + edge-case tests for the (unexported) matchSlug() in
 * src/lib/github-discussions.ts, exercised through the public
 * getDiscussionStats() pipeline (fetch stubbed).
 *
 * The existing cross-data-consistency suite covers exact-name, case, and
 * whitespace resolution. This file targets the *partial-match* branch
 * (L44-48), whose behavior is order-dependent and currently unguarded:
 *
 *   - a title that merely CONTAINS a component phrase resolves to it;
 *   - when a title contains more than one component phrase, the winner is the
 *     FIRST key in TITLE_TO_SLUG insertion order, NOT the first to appear in
 *     the title — a subtle contract worth locking against map reordering;
 *   - the bare word "access" (shared by several phrases) must NOT match,
 *     because only full phrases are keys.
 *
 * Run with:  node --test "tests/*.test.mts"
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getDiscussionStats } from "../src/lib/github-discussions.ts";

type FetchLike = typeof globalThis.fetch;

/** Resolve a single discussion title through the real transform pipeline. */
async function slugForTitle(title: string): Promise<string | null> {
  const original = globalThis.fetch;
  const warn = console.warn;
  console.warn = () => {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.fetch = (async () => ({
    ok: true,
    json: async () => [
      {
        number: 1,
        title,
        html_url: "https://example.com/1",
        comments: 0,
        updated_at: "2026-01-01T00:00:00Z",
        created_at: "2026-01-01T00:00:00Z",
        user: { login: "t" },
        body: "b",
      },
    ],
  })) as unknown as FetchLike;
  try {
    const { stats } = await getDiscussionStats();
    return stats[0]?.componentSlug ?? null;
  } finally {
    globalThis.fetch = original;
    console.warn = warn;
  }
}

test("partial match: a phrase embedded mid-title still resolves", async () => {
  assert.equal(
    await slugForTitle("Let's improve mental health support in clinics"),
    "mental-health"
  );
  assert.equal(
    await slugForTitle("Notes on secure voting infrastructure"),
    "secure-voting"
  );
});

test("multi-phrase title resolves to the first key in map order, not title order", async () => {
  // "healthcare" precedes "education" in TITLE_TO_SLUG, so both orderings of
  // the title must resolve to healthcare. If they ever diverge, the map order
  // (or matchSlug's loop) changed.
  assert.equal(
    await slugForTitle("Education and Healthcare town hall"),
    "healthcare"
  );
  assert.equal(
    await slugForTitle("Healthcare and Education town hall"),
    "healthcare"
  );
});

test("a later-in-map phrase wins only when no earlier phrase is present", async () => {
  // "transportation" sits after the human-needs block; with no earlier phrase
  // in the title it resolves cleanly.
  assert.equal(
    await slugForTitle("Rural transportation access study"),
    "transportation"
  );
});

test("the bare word 'access' does not over-match (only full phrases are keys)", async () => {
  // "digital access", "civic participation"… are keys; "access" alone is not.
  assert.equal(await slugForTitle("Access denied: a postmortem"), null);
});

test("unrelated titles resolve to no component", async () => {
  assert.equal(await slugForTitle("Weekly community standup"), null);
  assert.equal(await slugForTitle(""), null);
});
