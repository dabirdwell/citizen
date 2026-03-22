"use client";

import { useState } from "react";
import { foundationComponents } from "@/data/foundation-components";

type ContributionType =
  | "proposal"
  | "story"
  | "data"
  | "question"
  | "refinement";

interface Contribution {
  id: string;
  title: string;
  author: string;
  componentId: number;
  type: ContributionType;
  date: string;
  upvotes: number;
  excerpt: string;
}

const sampleContributions: Contribution[] = [
  {
    id: "1",
    title: "Rural broadband as prerequisite for Universal Basic Compute",
    author: "Community Member",
    componentId: 1,
    type: "proposal",
    date: "2026-03-18",
    upvotes: 12,
    excerpt:
      "Universal Basic Compute cannot function without addressing the digital divide in rural America. I propose we integrate broadband access requirements into Component #1...",
  },
  {
    id: "2",
    title: "How AI tutoring helped my daughter with dyslexia",
    author: "Parent Contributor",
    componentId: 10,
    type: "story",
    date: "2026-03-15",
    upvotes: 24,
    excerpt:
      "My 9-year-old was struggling with reading comprehension until we found an AI-adapted learning tool. Within three months, she went from below grade level to...",
  },
  {
    id: "3",
    title: "Healthcare access data from tribal communities",
    author: "Research Partner",
    componentId: 7,
    type: "data",
    date: "2026-03-12",
    upvotes: 8,
    excerpt:
      "Sharing aggregated and anonymized data from our community health initiative showing the gap between urban and rural AI-assisted healthcare access...",
  },
];

const typeColors: Record<ContributionType, string> = {
  proposal: "bg-civic-blue text-white",
  story: "bg-guardian-amber text-warm-950",
  data: "bg-green-600 text-white",
  question: "bg-purple-600 text-white",
  refinement: "bg-ae-silver text-white",
};

export default function ContributionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<ContributionType | "all">("all");

  const filtered =
    filterType === "all"
      ? sampleContributions
      : sampleContributions.filter((c) => c.type === filterType);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-50 mb-2">
            Contributions
          </h1>
          <p className="text-warm-200 text-sm">
            Submit proposals, stories, data, and ideas. The framework builds
            itself through participation.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-civic-blue hover:bg-civic-blue-light text-white rounded-lg transition-colors text-sm"
        >
          {showForm ? "Close" : "+ Contribute"}
        </button>
      </div>

      {/* Contribution Form */}
      {showForm && (
        <div className="bg-warm-900/30 border border-warm-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-warm-50 mb-4">
            New Contribution
          </h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-warm-200 mb-1">
                  Target Component
                </label>
                <select className="w-full bg-warm-900 border border-warm-800 rounded px-3 py-2 text-sm text-warm-100">
                  {foundationComponents.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.id} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-warm-200 mb-1">
                  Type
                </label>
                <select className="w-full bg-warm-900 border border-warm-800 rounded px-3 py-2 text-sm text-warm-100">
                  <option value="proposal">Proposal</option>
                  <option value="story">Story</option>
                  <option value="data">Data</option>
                  <option value="question">Question</option>
                  <option value="refinement">Refinement</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-warm-200 mb-1">
                Title (max 120 characters)
              </label>
              <input
                type="text"
                maxLength={120}
                className="w-full bg-warm-900 border border-warm-800 rounded px-3 py-2 text-sm text-warm-100 focus:outline-none focus:border-civic-blue"
                placeholder="A clear, concise title for your contribution"
              />
            </div>
            <div>
              <label className="block text-sm text-warm-200 mb-1">
                Body (markdown supported, max 5000 characters)
              </label>
              <textarea
                maxLength={5000}
                rows={6}
                className="w-full bg-warm-900 border border-warm-800 rounded px-3 py-2 text-sm text-warm-100 focus:outline-none focus:border-civic-blue resize-none"
                placeholder="Describe your proposal, share your story, or present your data..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-warm-200 hover:text-warm-100"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-civic-blue hover:bg-civic-blue-light text-white rounded-lg transition-colors text-sm"
                onClick={() => {
                  alert(
                    "Contribution form is a stub — backend not yet connected."
                  );
                }}
              >
                Preview & Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(
          ["all", "proposal", "story", "data", "question", "refinement"] as const
        ).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded text-xs transition-colors ${
              filterType === type
                ? "bg-civic-blue text-white"
                : "bg-warm-900 text-warm-200 hover:text-warm-100 border border-warm-800"
            }`}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Contribution Feed */}
      <div className="space-y-4">
        {filtered.map((contribution) => (
          <div
            key={contribution.id}
            className="bg-warm-900/30 border border-warm-800 hover:border-civic-blue rounded-lg p-5 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded ${typeColors[contribution.type]}`}
                >
                  {contribution.type}
                </span>
                <span className="text-xs text-warm-200">
                  #
                  {
                    foundationComponents.find(
                      (c) => c.id === contribution.componentId
                    )?.name
                  }
                </span>
              </div>
              <span className="text-xs text-warm-200">
                {contribution.date}
              </span>
            </div>
            <h3 className="font-semibold text-warm-50 mb-2">
              {contribution.title}
            </h3>
            <p className="text-sm text-warm-200 mb-3">
              {contribution.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-warm-200">
              <span>{contribution.author}</span>
              <span>{contribution.upvotes} upvotes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
