# Sprint Report — Citizen audit remediation (safe/additive pass)

**ID:** `citizen-remediation`
**Date:** 2026-06-30 (overnight, unattended)
**Envelope:** local commits only; additive and focused; revert on any
build/test/lint regression; no auth/payment/config/secret changes; no deletes
outside scratch.

## Objective

Apply **only** the clearly-safe, additive findings from
`REPO_HEALTH_AUDIT_citizen-20260630.md`. Skip anything needing product judgment
or touching risky core logic, auth, payment, config, or dependencies.

## Baseline (before)

| Check | Result |
| --- | --- |
| `npm run build` | ✓ green |
| `npm run lint` | ✓ no warnings/errors |
| `node --test "tests/*.test.mts"` | ✓ 58/58 |

## Changes applied

### M4 — add the missing `test` npm script (audit's #1 recommendation)
`package.json`: added `"test": "node --test \"tests/*.test.mts\""`.
Pure addition — makes the existing 58-test suite runnable via `npm test` and
discoverable to CI and new contributors. No behavior change.

### L1 — clamp negative relative-time output
A future or clock-skewed timestamp previously rendered as e.g. `"-3m ago"`.
Minimal, clearly-correct fix (one line each):

- `src/lib/github-discussions.ts` — `formatTimeAgo`: `const diffMs = Math.max(0, now - then);`
- `src/data/activity-feed.ts` — `formatRelativeTime`: `const diffMs = Math.max(0, now.getTime() - date.getTime());`

Future timestamps now read as the smallest bucket (`"0m ago"` / `"just now"`).
Past-date behavior is unchanged.

### New tests (additive) — `tests/time-clamp.test.mts` (6 tests)
Confirms the L1 fix for both formatters (future + far-future clamp, no `-`
character in output) and adds regression guards that past-date buckets are
unaffected.

## Verification (after)

| Check | Result |
| --- | --- |
| `npm run build` | ✓ green (all pages compiled) |
| `npm run lint` | ✓ no warnings/errors |
| `npm test` | ✓ **64/64** (58 prior + 6 new) |

No regressions. Every existing test still passes; the two source edits are
covered by new tests.

## Deferred findings (with reason)

| Finding | Reason not applied |
| --- | --- |
| H1 — LLM abuse/cost protection | Needs infra + product judgment; touches paid request handling. |
| H2 — top-level `new Anthropic()` | Auth/API-key handling — excluded by safety rule. |
| H3 — dependency vulnerabilities | Dep/lockfile bumps are potentially breaking (`next@16` major). |
| M1 — divergent taxonomies | Needs a canonical-source product decision; already test-pinned. |
| M2 — streak double-logic | Behavior change to risky core dashboard logic. |
| M3 — extract dashboard metrics | Requires refactoring `foundation/page.tsx` core logic. |
| L2 — "comments" naming | Naming/product judgment; no correctness bug. |
| L3 — dated model ids | Product/cost decision. |
| L4 — repo clutter | Deleting non-scratch files is barred; both are already untracked in git. |
| L5 — accessibility | Broad cross-component UI change; too high blast radius for this envelope. |

## Files touched

```
M package.json                         (+1 line: test script)
M src/lib/github-discussions.ts        (clamp)
M src/data/activity-feed.ts            (clamp)
M REPO_HEALTH_AUDIT_citizen-20260630.md (§6 applied/deferred)
A tests/time-clamp.test.mts            (6 tests)
A SPRINT_REPORT_citizen-remediation.md (this report)
```

Committed locally only. No push, deploy, or config change.
