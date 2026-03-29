"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { foundationComponents } from "@/data/foundation-components";

/* ─── Types ─── */

interface Ballot {
  timestamp: string;
  selections: number[];
  hash: string;
}

interface Tally {
  id: number;
  name: string;
  icon: string;
  points: number;
}

/* ─── Hash helper ─── */

async function hashBallot(selections: number[]): Promise<string> {
  const data = JSON.stringify(selections);
  const encoded = new TextEncoder().encode(data);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ─── Main ─── */

export default function ResultsPage() {
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const [tallies, setTallies] = useState<Tally[]>([]);
  const [maxPoints, setMaxPoints] = useState(0);
  const [view, setView] = useState<"results" | "ledger">("results");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<Ballot | null>(null);
  const [verifyNotFound, setVerifyNotFound] = useState(false);

  useEffect(() => {
    const stored: Ballot[] = JSON.parse(localStorage.getItem("citizen-ballots") || "[]");
    setBallots(stored);

    // Tally: 3 pts for 1st, 2 pts for 2nd, 1 pt for 3rd
    const pointMap: Record<number, number> = {};
    for (const ballot of stored) {
      ballot.selections.forEach((id, i) => {
        pointMap[id] = (pointMap[id] || 0) + (3 - i);
      });
    }

    const tallyList: Tally[] = foundationComponents.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      points: pointMap[c.id] || 0,
    }));

    tallyList.sort((a, b) => b.points - a.points);
    setTallies(tallyList);
    setMaxPoints(Math.max(...tallyList.map((t) => t.points), 1));
  }, []);

  async function handleVerify() {
    const trimmed = verifyHash.trim().toLowerCase();
    if (!trimmed) return;

    const found = ballots.find((b) => b.hash === trimmed);
    if (found) {
      // Verify hash integrity
      const recomputed = await hashBallot(found.selections);
      if (recomputed === found.hash) {
        setVerifyResult(found);
        setVerifyNotFound(false);
      } else {
        setVerifyResult(null);
        setVerifyNotFound(true);
      }
    } else {
      setVerifyResult(null);
      setVerifyNotFound(true);
    }
  }

  return (
    <div className="bg-gradient-to-b from-slate-950 via-[#0a0f1a] to-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-xs tracking-wide mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
            LIVE RESULTS
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-3">
            Vote Results
          </h1>
          <p className="text-warm-300">
            {ballots.length} ballot{ballots.length !== 1 ? "s" : ""} recorded
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex items-center justify-center gap-1 bg-slate-925/60 border border-slate-800/40 rounded-lg p-1 mb-8 max-w-xs mx-auto">
          <button
            onClick={() => setView("results")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              view === "results"
                ? "bg-blue-600 text-white shadow"
                : "text-warm-400 hover:text-warm-200"
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setView("ledger")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              view === "ledger"
                ? "bg-blue-600 text-white shadow"
                : "text-warm-400 hover:text-warm-200"
            }`}
          >
            Ledger
          </button>
        </div>

        {view === "results" ? (
          /* ─── Results View ─── */
          <div className="space-y-3 animate-[wizardFadeIn_0.35s_ease-out]">
            {tallies.map((t, i) => (
              <div
                key={t.id}
                className="bg-slate-925/60 border border-slate-800/40 rounded-xl p-4 flex items-center gap-4"
              >
                {/* Rank */}
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0
                      ? "bg-blue-600/30 text-blue-300"
                      : i === 1
                      ? "bg-blue-600/20 text-blue-400/80"
                      : i === 2
                      ? "bg-blue-600/10 text-blue-400/60"
                      : "bg-slate-800/40 text-warm-500"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-warm-200 truncate">
                    {t.name}
                  </p>
                  {/* Bar */}
                  <div className="mt-2 h-2 bg-slate-800/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700"
                      style={{ width: `${(t.points / maxPoints) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Points */}
                <span className="flex-shrink-0 text-sm font-mono text-blue-300">
                  {t.points} pt{t.points !== 1 ? "s" : ""}
                </span>
              </div>
            ))}

            {ballots.length === 0 && (
              <div className="text-center py-16">
                <p className="text-warm-400 mb-4">No votes cast yet.</p>
                <Link
                  href="/vote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                >
                  Cast the First Vote
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* ─── Ledger View ─── */
          <div className="animate-[wizardFadeIn_0.35s_ease-out]">
            {/* Ledger list */}
            <div className="bg-slate-925/60 border border-slate-800/40 rounded-xl overflow-hidden mb-8">
              <div className="px-4 py-3 border-b border-slate-800/40 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-sm font-medium text-warm-200">Ballot Ledger</span>
                <span className="text-xs text-warm-500 ml-auto">{ballots.length} entries</span>
              </div>

              {ballots.length === 0 ? (
                <div className="px-4 py-12 text-center text-warm-500 text-sm">
                  No ballots recorded yet.
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/30">
                  {[...ballots].reverse().map((ballot, i) => (
                    <div key={i} className="px-4 py-3 flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-mono text-warm-300 truncate">
                          {ballot.hash}
                        </p>
                        <p className="text-[10px] text-warm-500 mt-0.5">
                          {new Date(ballot.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verify section */}
            <div className="bg-slate-925/60 border border-blue-800/30 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-warm-200 mb-1">Verify My Vote</h3>
              <p className="text-xs text-warm-400 mb-4">
                Enter your ballot hash to confirm your vote was recorded correctly.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyHash}
                  onChange={(e) => {
                    setVerifyHash(e.target.value);
                    setVerifyResult(null);
                    setVerifyNotFound(false);
                  }}
                  placeholder="Paste your ballot hash..."
                  className="flex-1 bg-slate-950/60 border border-slate-800/60 rounded-lg px-4 py-2.5 text-sm font-mono text-warm-200 placeholder:text-warm-600 focus:outline-none focus:border-blue-600/60"
                />
                <button
                  onClick={handleVerify}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Verify
                </button>
              </div>

              {verifyResult && (
                <div className="mt-4 p-4 bg-blue-600/5 border border-blue-600/30 rounded-lg animate-[wizardFadeIn_0.35s_ease-out]">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-sm font-medium text-green-400">Hash verified — vote integrity confirmed</span>
                  </div>
                  <div className="space-y-1.5">
                    {verifyResult.selections.map((id, i) => {
                      const comp = foundationComponents.find((c) => c.id === id);
                      return (
                        <div key={id} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center text-[10px] font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm text-warm-200">
                            {comp?.name || `Component #${id}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-warm-500 mt-3">
                    Cast: {new Date(verifyResult.timestamp).toLocaleString()}
                  </p>
                </div>
              )}

              {verifyNotFound && (
                <div className="mt-4 p-4 bg-red-600/5 border border-red-600/30 rounded-lg animate-[wizardFadeIn_0.35s_ease-out]">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                    <span className="text-sm text-red-400">Hash not found in the local ledger.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-slate-925/40 border border-slate-800/30 rounded-lg">
              <p className="text-xs text-warm-500 leading-relaxed">
                <span className="text-warm-400 font-medium">Note:</span> In production, these hashes
                would be recorded on a public blockchain, providing immutable, independently
                verifiable proof that every vote was counted without modification. This demo
                shows the concept using localStorage.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-3 mt-10">
          <Link
            href="/vote"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Cast a Vote
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-925/60 border border-slate-800/40 text-warm-200 hover:text-teal-400 rounded-lg font-medium transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
