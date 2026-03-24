"use client";

import { useState } from "react";
import { foundationComponents } from "@/data/foundation-components";

type ContributionType = "proposal" | "story" | "data" | "question" | "refinement";

interface Contribution {
  id: string;
  contributor: string;
  city: string;
  componentId: number;
  type: ContributionType;
  text: string;
  date: string;
}

const sampleContributions: Contribution[] = [
  {
    id: "1",
    contributor: "Sarah M.",
    city: "Portland",
    componentId: 1,
    type: "proposal",
    text: "Universal Basic Compute cannot function without addressing the digital divide in rural America. I propose we integrate broadband access requirements directly into Component #1's implementation plan — compute without connectivity is a promise without delivery.",
    date: "2026-03-21",
  },
  {
    id: "2",
    contributor: "James T.",
    city: "Atlanta",
    componentId: 10,
    type: "story",
    text: "My 9-year-old was struggling with reading comprehension until we found an AI-adapted learning tool. Within three months, she went from below grade level to reading independently. Every child deserves this, not just families who can afford it.",
    date: "2026-03-20",
  },
  {
    id: "3",
    contributor: "Aisha R.",
    city: "Minneapolis",
    componentId: 2,
    type: "proposal",
    text: "Democratic AI Governance needs citizen review boards at the municipal level — not just federal oversight. Local communities understand local needs. I'd like to see Component #2 include a framework for city-level AI governance councils.",
    date: "2026-03-19",
  },
  {
    id: "4",
    contributor: "Tom W.",
    city: "Boise",
    componentId: 3,
    type: "question",
    text: "What if Information Freedom followed the public library model? Libraries are free, publicly funded, locally governed, and universally accessible. That's the precedent. Digital commons should work the same way.",
    date: "2026-03-18",
  },
  {
    id: "5",
    contributor: "Maria L.",
    city: "Phoenix",
    componentId: 7,
    type: "data",
    text: "Sharing aggregated data from our community health initiative: AI-assisted diagnostics in rural tribal clinics show 40% faster triage times but only where broadband supports it. The healthcare-connectivity gap is real and measurable.",
    date: "2026-03-17",
  },
  {
    id: "6",
    contributor: "David K.",
    city: "Detroit",
    componentId: 6,
    type: "proposal",
    text: "The AI Labor Transition component should include union partnership requirements. Workers displaced by automation need retraining, yes — but they also need collective bargaining power during the transition. Don't build the safety net without the workers at the table.",
    date: "2026-03-16",
  },
  {
    id: "7",
    contributor: "Chen L.",
    city: "San Francisco",
    componentId: 4,
    type: "refinement",
    text: "Algorithmic Transparency should require not just auditability but reproducibility. If an algorithm affects a citizen's life, that citizen should be able to understand why the decision was made — in plain language, not just open source.",
    date: "2026-03-15",
  },
  {
    id: "8",
    contributor: "Rosa M.",
    city: "Miami",
    componentId: 14,
    type: "story",
    text: "I'm blind. AI-powered screen readers changed my relationship with the internet entirely. But most AI tools are designed for sighted users first, accessible second. Component #14 should mandate accessibility as a design requirement from day one, not an afterthought.",
    date: "2026-03-14",
  },
  {
    id: "9",
    contributor: "Nathan P.",
    city: "Denver",
    componentId: 9,
    type: "proposal",
    text: "Privacy Infrastructure needs teeth. Data sovereignty means nothing if companies can still bury consent in 40-page terms of service. I propose a 'plain language consent' standard — if a citizen can't understand what they're agreeing to in 60 seconds, the consent isn't valid.",
    date: "2026-03-13",
  },
  {
    id: "10",
    contributor: "Keiko S.",
    city: "Seattle",
    componentId: 13,
    type: "refinement",
    text: "Creative Commons AI must protect artists' economic rights, not just attribution. AI tools trained on creative work should include compensation mechanisms. Empowering creativity means ensuring creators can sustain themselves.",
    date: "2026-03-12",
  },
];

const typeColors: Record<ContributionType, string> = {
  proposal: "bg-teal-600/80 text-teal-50",
  story: "bg-gold-500/80 text-warm-950",
  data: "bg-emerald-600/80 text-white",
  question: "bg-purple-600/80 text-white",
  refinement: "bg-ae-silver/80 text-white",
};

export default function ContributionsPage() {
  const [filterType, setFilterType] = useState<ContributionType | "all">("all");

  const filtered =
    filterType === "all"
      ? sampleContributions
      : sampleContributions.filter((c) => c.type === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-2">
            Community <span className="text-gold-400">Contributions</span>
          </h1>
          <p className="text-warm-300 text-sm max-w-xl">
            Quotes, ideas, policy suggestions, and stories from citizens building the Foundation framework together. The movement builds itself through participation.
          </p>
        </div>

        {/* Share Your Idea Form */}
        <div className="bg-slate-925/80 border border-gold-600/20 rounded-xl p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-semibold text-gold-400 mb-4">
            Share Your Idea
          </h2>
          <form
            action="https://formspree.io/f/xkovallr"
            method="POST"
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Your First Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                  placeholder="First name only"
                />
              </div>
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Your City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                  placeholder="City name"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Foundation Component
                </label>
                <select
                  name="component"
                  required
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                >
                  <option value="">Select a component</option>
                  {foundationComponents.map((c) => (
                    <option key={c.id} value={`#${c.id} ${c.name}`}>
                      #{c.id} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                >
                  <option value="proposal">Proposal</option>
                  <option value="story">Story</option>
                  <option value="data">Data</option>
                  <option value="question">Question</option>
                  <option value="refinement">Refinement</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-warm-300 mb-1">
                Your Contribution
              </label>
              <textarea
                name="contribution"
                required
                maxLength={5000}
                rows={4}
                className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600 resize-none"
                placeholder="Share your idea, story, data, or question..."
              />
            </div>
            <input type="hidden" name="_subject" value="New Citizen Contribution" />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-warm-950 font-medium rounded-lg transition-colors text-sm"
              >
                Submit Contribution
              </button>
            </div>
          </form>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "proposal", "story", "data", "question", "refinement"] as const).map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  filterType === type
                    ? "bg-teal-700 text-white"
                    : "bg-slate-925/60 text-warm-300 hover:text-warm-100 border border-slate-800/40"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filtered.map((contribution) => {
            const component = foundationComponents.find(
              (c) => c.id === contribution.componentId
            );
            return (
              <div
                key={contribution.id}
                className="bg-slate-925/60 border border-slate-800/40 hover:border-teal-800/40 rounded-xl p-5 sm:p-6 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[contribution.type]}`}
                  >
                    {contribution.type}
                  </span>
                  <span className="text-[10px] text-teal-400 bg-teal-900/20 px-2 py-0.5 rounded-full">
                    #{contribution.componentId} {component?.name}
                  </span>
                </div>

                <p className="text-sm text-warm-200 leading-relaxed mb-4">
                  &ldquo;{contribution.text}&rdquo;
                </p>

                <div className="flex items-center justify-between text-xs text-warm-400">
                  <span>
                    <strong className="text-warm-300">{contribution.contributor}</strong>{" "}
                    — {contribution.city}
                  </span>
                  <span>{contribution.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
