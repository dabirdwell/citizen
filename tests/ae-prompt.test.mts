/**
 * Tests for src/data/ae-prompt.ts — previously untested.
 *
 * AE_SYSTEM_PROMPT is sent as the `system` field on every Æ chat request
 * (src/app/api/ae/route.ts L28). An empty or malformed prompt would silently
 * degrade every conversation, so these guards lock the basic shape of the
 * exported constants without asserting the prose itself.
 *
 * Run with:  node --test "tests/*.test.mts"
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  AE_VERSION,
  AE_LAST_UPDATED,
  AE_SYSTEM_PROMPT,
} from "../src/data/ae-prompt.ts";

test("AE_SYSTEM_PROMPT is a substantial non-empty string", () => {
  assert.equal(typeof AE_SYSTEM_PROMPT, "string");
  assert.ok(
    AE_SYSTEM_PROMPT.trim().length > 200,
    "system prompt should be a real document, not a stub"
  );
});

test("AE_SYSTEM_PROMPT identifies itself as Æ", () => {
  assert.ok(AE_SYSTEM_PROMPT.includes("Æ"), "prompt names the Æ persona");
});

test("AE_VERSION is a version-shaped string", () => {
  assert.match(AE_VERSION, /v\d+\.\d+/);
});

test("AE_LAST_UPDATED is an ISO calendar date", () => {
  assert.match(AE_LAST_UPDATED, /^\d{4}-\d{2}-\d{2}$/);
  // And it parses to a real date.
  assert.ok(!Number.isNaN(new Date(AE_LAST_UPDATED).getTime()));
});
