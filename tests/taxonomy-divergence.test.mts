/**
 * Taxonomy-divergence guard (informational), complementing
 * cross-data-consistency.test.mts.
 *
 * Citizen carries THREE independently-authored component taxonomies:
 *   - foundation-components.ts (dashboard, 16 slugs)
 *   - foundation-wizard.ts     (contribute wizard, 16 slugs)
 *   - activity-feed.ts         (seed activity, references its own slugs)
 *
 * The existing cross-data suite locks the dashboard↔wizard overlap. This file
 * locks the activity-feed's relationship to the canonical (dashboard ∪ wizard)
 * set, which is currently almost entirely disjoint: 13 of the feed's 15 slugs
 * exist in NEITHER canonical list. These tests do NOT assert the lists *should*
 * match — they make the current divergence explicit so any reconciliation (or
 * accidental drift) shows up as a deliberate diff in CI rather than silently.
 *
 * See REPO_HEALTH_AUDIT — finding "Three divergent component taxonomies".
 *
 * Run with:  node --test "tests/*.test.mts"
 */
import test from "node:test";
import assert from "node:assert/strict";
import { foundationComponents } from "../src/data/foundation-components.ts";
import { wizardComponents } from "../src/data/foundation-wizard.ts";
import { activityFeed } from "../src/data/activity-feed.ts";

const dashSlugs = new Set(foundationComponents.map((c) => c.slug));
const wizSlugs = new Set(wizardComponents.map((c) => c.slug));
const canonical = new Set([...dashSlugs, ...wizSlugs]);
const feedSlugs = [...new Set(activityFeed.map((a) => a.component))].sort();

test("activity feed references 15 distinct component slugs", () => {
  assert.equal(feedSlugs.length, 15);
});

test("only two feed slugs exist in the canonical (dashboard ∪ wizard) set", () => {
  const present = feedSlugs.filter((s) => canonical.has(s)).sort();
  // accessible-education (wizard) + secure-voting (dashboard) are the sole
  // overlaps. If this grows, the taxonomies are converging — good, but update
  // this list deliberately.
  assert.deepEqual(present, ["accessible-education", "secure-voting"]);
});

test("the remaining 13 feed slugs map to NO real component anywhere", () => {
  // These are rendered in the dashboard's RecentActivity feed but cannot be
  // linked to a component page, because no taxonomy defines them.
  const orphans = feedSlugs.filter((s) => !canonical.has(s)).sort();
  assert.deepEqual(orphans, [
    "ai-labor-transition",
    "algorithmic-transparency",
    "community-networks",
    "creative-commons-ai",
    "democratic-ai-governance",
    "digital-commons",
    "disability-accessibility",
    "environmental-stewardship",
    "healthcare-access",
    "indigenous-data-sovereignty",
    "information-freedom",
    "privacy-infrastructure",
    "universal-basic-compute",
  ]);
});

test("every feed slug is a non-empty kebab-case string", () => {
  const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  for (const s of feedSlugs) {
    assert.match(s, KEBAB, `feed slug "${s}" is kebab-case`);
  }
});
