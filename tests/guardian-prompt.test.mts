/**
 * Tests for src/data/guardian-prompt.ts — previously untested, yet load-bearing.
 *
 * `getFoundationStatusSummary()` is injected verbatim into the Guardian system
 * prompt on every chat request (src/app/api/guardian/route.ts L36 and
 * src/app/api/guardian/chat/route.ts L36). `GUARDIAN_SYSTEM_PROMPT` embeds the
 * 16-component reference at module-eval time and is also parsed back apart by
 * the public constitution page (src/app/guardian/constitution/page.tsx L16)
 * using a ═══ divider regex. These tests guard both the data-serialization
 * contract and that divider/section wiring, without touching source.
 *
 * Run with:  node --test "tests/*.test.mts"
 */
import test from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";

// guardian-prompt.ts imports `./foundation-components` extensionlessly, which
// Node's native TS loader cannot resolve. Register a test-only resolver shim
// (see _ts-extension-resolver.mjs) BEFORE dynamically importing the module so
// the real source — not a copy — is exercised. No source files are modified.
register("./_ts-extension-resolver.mjs", import.meta.url);

const {
  GUARDIAN_VERSION,
  GUARDIAN_LAST_UPDATED,
  GUARDIAN_SYSTEM_PROMPT,
  getFoundationStatusSummary,
} = await import("../src/data/guardian-prompt.ts");
import { foundationComponents } from "../src/data/foundation-components.ts";

/* ── getFoundationStatusSummary() ──────────────────────────────────── */

test("status summary has exactly one line per component, in source order", () => {
  const lines = getFoundationStatusSummary().split("\n");
  assert.equal(lines.length, foundationComponents.length);
  assert.equal(lines.length, 16);
});

test("each status line matches the documented format and component data", () => {
  const lines = getFoundationStatusSummary().split("\n");
  foundationComponents.forEach((c, i) => {
    const expected = `- ${c.name}: ${c.status} (${c.progressPct}% complete, health ${c.healthScore}/100) — ${c.currentStatusText}`;
    assert.equal(lines[i], expected, `line ${i} for ${c.slug}`);
  });
});

test("status summary stays in sync if component data changes (recompute equals)", () => {
  // Recomputing from the live array must reproduce the function output exactly;
  // this fails loudly if the serialization format ever drifts from the data.
  const recomputed = foundationComponents
    .map(
      (c) =>
        `- ${c.name}: ${c.status} (${c.progressPct}% complete, health ${c.healthScore}/100) — ${c.currentStatusText}`
    )
    .join("\n");
  assert.equal(getFoundationStatusSummary(), recomputed);
});

test("every component name and health score appears in the summary", () => {
  const summary = getFoundationStatusSummary();
  for (const c of foundationComponents) {
    assert.ok(summary.includes(c.name), `summary mentions ${c.name}`);
    assert.ok(
      summary.includes(`health ${c.healthScore}/100`),
      `summary mentions health for ${c.slug}`
    );
  }
});

/* ── GUARDIAN_SYSTEM_PROMPT — embedded component reference ──────────── */

test("system prompt is a substantial non-empty string", () => {
  assert.equal(typeof GUARDIAN_SYSTEM_PROMPT, "string");
  assert.ok(
    GUARDIAN_SYSTEM_PROMPT.trim().length > 500,
    "prompt should be a real document, not a stub"
  );
});

test("system prompt embeds all 16 component names via the reference block", () => {
  for (const c of foundationComponents) {
    assert.ok(
      GUARDIAN_SYSTEM_PROMPT.includes(c.name),
      `prompt references component "${c.name}"`
    );
  }
});

test("system prompt contains a numbered 1..16 component reference", () => {
  // getFoundationComponentReference() renders `${i + 1}. ${name} — ${desc}`.
  foundationComponents.forEach((c, i) => {
    const line = `${i + 1}. ${c.name} — ${c.description}`;
    assert.ok(
      GUARDIAN_SYSTEM_PROMPT.includes(line),
      `prompt contains numbered reference line ${i + 1} (${c.slug})`
    );
  });
});

test("version and last-updated constants are well-formed", () => {
  assert.match(GUARDIAN_VERSION, /^v\d+\.\d+/);
  assert.match(GUARDIAN_LAST_UPDATED, /^\d{4}-\d{2}-\d{2}$/);
});

/* ── Constitution-page wiring: ═══ divider parsing ─────────────────── */

test("constitution-page regex splits the prompt into titled sections", () => {
  // Mirrors src/app/guardian/constitution/page.tsx exactly. If the prompt's
  // divider format breaks, the public constitution page silently collapses
  // into a single preamble blob — this test catches that regression.
  const sections = GUARDIAN_SYSTEM_PROMPT.split(/═{3,}\n([^\n]+)\n═{3,}/);
  assert.ok(
    sections.length > 1,
    "at least one ═══ divider must be present for section parsing"
  );

  const parsed: { title: string; body: string }[] = [];
  for (let i = 1; i < sections.length; i += 2) {
    parsed.push({
      title: sections[i]?.trim() ?? "",
      body: sections[i + 1]?.trim() ?? "",
    });
  }
  assert.ok(parsed.length >= 1, "produces at least one structured section");
  for (const s of parsed) {
    assert.ok(s.title.length > 0, "every parsed section has a non-empty title");
  }
});
