# Sprint Report — Citizen Audit (Hardening Pass)

**Date:** 2026-06-29
**Scope:** Add a test suite for core pure logic; document bugs, untested areas,
and accessibility gaps. Strictly additive — **no existing source was modified.**

---

## What changed

Five new test files plus a README under `tests/`, and this report. Nothing else.

```
tests/github-discussions.test.mts      formatTimeAgo + getDiscussionStats transform
tests/foundation-components.test.mts    16-component data invariants
tests/foundation-wizard.test.mts        wizard data invariants
tests/activity-feed.test.mts            formatRelativeTime + feed invariants
tests/cross-data-consistency.test.mts   TITLE_TO_SLUG ↔ components sync
tests/README.md                         how to run / why .mts
```

**36 tests, all passing.**

### Test approach (zero new dependencies)

The repo had no test runner. Rather than add Jest and its transitive tree, the
suite uses Node 22's built-in `node:test` runner with native TypeScript
type-stripping — it runs directly against the `.ts` source. Files are named
`.mts` so the `**/*.ts` include in `tsconfig.json` does not pick them up during
`next build` (Node's type-stripping needs explicit `.ts` import extensions,
which the TS checker would otherwise reject). Net result: the suite lives
in-repo, runs with one command, and `next build` stays green with no config
changes.

```bash
node --test "tests/*.test.mts"
```

If you'd like a shorter invocation, the one additive follow-up worth making is a
`"test": "node --test \"tests/*.test.mts\""` line in `package.json` — I left
`package.json` untouched to honor the "new test files only" constraint.

### Regression gate

| Check | Result |
| --- | --- |
| `npm run build` (baseline, before changes) | ✓ green |
| `npm run build` (with test files present) | ✓ green |
| `npm run lint` | ✓ no warnings or errors |
| `node --test "tests/*.test.mts"` | ✓ 36/36 pass |

`npm ci` was run once to install dependencies (they were absent); it did not
modify `package.json` or `package-lock.json`. Only `tests/` and this report are
new in git.

---

## Untested areas (prioritized)

### 1. Dashboard scoring/tracking helpers are un-exported — highest value, untestable as-is
`src/app/foundation/page.tsx` contains the most consequential pure logic, all
defined locally and not exported:

- `getGrowthStage(healthScore)` — thresholds 86 / 80 that drive every ring color
  and the "seed / growing / established" counts.
- `getCategoryHealth(category)` — per-category average shown as "avg N".
- `getCurrentTier` / `getNextTier` — the citizen tier ladder (0 / 1 / 8 / 16).
- `computeStreak(data)` and the streak/visit logic in the mount `useEffect`.
- The inline health aggregates: `avgHealth`, `communityEngagement`
  (`/80 * 100`), `contentDepth` (`progress avg * 2.5`), `activeContributorScore`
  (`/50 * 100`).

**Recommendation:** extract these into `src/lib/dashboard-metrics.ts` and import
them into both the page and a test file. This is the single change that would
most improve testability. I did not do it tonight (source-change constraint),
but the tests are ready to be pointed at it.

### 2. Streak logic has a redundant/likely-buggy branch (see Bugs §)
Worth a unit test once extracted — the streak can be computed twice with
conflicting rules on mount.

### 3. API routes (`/api/discussions`, `/api/ae`, `/api/guardian/*`, `/api/health`)
Not covered. These involve `fetch`/streaming/Anthropic SDK and need integration
harnessing rather than pure-logic tests; out of scope for this additive pass.

---

## Bugs & correctness issues (prioritized)

### P2 — Streak double-counts / conflicting logic on mount
`src/app/foundation/page.tsx` ~L991-1009. `computeStreak()` is called first
(returns `data.streak` if `diffDays <= 1`, else resets to 1). Then a second
block re-derives the streak from `toDateString()` comparison and may `++` or
reset again. The two mechanisms can disagree (e.g. same-day second visit vs.
"yesterday" detection). Behavior is hard to predict and untested. Consolidate
into one rule.

### P3 — `formatTimeAgo` / `formatRelativeTime` produce negative output for future dates
`src/lib/github-discussions.ts` L142 and `src/data/activity-feed.ts` L37. A
timestamp in the future yields `"-3m ago"`. Low impact (server data is
historical) but a clamp at 0 would be safer. Documented by tests, not asserted
as failure.

### P3 — `getDiscussionStats` recent-activity items are mislabeled as comments
`src/lib/github-discussions.ts` L118-126. Every top-level discussion is pushed
into `recentComments` using the discussion **author** and **body** as a proxy
for "recent activity," and the UI renders it as "{author} in {title}" with the
body as a comment snippet. The type is `DiscussionComment` and the UI implies
comment-level activity, but the data is discussion-level. Also, non-Foundation
discussions (no slug match) still appear in the activity feed. Functionally
fine, but the naming/labeling oversells what is shown. Consider renaming to
`RecentDiscussion` or fetching real comments.

### P3 — Three divergent component taxonomies
- `foundation-components.ts` (dashboard): 16 slugs incl. `digital-access`,
  `civic-participation`, `economic-security`, `legal-protection`,
  `cultural-enrichment`, `secure-voting`, `thought-privacy`, `energy-access`.
- `foundation-wizard.ts` (contribute wizard): 16 **different** slugs incl.
  `safety`, `clean-water`, `safe-spaces`, `social-contract`,
  `sustainable-energy`, `skills-training`, `accessible-education`, `ubi`.
- `activity-feed.ts`: yet a third set (`healthcare-access`,
  `ai-labor-transition`, `democratic-ai-governance`, …).

Only 8 slugs overlap between dashboard and wizard (locked in by a test). This is
not a crash, but it means a contributor's wizard category may not correspond to
any dashboard component, and the seed activity feed references components that
don't exist in either canonical list. Worth reconciling to one source of truth.

---

## Accessibility gaps (prioritized)

### A1 — Form labels are not programmatically associated
0 of 10 `<label>` elements use `htmlFor`/`id` (or wrap their input). Labels in
`contributions`, `stories`, `contribute` forms are visually adjacent only;
screen readers will not reliably announce them with their field. Fix: add
`htmlFor`/`id` pairs or nest the input inside the `<label>`.

### A2 — Chat textareas have no accessible name
`src/app/ae/page.tsx` L290 and `src/app/guardian/page.tsx` L410: the message
`<textarea>` relies on a `placeholder` only (placeholders are not accessible
names). Add `aria-label="Message"` (the send buttons already have one).

### A3 — Keyboard-inoperable control
`src/app/foundation/page.tsx` L453-463: the segmented progress bar segments are
`<div onClick>` with no `tabIndex`, `role`, or key handler — not reachable or
operable by keyboard. The category grid below uses real `<a>` elements (good),
so the function is reachable elsewhere, but the segment control itself is
mouse-only. Make it a `<button>` or add `role="button"` + `tabIndex={0}` +
key handling.

### A4 — Decorative icons not hidden from assistive tech
85 inline `<svg>` icons, 0 with `aria-hidden="true"`. Screen readers may
announce them as empty graphics. Add `aria-hidden="true"` to decorative icons
(and an accessible name where an icon is the only content of a control).

### A5 — Weak keyboard focus indicator
13 occurrences of `focus:outline-none`, with only 1 `focus-visible`/`focus:ring`
in the codebase. Several inputs remove the outline and signal focus only via a
border-color change (e.g. `focus:border-teal-600` on a dark field) — low
contrast for keyboard users. Pair `focus:outline-none` with a visible
`focus-visible:ring` or keep an outline.

### A6 — Icon-only mobile menu trigger has no label
`src/app/layout.tsx` L85: the hamburger `<summary>` contains only an SVG and no
accessible name. Add `aria-label="Menu"`. (Using `<details>/<summary>` for the
menu is otherwise natively keyboard-accessible — good choice.)

### A7 — No skip-to-content link
No skip link before the sticky nav; keyboard users tab through the full nav on
every page. Add a visually-hidden "Skip to content" anchor targeting `<main>`.

**Not verified tonight:** color-contrast ratios (the warm-400/warm-500 grays on
dark backgrounds and the gold/teal accents should be checked against WCAG AA
with a contrast tool — several small `text-[10px]`/`text-warm-500` labels look
borderline).

---

## What David should review

1. **Decide on extracting dashboard metrics** into `src/lib/` so the scoring and
   streak logic can be unit-tested (untested area #1). The suite is ready for it.
2. **Streak logic (P2)** — confirm intended behavior, then collapse the two
   conflicting branches into one.
3. **Taxonomy reconciliation (P3)** — pick one canonical component list; the
   wizard and activity feed currently diverge from the dashboard.
4. **Accessibility A1–A3** are the highest-impact, lowest-effort fixes (label
   association, textarea labels, keyboard-operable segment control).
5. Optionally add a `"test"` script to `package.json` (left untouched per the
   additive constraint).

No source behavior was changed; main advances on green.
