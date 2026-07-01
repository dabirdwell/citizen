/**
 * Tests for the future-date clamp on the two relative-time formatters.
 *
 *   - formatTimeAgo()       (src/lib/github-discussions.ts)
 *   - formatRelativeTime()  (src/data/activity-feed.ts)
 *
 * Audit finding L1 (REPO_HEALTH_AUDIT_citizen-20260630.md): a timestamp in the
 * future — clock skew between client and server, or a data glitch — used to
 * produce negative output like "-3m ago". The fix clamps the elapsed span to a
 * floor of 0 so a future timestamp reads as the smallest bucket instead.
 *
 * Run with:  node --test "tests/*.test.mts"
 * Zero new dependencies: Node's built-in test runner + TypeScript type stripping.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { formatTimeAgo } from "../src/lib/github-discussions.ts";
import { formatRelativeTime } from "../src/data/activity-feed.ts";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/* ── formatTimeAgo ─────────────────────────────────────────────────── */

test("formatTimeAgo: future timestamp clamps to '0m ago' (no negatives)", () => {
  const future = new Date(Date.now() + 5 * MIN).toISOString();
  const out = formatTimeAgo(future);
  assert.equal(out, "0m ago");
  assert.ok(!out.includes("-"), "output must never contain a minus sign");
});

test("formatTimeAgo: far-future timestamp still clamps to '0m ago'", () => {
  const future = new Date(Date.now() + 10 * DAY).toISOString();
  assert.equal(formatTimeAgo(future), "0m ago");
});

test("formatTimeAgo: past timestamps are unaffected by the clamp", () => {
  // Regression guard — the clamp must not change normal past-date behavior.
  assert.equal(formatTimeAgo(new Date(Date.now() - 5.5 * MIN).toISOString()), "5m ago");
  assert.equal(formatTimeAgo(new Date(Date.now() - 5 * HOUR).toISOString()), "5h ago");
  assert.equal(formatTimeAgo(new Date(Date.now() - 3 * DAY).toISOString()), "3d ago");
});

/* ── formatRelativeTime ────────────────────────────────────────────── */

test("formatRelativeTime: future date clamps to 'just now' (no negatives)", () => {
  const future = new Date(Date.now() + 5 * MIN);
  const out = formatRelativeTime(future);
  assert.equal(out, "just now");
  assert.ok(!out.includes("-"), "output must never contain a minus sign");
});

test("formatRelativeTime: far-future date still clamps to 'just now'", () => {
  const future = new Date(Date.now() + 10 * DAY);
  assert.equal(formatRelativeTime(future), "just now");
});

test("formatRelativeTime: past dates are unaffected by the clamp", () => {
  // Regression guard for the common buckets.
  assert.equal(formatRelativeTime(new Date(Date.now() - 30 * MIN)), "30m ago");
  assert.equal(formatRelativeTime(new Date(Date.now() - 5 * HOUR)), "5h ago");
  assert.equal(formatRelativeTime(new Date(Date.now() - 3 * DAY)), "3d ago");
});
