# Sprint Report — Echo

**Item:** Fleet_Survey_2026-07-06 · RANKED_B #7
**File:** `src/app/contribute/page.tsx`
**Date:** 2026-07-07

## Problem
The Contribution Wizard captured a citizen's written contribution into React
state and then threw it away. The state's read value was discarded at the
declaration (`const [, setSubmittedText] = useState("")`), and the thank-you
screen (`StepConfirmation`) never received the text. A citizen poured out their
vision for a Foundation component, hit Submit, and saw only a generic
acknowledgement. Their own words vanished. A stale "Will be POSTed to Formspree
in a future iteration" comment marked the dead path.

## Change
Reflect the citizen's own words back on the thank-you screen — their voice,
returned to them.

- **`ContributeWizard`** — read the captured text instead of discarding it:
  `const [submittedText, setSubmittedText] = useState("")`. Removed the stale
  Formspree comments (the discard-path this resolves).
- **`handleSubmit`** — dropped the dead "future Formspree / for now go straight
  to confirmation" comments; it simply stores the text and advances.
- **`StepConfirmation`** — now accepts a `submittedText` prop and renders it in
  a tasteful, plainly quoted block under the heading "Your voice, returned to
  you." Styling reuses the same gilded quotation-mark treatment as the excerpt
  block in `StepLearn` for visual consistency; `whitespace-pre-wrap` preserves
  the citizen's own line breaks. The block only renders when non-empty text was
  submitted (guarded on the trimmed value), so an empty path degrades cleanly.

No new dependencies. No network calls. No behavior removed — only a discarded
value made visible.

## Verification
- `npm run build` → **exit 0** (19/19 static pages generated, `/contribute`
  compiles at 6.34 kB).

## Safety
- No push, no deploy, no deletions beyond the dead comment lines this fix
  resolves.
- Local commit only, specific paths (`git add` of the two touched files) — no
  `git add -A`.

## Files touched
- `src/app/contribute/page.tsx`
- `SPRINT_REPORT_echo.md` (this report)
