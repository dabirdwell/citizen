/**
 * Cross-file consistency tests.
 *
 * The dashboard ties three independently-authored data sources together:
 *   - foundation-components.ts  (the live dashboard's 16 components)
 *   - github-discussions.ts     (TITLE_TO_SLUG, used to attribute discussions)
 *   - foundation-wizard.ts      (the contribute wizard's 16 components)
 *
 * matchSlug / TITLE_TO_SLUG are not exported, so we exercise them through the
 * public getDiscussionStats(): feeding a discussion titled with each component
 * name and asserting the resolved slug. This guards the map against drifting
 * out of sync with the dashboard data.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { foundationComponents } from "../src/data/foundation-components.ts";
import { wizardComponents } from "../src/data/foundation-wizard.ts";
import { getDiscussionStats } from "../src/lib/github-discussions.ts";

type FetchLike = typeof globalThis.fetch;

/** Resolve a single discussion title to a component slug via the real pipeline. */
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

test("every dashboard component name resolves to its own slug", async () => {
  for (const c of foundationComponents) {
    const resolved = await slugForTitle(c.name);
    assert.equal(
      resolved,
      c.slug,
      `discussion titled "${c.name}" should map to "${c.slug}" (got ${resolved})`
    );
  }
});

test("slug resolution is case-insensitive", async () => {
  assert.equal(await slugForTitle("HEALTHCARE"), "healthcare");
  assert.equal(await slugForTitle("  Mental Health  "), "mental-health");
});

/*
 * Informational: the wizard taxonomy intentionally diverges from the dashboard
 * taxonomy (e.g. wizard has "clean-water"/"ubi"; dashboard has
 * "thought-privacy"/"energy-access"). This test documents the current overlap
 * so an accidental change to either list is visible in CI output rather than
 * silently shifting. It is NOT asserting they should be equal.
 */
test("documents dashboard/wizard slug overlap (informational)", () => {
  const dash = new Set(foundationComponents.map((c) => c.slug));
  const wiz = new Set(wizardComponents.map((c) => c.slug));
  const shared = [...dash].filter((s) => wiz.has(s)).sort();
  // Current shared slugs at time of writing. If this changes, update the list
  // deliberately — it is a signal that the two taxonomies moved relative to
  // each other.
  assert.deepEqual(shared, [
    "education",
    "food-security",
    "healthcare",
    "housing",
    "information-access",
    "mental-health",
    "thought-privacy",
    "transportation",
  ]);
});
