"use client";

import { useState } from "react";
import Link from "next/link";
import { foundationComponents } from "@/data/foundation-components";

/* ─── Icons (matching existing icon system) ─── */

function ComponentIcon({ icon }: { icon: string }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "w-6 h-6",
  };

  switch (icon) {
    case "cpu":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "vote":
      return (
        <svg {...props}>
          <path d="M20 12V22H4V12" />
          <path d="M2 7l10-4 10 4" />
          <path d="M12 11V3" />
          <path d="M8 8l4 3 4-3" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...props}>
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 0-8 2-10 5z" />
          <path d="M2 2l8.7 8.7" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="M22 10l-10-5L2 10l10 5 10-5z" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
          <path d="M22 10v6" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "network":
      return (
        <svg {...props}>
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <path d="M12 8v4M7.5 17.2L10 14M16.5 17.2L14 14" />
        </svg>
      );
    case "palette":
      return (
        <svg {...props}>
          <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
          <circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "accessibility":
      return (
        <svg {...props}>
          <circle cx="12" cy="4" r="2" />
          <path d="M12 8v6" />
          <path d="M6 10l6 2 6-2" />
          <path d="M9 21l3-7 3 7" />
        </svg>
      );
    case "earth":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12c2 2 4 3 6 3s4-1.5 4-4 2-4 4-4 3 .5 6 3" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...props}>
          <path d="M20.5 11.5L17 8l-5 3-3-2-5 4" />
          <path d="M4 15l4-3 3 2 5-3 4 3" />
          <path d="M2 11h3M19 11h3" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

/* ─── Hashing ─── */

async function hashBallot(selections: number[]): Promise<string> {
  const data = JSON.stringify(selections);
  const encoded = new TextEncoder().encode(data);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ─── Types ─── */

interface Ballot {
  timestamp: string;
  selections: number[];
  hash: string;
}

/* ─── Main ─── */

export default function VotePage() {
  const [selections, setSelections] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [ballotHash, setBallotHash] = useState("");

  function toggleSelection(id: number) {
    setSelections((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function getRank(id: number): number {
    const idx = selections.indexOf(id);
    return idx === -1 ? 0 : idx + 1;
  }

  async function handleSubmit() {
    if (selections.length !== 3) return;

    const hash = await hashBallot(selections);
    const ballot: Ballot = {
      timestamp: new Date().toISOString(),
      selections,
      hash,
    };

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("citizen-ballots") || "[]");
    existing.push(ballot);
    localStorage.setItem("citizen-ballots", JSON.stringify(existing));

    setBallotHash(hash);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-b from-slate-950 via-[#0a0f1a] to-slate-950 min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-[wizardFadeIn_0.35s_ease-out]">
            {/* Checkmark */}
            <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-400/60 flex items-center justify-center mx-auto mb-6 animate-[confirmPop_0.5s_ease-out]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-warm-50 mb-3">Vote Recorded</h1>
            <p className="text-warm-300 mb-8">
              Your ballot has been securely hashed and recorded to the ledger.
            </p>

            {/* Ballot hash */}
            <div className="bg-slate-925/80 border border-blue-800/40 rounded-xl p-6 mb-8 text-left">
              <p className="text-xs text-blue-300 uppercase tracking-wider mb-2">Your Ballot Hash</p>
              <p className="text-sm font-mono text-warm-100 break-all leading-relaxed">
                {ballotHash}
              </p>
              <p className="text-xs text-warm-400 mt-3">
                Save this hash to verify your vote on the results page.
              </p>
            </div>

            {/* Selections recap */}
            <div className="bg-slate-925/60 border border-slate-800/40 rounded-xl p-6 mb-8 text-left">
              <p className="text-xs text-warm-400 uppercase tracking-wider mb-4">Your Ranked Selections</p>
              {selections.map((id, i) => {
                const comp = foundationComponents.find((c) => c.id === id);
                if (!comp) return null;
                return (
                  <div key={id} className="flex items-center gap-3 py-2">
                    <span className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-warm-200">{comp.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/vote/results"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
                View Results
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-925/60 border border-slate-800/40 text-warm-200 hover:text-teal-400 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-950 via-[#0a0f1a] to-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-xs tracking-wide mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            SECURE LEDGER VOTE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-3">
            Community Vote
          </h1>
          <p className="text-lg text-warm-300 max-w-2xl mx-auto">
            Which Foundation component should Oklahoma prioritize first?
          </p>
          <p className="text-sm text-warm-400 mt-2">
            Select your top 3 in ranked order. Each vote is cryptographically hashed and recorded.
          </p>
        </div>

        {/* Selection counter */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  selections.length >= n
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-slate-800/60 text-warm-500"
                }`}
              >
                {n}
              </div>
              {n < 3 && (
                <div
                  className={`w-8 h-0.5 rounded-full transition-colors ${
                    selections.length > n ? "bg-blue-600" : "bg-slate-800/60"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="text-sm text-warm-400 ml-2">
            {selections.length}/3 selected
          </span>
        </div>

        {/* Component grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {foundationComponents.map((comp) => {
            const rank = getRank(comp.id);
            const isSelected = rank > 0;
            const isDisabled = selections.length >= 3 && !isSelected;

            return (
              <button
                key={comp.id}
                onClick={() => toggleSelection(comp.id)}
                disabled={isDisabled}
                className={`relative text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-600/5"
                    : isDisabled
                    ? "bg-slate-925/30 border-slate-800/20 opacity-40 cursor-not-allowed"
                    : "bg-slate-925/60 border-slate-800/40 hover:border-blue-700/40 hover:bg-slate-925/80 cursor-pointer"
                }`}
              >
                {/* Rank badge */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-lg">
                    {rank}
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-blue-600/20 text-blue-300"
                        : "bg-slate-800/40 text-warm-400"
                    }`}
                  >
                    <ComponentIcon icon={comp.icon} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        isSelected ? "text-blue-200" : "text-warm-200"
                      }`}
                    >
                      {comp.name}
                    </p>
                    <p className="text-xs text-warm-400 mt-1 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={selections.length !== 3}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-200 ${
              selections.length === 3
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer"
                : "bg-slate-800/60 text-warm-500 cursor-not-allowed"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Cast Secure Vote
          </button>
          <p className="text-xs text-warm-500 text-center max-w-md">
            Your vote will be cryptographically hashed using SHA-256. The hash is recorded
            to a local ledger. No personal information is stored with your ballot.
          </p>
        </div>
      </div>
    </div>
  );
}
