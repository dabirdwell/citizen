# Repo Health Audit — Citizen

**ID:** `citizen-20260630`
**Date:** 2026-06-30
**Auditor:** automated additive-hardening pass (overnight, unattended)
**Constraint:** strictly additive — new test files + this report only. **No
existing source was modified.** Build/lint/tests green before and after.

> This audit builds on the prior pass (`SPRINT_REPORT_citizen-audit.md`,
> 36 tests). It does **not** repeat that work; it extends coverage to
> exported logic the prior pass left untested and re-verifies the baseline.

---

## 1. Inventory & baseline

| Aspect | Finding |
| --- | --- |
| Language | TypeScript (strict), React 18, Next.js 14.2.35 (App Router) |
| Styling | Tailwind 3.4 + PostCSS |
| Entry points | 11 pages under `src/app/`, 5 API routes (`ae`, `discussions`, `guardian`, `guardian/chat`, `health`) |
| Data layer | `src/data/*.ts` (static seed) + `src/lib/github-discussions.ts` (live GitHub Discussions via `/api/discussions`) |
| External svc | Anthropic SDK (`@anthropic-ai/sdk` ^0.80.0) for Æ + Guardian chat |
| Test setup | Node 22 built-in `node:test` + native TS type-stripping; `.mts` files, zero test deps |
| Run command | `node --test "tests/*.test.mts"` |

**Baseline checks (this pass):**

| Check | Result |
| --- | --- |
| `npm run build` | ✓ green (19/19 static pages) |
| `npm run lint` | ✓ no warnings or errors |
| `node --test "tests/*.test.mts"` (before) | ✓ 36/36 |
| `node --test "tests/*.test.mts"` (after) | ✓ **58/58** |
| `git status` after pass | only new untracked files (additive confirmed) |

---

## 2. Tests added (this pass)

22 new tests across 4 files, plus one test-only resolver helper. All exercise
**real exported source** (not copies) and target the highest-value
currently-untested *importable* pure logic.

```
tests/guardian-prompt.test.mts        9 tests — getFoundationStatusSummary() +
                                        GUARDIAN_SYSTEM_PROMPT wiring (NEW module)
tests/ae-prompt.test.mts              4 tests — AE_SYSTEM_PROMPT constants (NEW module)
tests/match-slug-precedence.test.mts  5 tests — matchSlug() partial-match precedence
tests/taxonomy-divergence.test.mts    4 tests — activity-feed ↔ canonical taxonomy guard
tests/_ts-extension-resolver.mjs      (helper, not a test) — see note below
```

**Why these:** the prior pass covered the data-array invariants and
`github-discussions`/`activity-feed` formatters. The two **prompt modules were
entirely untested**, yet `getFoundationStatusSummary()` is injected verbatim
into the Guardian system prompt on every request
(`src/app/api/guardian/route.ts:36`, `guardian/chat/route.ts:36`), and
`GUARDIAN_SYSTEM_PROMPT` is both (a) built from the live 16-component reference
and (b) parsed back apart by the public constitution page
(`src/app/guardian/constitution/page.tsx:16`) via a `═══` divider regex. The new
tests lock the serialization contract and that divider/section wiring, so a data
rename or a broken divider surfaces in CI instead of silently shipping.

**Test-only resolver note:** `guardian-prompt.ts` imports
`./foundation-components` **without a file extension** (relying on the
bundler). Node's native TS loader cannot resolve extensionless relative imports,
which is why the prior pass could not test this module. Rather than modify
source, `tests/_ts-extension-resolver.mjs` is a tiny `register()`-able resolver
hook that retries a failing extensionless relative specifier with `.ts`. It is
excluded by the `*.test.mts` glob and never touches the Next build.

---

## 3. Findings (prioritized)

### HIGH

**H1 — Public LLM endpoints have no real abuse/cost protection.**
`src/app/api/ae/route.ts:14-23` and `src/app/api/guardian/chat/route.ts:18-27`
"rate limit" by counting `role:"user"` messages **in the request body**. The
client controls that array, so any caller can send ≤20 messages indefinitely —
there is no IP/session persistence, no auth, no upstream throttle. These are
unauthenticated public routes that each call a **paid** Anthropic API. On a free
civic app this is an unbounded spend / denial-of-wallet risk. *Recommend:*
real server-side rate limiting (per-IP, e.g. Vercel KV / Upstash) before any
launch that exposes these widely.

**H2 — `new Anthropic()` constructed at module top level.**
`src/app/api/ae/route.ts:4` and `guardian/chat/route.ts:8` construct the client
outside the request `try/catch`. If `ANTHROPIC_API_KEY` is unset, the SDK throws
at module evaluation, producing an opaque 500 that bypasses the friendly
error-handling block below it. *Recommend:* construct lazily inside the handler,
or guard for a missing key and return the intended "temporarily unavailable"
message.

**H3 — Dependency vulnerabilities: 9 (5 high, 4 moderate).**
`npm audit` reports highs in `next` (14.2.35), `glob`/`picomatch`/`brace-expansion`
(via `eslint-config-next`), and moderates in `postcss` and `@anthropic-ai/sdk`'s
tree. Full remediation pulls `next@16` (breaking). *Recommend:* schedule a
Next 14→latest-14.2.x patch bump first (non-breaking) and plan the major
separately; most highs are dev/build-time transitive deps, not runtime-exposed.

### MED

**M1 — Three divergent component taxonomies.** (now guarded by a test)
`activity-feed.ts` references **15** component slugs; **13 of them exist in
neither** the dashboard (`foundation-components.ts`) nor the wizard
(`foundation-wizard.ts`) canonical lists — only `accessible-education` and
`secure-voting` overlap. Items in the dashboard's RecentActivity feed therefore
cannot link to any real component page. The wizard and dashboard themselves
share only 8 of 16 slugs (locked by the prior pass). *Recommend:* pick one
canonical taxonomy and derive the others from it.
`tests/taxonomy-divergence.test.mts` now pins the current divergence so any
reconciliation is a deliberate diff.

**M2 — Dashboard streak logic has two conflicting mechanisms.**
`src/app/foundation/page.tsx:991-1009`. `computeStreak()` (L721-729, a 24h-floored
diff) sets `data.streak`, then the mount effect re-decides it via a calendar-day
(`toDateString()`) comparison. The two can disagree: e.g. a ~25h gap that crosses
two calendar boundaries resets the streak even though `computeStreak` would keep
it, while a ~47h gap landing exactly on "yesterday" increments it. The
`computeStreak` return is effectively overridden. *Recommend:* collapse to one
rule (calendar-day is the more intuitive one for a daily streak).

**M3 — Highest-value pure logic is un-exported → untestable as-is.**
`src/app/foundation/page.tsx` defines the most consequential logic locally and
never exports it: `getGrowthStage` (L268, thresholds 86/80 driving every ring
color and the seed/growing/established counts), `getCategoryHealth` (L390),
`getCurrentTier`/`getNextTier` (L738/745), `computeStreak` (L721), and the inline
aggregates `avgHealth`/`communityEngagement`/`contentDepth`/`activeContributorScore`
(L1030-1051). None can be unit-tested without a source change, which this
additive pass deliberately avoids. *Recommend (single highest-leverage fix):*
extract these into `src/lib/dashboard-metrics.ts` and import them into both the
page and a new test file. The suite is ready to point at it.

**M4 — No `test` script in `package.json`.**
The suite is invisible to a new contributor and to CI; it only runs if you
already know the `node --test` incantation. *Recommend:* add
`"test": "node --test \"tests/*.test.mts\""`. (Left untouched here to honor the
additive constraint, but this is the cheapest win on the list.)

### LOW

- **L1 — `formatTimeAgo`/`formatRelativeTime` emit negative output for future
  dates.** `src/lib/github-discussions.ts:142` and `src/data/activity-feed.ts:37`
  produce e.g. `"-3m ago"`. Low impact (server data is historical); a `Math.max(0, …)`
  clamp would harden it.
- **L2 — `getDiscussionStats` labels discussions as "comments."**
  `src/lib/github-discussions.ts:118-126` pushes every top-level discussion into
  `recentComments` using the discussion author/body as a proxy; the UI renders it
  as comment-level activity. Naming oversells the data. Consider
  `RecentDiscussion` or fetching real comments.
- **L3 — Model ids are dated.** `ae/route.ts:26` uses
  `claude-sonnet-4-20250514`; `guardian/chat/route.ts` uses
  `claude-3-5-haiku-20241022`. Both valid but older; consider current models
  (e.g. Haiku 4.5 / Sonnet 4.6) for quality + cost.
- **L4 — Repo clutter.** A stray duplicate `node_modules 2/` directory and a
  `.vercel/` dir sit in the repo root. Harmless but confusing to a new
  contributor; verify they are gitignored / remove the duplicate.
- **L5 — Accessibility (carried from prior pass, not re-verified tonight):**
  form labels lack `htmlFor`/`id` association; chat textareas have no
  `aria-label`; the segmented progress bar (`foundation/page.tsx:453-463`) is a
  mouse-only `<div onClick>`; decorative SVGs lack `aria-hidden`; 13
  `focus:outline-none` with almost no `focus-visible` ring. See the prior report
  §Accessibility for specifics. These are the highest-impact, lowest-effort UX
  fixes.

---

## 4. What a new contributor would hit first

1. **Tests aren't discoverable** (M4) — no `npm test`; the README under `tests/`
   documents the command, but `package.json` doesn't.
2. **Three taxonomies** (M1) — adding a component means touching up to three
   unsynced lists with no single source of truth.
3. **Dashboard logic isn't testable** (M3) — the most important file's logic is
   locked inside the component.

None block a build; all are addressable incrementally.

---

## 5. Recommended next steps (in order)

1. Add the `test` script (M4) — 1 line, unblocks CI + contributors.
2. Add server-side rate limiting to the LLM routes (H1) and make the Anthropic
   client lazy (H2) before any wider launch.
3. Extract dashboard metrics to `src/lib/` (M3); point a test file at
   `getGrowthStage`/`computeStreak`/tier helpers and resolve the streak
   double-logic (M2) in the same change.
4. Reconcile the component taxonomy to one canonical source (M1).
5. Patch-bump dependencies where non-breaking; plan the `next@16` major
   separately (H3).
6. Work the accessibility list (L5) — high user-facing value, low effort.

---

### Regression gate (this pass)

| Check | Before | After |
| --- | --- | --- |
| `npm run build` | ✓ | ✓ |
| `npm run lint` | ✓ | ✓ |
| `node --test "tests/*.test.mts"` | 36/36 | **58/58** |

No source behavior was changed. Main advances on green.
