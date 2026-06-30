/**
 * Tests for src/data/activity-feed.ts
 *   - formatRelativeTime() — relative-time formatting (distinct from the
 *     github-discussions formatTimeAgo: this one has "just now" and "yesterday")
 *   - activityFeed / icon + color maps — data integrity
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  activityFeed,
  formatRelativeTime,
  activityTypeIcons,
  activityTypeColors,
  type ActivityItem,
} from "../src/data/activity-feed.ts";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const ago = (ms: number) => new Date(Date.now() - ms);

const VALID_TYPES: ActivityItem["type"][] = [
  "contribution",
  "discussion",
  "essay_update",
];

test("formatRelativeTime: under a minute is 'just now'", () => {
  assert.equal(formatRelativeTime(ago(30_000)), "just now");
  assert.equal(formatRelativeTime(ago(0)), "just now");
});

test("formatRelativeTime: minutes bucket", () => {
  assert.equal(formatRelativeTime(ago(5.5 * MIN)), "5m ago");
  assert.equal(formatRelativeTime(ago(59 * MIN)), "59m ago");
});

test("formatRelativeTime: hours bucket", () => {
  assert.equal(formatRelativeTime(ago(90 * MIN)), "1h ago");
  assert.equal(formatRelativeTime(ago(23 * HOUR)), "23h ago");
});

test("formatRelativeTime: exactly one day is 'yesterday'", () => {
  assert.equal(formatRelativeTime(ago(25 * HOUR)), "yesterday");
});

test("formatRelativeTime: multiple days", () => {
  assert.equal(formatRelativeTime(ago(2 * DAY + HOUR)), "2d ago");
  assert.equal(formatRelativeTime(ago(10 * DAY)), "10d ago");
});

test("activityFeed: 20 items with unique ids", () => {
  assert.equal(activityFeed.length, 20);
  const ids = activityFeed.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length, "ids unique");
});

test("activityFeed: every item is well-formed and in the past", () => {
  const now = Date.now();
  for (const item of activityFeed) {
    assert.ok(VALID_TYPES.includes(item.type), `#${item.id} valid type`);
    assert.ok(item.text.trim().length > 0, `#${item.id} has text`);
    assert.ok(item.component.trim().length > 0, `#${item.id} has component`);
    assert.ok(item.timestamp instanceof Date, `#${item.id} timestamp is Date`);
    assert.ok(
      item.timestamp.getTime() <= now,
      `#${item.id} timestamp not in the future`
    );
  }
});

test("activityTypeIcons and activityTypeColors cover every type", () => {
  for (const t of VALID_TYPES) {
    assert.ok(activityTypeIcons[t], `icon for ${t}`);
    assert.ok(activityTypeColors[t], `color for ${t}`);
  }
});
