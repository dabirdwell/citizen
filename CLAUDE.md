# CLAUDE.md — Citizen

## Scope
**Read:** `src/app/`, `src/components/`, `src/data/`, `src/lib/`
**DO NOT read:** `node_modules/`, `.next/`

## Project
Citizen is the civic hub for Foundation — see all 16 components, contribute, vote, talk to Æ. Free civic app.

## Tech Stack
Next.js (App Router), Tailwind CSS, GitHub Discussions API (live Foundation data)

## Build
```bash
npm run build
```

## Key Routes
- `/` — Landing page
- `/foundation/` — 16 Foundation component dashboard with live GitHub Discussion data
- `/ae/` — Talk to Æ (public chat interface)
- `/contribute/` — Contribution portal
- `/contributions/` — Contribution feed
- `/guardian/` — Guardian AI concept page
- `/vote/` — Voting interface
- `/vote/results/` — Vote results
- `/stories/` — Community stories

## Data
Foundation component data at `src/data/foundation-components.ts` — 16 components with status, progress, health scores. Live data fetched from GitHub Discussions API via `src/lib/github-discussions.ts`.

## Git Rules
- `git add` specific files only — NEVER `git add -A`
