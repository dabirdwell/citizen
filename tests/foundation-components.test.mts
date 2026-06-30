/**
 * Data-integrity tests for src/data/foundation-components.ts
 *
 * The dashboard derives health gauges, growth stages, category averages and
 * sort order directly from this array, so its invariants are load-bearing.
 * These tests guard the shape the UI relies on without touching source.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  foundationComponents,
  statusColors,
  statusLabels,
  type ComponentStatus,
} from "../src/data/foundation-components.ts";

const VALID_STATUSES: ComponentStatus[] = [
  "not_started",
  "planning",
  "active",
  "live",
];
const KEBAB = /^[a-z]+(?:-[a-z]+)*$/;

test("exactly 16 components", () => {
  assert.equal(foundationComponents.length, 16);
});

test("ids are unique and cover 1..16", () => {
  const ids = foundationComponents.map((c) => c.id).sort((a, b) => a - b);
  assert.deepEqual(
    ids,
    Array.from({ length: 16 }, (_, i) => i + 1)
  );
});

test("slugs are unique, non-empty and kebab-case", () => {
  const slugs = foundationComponents.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length, "slugs unique");
  for (const slug of slugs) {
    assert.match(slug, KEBAB, `slug "${slug}" is kebab-case`);
  }
});

test("names and descriptions are non-empty", () => {
  for (const c of foundationComponents) {
    assert.ok(c.name.trim().length > 0, `#${c.id} has a name`);
    assert.ok(
      c.description.trim().length > 0,
      `${c.slug} has a description`
    );
    assert.ok(c.icon.trim().length > 0, `${c.slug} has an icon`);
  }
});

test("status is one of the four valid values", () => {
  for (const c of foundationComponents) {
    assert.ok(
      VALID_STATUSES.includes(c.status),
      `${c.slug} status "${c.status}" is valid`
    );
  }
});

test("progressPct is an integer in [0, 100]", () => {
  for (const c of foundationComponents) {
    assert.ok(Number.isInteger(c.progressPct), `${c.slug} progress integer`);
    assert.ok(
      c.progressPct >= 0 && c.progressPct <= 100,
      `${c.slug} progress in range`
    );
  }
});

test("healthScore is an integer in [0, 100]", () => {
  for (const c of foundationComponents) {
    assert.ok(Number.isInteger(c.healthScore), `${c.slug} health integer`);
    assert.ok(
      c.healthScore >= 0 && c.healthScore <= 100,
      `${c.slug} health in range`
    );
  }
});

test("recentContributors is a non-negative integer", () => {
  for (const c of foundationComponents) {
    assert.ok(
      Number.isInteger(c.recentContributors) && c.recentContributors >= 0,
      `${c.slug} contributors`
    );
  }
});

test("statusColors and statusLabels cover every status", () => {
  for (const s of VALID_STATUSES) {
    assert.ok(statusColors[s], `color for ${s}`);
    assert.ok(statusLabels[s], `label for ${s}`);
  }
  assert.equal(Object.keys(statusColors).length, VALID_STATUSES.length);
  assert.equal(Object.keys(statusLabels).length, VALID_STATUSES.length);
});

/* ── Derived-value sanity: mirror what the dashboard computes ───────── */

test("average health (Foundation gauge) lands in a sane range", () => {
  const avg = Math.round(
    foundationComponents.reduce((s, c) => s + c.healthScore, 0) /
      foundationComponents.length
  );
  assert.ok(avg > 0 && avg <= 100, `avgHealth ${avg} in range`);
});
