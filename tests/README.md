# Citizen — Test Suite

Pure-logic and data-integrity tests for the Citizen civic dashboard. Added as a
hardening pass — **strictly additive**, no source files were changed.

## Running

```bash
node --test "tests/*.test.mts"
```

No new dependencies. Tests use Node's built-in test runner (`node:test`) and
Node 22's native TypeScript type-stripping, so they run straight from the `.ts`
source with no transpile step.

> A harmless `MODULE_TYPELESS_PACKAGE_JSON` performance warning is printed
> because `package.json` has no `"type"` field. It does not affect results.

## Why `.mts`

`tsconfig.json` includes `**/*.ts`, so `next build` type-checks every `.ts`
file in the repo. Node's type-stripping requires explicit `.ts` import
extensions, which the TS checker rejects unless `allowImportingTsExtensions` is
set. Naming the test files `.mts` keeps them out of the build's type-check
(`**/*.ts` does not match `.mts`) while Node still strips and runs them. This
lets the suite live in-repo with zero config changes and a green `next build`.

## Coverage

| File | Under test |
| --- | --- |
| `github-discussions.test.mts` | `formatTimeAgo`, `getDiscussionStats` transform (fetch stubbed) |
| `foundation-components.test.mts` | 16-component data invariants, status maps |
| `foundation-wizard.test.mts` | wizard data invariants |
| `activity-feed.test.mts` | `formatRelativeTime`, activity-feed invariants |
| `cross-data-consistency.test.mts` | `TITLE_TO_SLUG` ↔ components sync (via public API), taxonomy overlap |

## Known gap

The dashboard's scoring/tracking helpers — `getGrowthStage`, `getCategoryHealth`,
`getCurrentTier`, `getNextTier`, `computeStreak` — live un-exported inside
`src/app/foundation/page.tsx` and cannot be imported without changing source.
They are the highest-value untested logic. See `SPRINT_REPORT_citizen-audit.md`
for the recommendation to extract them into `src/lib/`.
