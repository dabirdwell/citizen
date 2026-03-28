# Citizen

**Your Civic Dashboard — powered by the Foundation for Humanity and AI.**

Citizen is the civic participation layer of the [Brain Mastery](https://humanityandai.com/products/) series by Humanity & AI. It connects the skills you've built (reading, thinking, creating) to democratic participation through the Foundation framework.

## Features

- **Foundation Dashboard** — track all 16 Foundation components with real-time health scores and progress
- **Foundation Contributions** — guided wizard for submitting stories, proposals, data, and ideas
- **Citizen Stories** — real accounts of AI in daily life, collected from the community
- **Guardian AI** — a public-serving civic AI that informs rather than persuades (stub)
- **Talk to Æ** — curated excerpts and dialogue with the collaborative intelligence behind the Foundation

## The Foundation

16 components of what citizenship should mean: Safety, Education, Healthcare, Housing, Food Security, Mental Health, Information Access, Skills Training, UBI, Thought Privacy, Clean Water, Social Contract, Sustainable Energy, Transportation, Safe Spaces, Accessible Education.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhumanityandai%2Fcitizen)

## Getting Started

```bash
git clone https://github.com/humanityandai/citizen.git
cd citizen
npm install
cp .env.example .env.local  # fill in values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Health check: `GET /api/health` → `{ "status": "ok" }`

## Part of Brain Mastery

Clarity (read) → Dojo (think) → TasteBud (taste) → Quiltographer (create) → **Citizen (participate)**

## License

MIT — see [LICENSE](LICENSE)

---

Built by [Humanity & AI, LLC](https://humanityandai.com) · Oklahoma City
