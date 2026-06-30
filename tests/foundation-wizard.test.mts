/**
 * Data-integrity tests for src/data/foundation-wizard.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import { wizardComponents } from "../src/data/foundation-wizard.ts";

const KEBAB = /^[a-z]+(?:-[a-z]+)*$/;

test("exactly 16 wizard components", () => {
  assert.equal(wizardComponents.length, 16);
});

test("ids are unique and cover 1..16", () => {
  const ids = wizardComponents.map((c) => c.id).sort((a, b) => a - b);
  assert.deepEqual(
    ids,
    Array.from({ length: 16 }, (_, i) => i + 1)
  );
});

test("slugs are unique and kebab-case", () => {
  const slugs = wizardComponents.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length, "slugs unique");
  for (const slug of slugs) {
    assert.match(slug, KEBAB, `slug "${slug}" kebab-case`);
  }
});

test("names, icons and excerpts are non-empty", () => {
  for (const c of wizardComponents) {
    assert.ok(c.name.trim().length > 0, `#${c.id} name`);
    assert.ok(c.icon.trim().length > 0, `${c.slug} icon`);
    assert.ok(c.excerpt.trim().length > 0, `${c.slug} excerpt`);
  }
});

test("every discussionUrl is an https github discussions link", () => {
  for (const c of wizardComponents) {
    assert.match(
      c.discussionUrl,
      /^https:\/\/github\.com\/.+\/discussions/,
      `${c.slug} discussionUrl`
    );
  }
});
