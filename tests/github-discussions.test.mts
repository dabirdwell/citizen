/**
 * Tests for src/lib/github-discussions.ts
 *
 * Covers the two exported pure/near-pure surfaces:
 *   - formatTimeAgo()        — relative-time formatting
 *   - getDiscussionStats()   — fetch + transform pipeline (fetch stubbed)
 *
 * Run with:  node --test "tests/*.test.mts"
 * Zero new dependencies: Node's built-in test runner + TypeScript type stripping.
 * In Node, `typeof window === "undefined"`, so the sessionStorage cache layer
 * is bypassed and we exercise the live transform path on every call.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  formatTimeAgo,
  getDiscussionStats,
} from "../src/lib/github-discussions.ts";

/* helper: an ISO string N milliseconds in the past */
const agoIso = (ms: number) => new Date(Date.now() - ms).toISOString();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

test("formatTimeAgo: sub-hour renders minutes", () => {
  assert.equal(formatTimeAgo(agoIso(30_000)), "0m ago"); // 30s floors to 0m
  assert.equal(formatTimeAgo(agoIso(5.5 * MIN)), "5m ago");
  assert.equal(formatTimeAgo(agoIso(59 * MIN)), "59m ago");
});

test("formatTimeAgo: crosses into hours at 60 minutes", () => {
  assert.equal(formatTimeAgo(agoIso(65 * MIN)), "1h ago");
  assert.equal(formatTimeAgo(agoIso(5 * HOUR)), "5h ago");
  assert.equal(formatTimeAgo(agoIso(23 * HOUR)), "23h ago");
});

test("formatTimeAgo: crosses into days at 24 hours", () => {
  assert.equal(formatTimeAgo(agoIso(25 * HOUR)), "1d ago");
  assert.equal(formatTimeAgo(agoIso(10 * DAY)), "10d ago");
  assert.equal(formatTimeAgo(agoIso(29 * DAY)), "29d ago");
});

test("formatTimeAgo: crosses into months at 30 days", () => {
  assert.equal(formatTimeAgo(agoIso(31 * DAY)), "1mo ago");
  assert.equal(formatTimeAgo(agoIso(75 * DAY)), "2mo ago");
});

/* ── getDiscussionStats: fetch stubbed ─────────────────────────────── */

type FetchLike = typeof globalThis.fetch;

/** Temporarily replace global fetch with a canned JSON response. */
async function withFetch(
  responder: () => { ok: boolean; status?: number; json: () => Promise<unknown> },
  body: () => Promise<void>
) {
  const original = globalThis.fetch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.fetch = (async () => responder()) as unknown as FetchLike;
  // Silence the expected console.warn on the error paths.
  const warn = console.warn;
  console.warn = () => {};
  try {
    await body();
  } finally {
    globalThis.fetch = original;
    console.warn = warn;
  }
}

test("getDiscussionStats: maps known titles to component slugs", async () => {
  await withFetch(
    () => ({
      ok: true,
      json: async () => [
        {
          number: 1,
          title: "Healthcare",
          html_url: "https://example.com/1",
          comments: 4,
          updated_at: "2026-01-02T00:00:00Z",
          created_at: "2026-01-01T00:00:00Z",
          user: { login: "alice" },
          body: "a thoughtful comment",
        },
        {
          number: 2,
          title: "Food Security in Oklahoma", // partial match → food-security
          html_url: "https://example.com/2",
          comments: 1,
          updated_at: "2026-01-03T00:00:00Z",
          created_at: "2026-01-01T00:00:00Z",
          user: { login: "bob" },
          body: "another comment",
        },
      ],
    }),
    async () => {
      const { stats } = await getDiscussionStats();
      const bySlug = Object.fromEntries(stats.map((s) => [s.componentSlug, s]));
      assert.ok(bySlug["healthcare"], "healthcare stat present");
      assert.equal(bySlug["healthcare"].commentCount, 4);
      assert.equal(bySlug["healthcare"].discussionUrl, "https://example.com/1");
      assert.equal(bySlug["healthcare"].lastActivity, "2026-01-02T00:00:00Z");
      assert.ok(bySlug["food-security"], "partial-match slug resolved");
    }
  );
});

test("getDiscussionStats: non-matching titles produce no stat but still feed recent activity", async () => {
  await withFetch(
    () => ({
      ok: true,
      json: async () => [
        {
          number: 9,
          title: "General Announcements",
          html_url: "https://example.com/9",
          comments: 0,
          updated_at: "2026-01-05T00:00:00Z",
          created_at: "2026-01-01T00:00:00Z",
          user: { login: "carol" },
          body: "welcome",
        },
      ],
    }),
    async () => {
      const { stats, recentComments } = await getDiscussionStats();
      assert.equal(stats.length, 0, "no stat for unmatched title");
      assert.equal(recentComments.length, 1, "recent activity still includes it");
      assert.equal(recentComments[0].discussionTitle, "General Announcements");
    }
  );
});

test("getDiscussionStats: recentComments sorted newest-first and capped at 5", async () => {
  const mk = (n: number, updated: string) => ({
    number: n,
    title: `Topic ${n}`,
    html_url: `https://example.com/${n}`,
    comments: 0,
    updated_at: updated,
    created_at: "2026-01-01T00:00:00Z",
    user: { login: `u${n}` },
    body: `body ${n}`,
  });
  await withFetch(
    () => ({
      ok: true,
      json: async () => [
        mk(1, "2026-01-01T00:00:00Z"),
        mk(2, "2026-01-07T00:00:00Z"),
        mk(3, "2026-01-03T00:00:00Z"),
        mk(4, "2026-01-06T00:00:00Z"),
        mk(5, "2026-01-02T00:00:00Z"),
        mk(6, "2026-01-05T00:00:00Z"),
        mk(7, "2026-01-04T00:00:00Z"),
      ],
    }),
    async () => {
      const { recentComments } = await getDiscussionStats();
      assert.equal(recentComments.length, 5, "capped at 5");
      const times = recentComments.map((c) => new Date(c.createdAt).getTime());
      const sortedDesc = [...times].sort((a, b) => b - a);
      assert.deepEqual(times, sortedDesc, "newest first");
      assert.equal(recentComments[0].author, "u2", "Jan 7 item is first");
    }
  );
});

test("getDiscussionStats: body truncated to 120 chars; missing fields fall back", async () => {
  const longBody = "x".repeat(500);
  await withFetch(
    () => ({
      ok: true,
      json: async () => [
        {
          number: 1,
          title: "Education",
          html_url: "https://example.com/1",
          comments: 2,
          updated_at: "2026-01-02T00:00:00Z",
          created_at: "2026-01-01T00:00:00Z",
          // no user, no body
        },
        {
          number: 2,
          title: "Housing",
          html_url: "https://example.com/2",
          comments: 0,
          updated_at: "", // empty → falls back to created_at
          created_at: "2026-01-01T00:00:00Z",
          user: { login: "dave" },
          body: longBody,
        },
      ],
    }),
    async () => {
      const { recentComments } = await getDiscussionStats();
      const byTitle = Object.fromEntries(
        recentComments.map((c) => [c.discussionTitle, c])
      );
      // Missing user → "anonymous"; missing body → title text.
      assert.equal(byTitle["Education"].author, "anonymous");
      assert.equal(byTitle["Education"].body, "Education");
      // Long body sliced to 120 chars.
      assert.equal(byTitle["Housing"].body.length, 120);
      // Empty updated_at falls back to created_at.
      assert.equal(byTitle["Housing"].createdAt, "2026-01-01T00:00:00Z");
    }
  );
});

test("getDiscussionStats: non-OK response degrades to empty data", async () => {
  await withFetch(
    () => ({ ok: false, status: 503, json: async () => [] }),
    async () => {
      const result = await getDiscussionStats();
      assert.deepEqual(result, { stats: [], recentComments: [] });
    }
  );
});

test("getDiscussionStats: thrown fetch error degrades to empty data", async () => {
  const original = globalThis.fetch;
  const warn = console.warn;
  console.warn = () => {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as unknown as FetchLike;
  try {
    const result = await getDiscussionStats();
    assert.deepEqual(result, { stats: [], recentComments: [] });
  } finally {
    globalThis.fetch = original;
    console.warn = warn;
  }
});
