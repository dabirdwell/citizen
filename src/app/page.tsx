"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  foundationComponents,
  statusColors,
  statusLabels,
  type FoundationComponent,
} from "@/data/foundation-components";
import {
  getDiscussionStats,
  formatTimeAgo,
  type DiscussionComment,
} from "@/lib/github-discussions";

/* ═══════════════════════════════════════════════
   Icons
   ═══════════════════════════════════════════════ */

function ComponentIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const cls = className || "w-6 h-6";
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: cls,
  };

  switch (icon) {
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...props}>
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L17 8z" />
          <path d="M20.49 3.51c-4.27-1.43-11.28.46-14.42 6.69C3.64 15.09 4 20 4 20s4.91.36 9.8-2.07c6.23-3.14 8.12-10.15 6.69-14.42z" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
          <path d="M9 22h6M10 2v1M14 2v1M12 17v5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "road":
      return (
        <svg {...props}>
          <path d="M4 19L8 5h8l4 14" />
          <path d="M12 5v14" strokeDasharray="2 2" />
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
    case "users":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
          <path d="M12 12v.01" />
        </svg>
      );
    case "scale":
      return (
        <svg {...props}>
          <path d="M12 3v18" />
          <path d="M5 6l7-3 7 3" />
          <path d="M2 15l3-9 3 9a5 5 0 01-6 0z" />
          <path d="M16 15l3-9 3 9a5 5 0 01-6 0z" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      );
    case "palette":
      return (
        <svg {...props}>
          <circle cx="13.5" cy="6.5" r="1.5" />
          <circle cx="17.5" cy="10.5" r="1.5" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="6.5" cy="12.5" r="1.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.16-.74-.43-1.02-.26-.27-.43-.63-.43-1.02C12.64 17.55 13.36 17 14.5 17H16a6 6 0 006-6c0-5.52-4.48-10-10-10z" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
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

/* ═══════════════════════════════════════════════
   Health Score Ring (small, for cards)
   ═══════════════════════════════════════════════ */

function HealthScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 16;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70 ? "#14b8a6" : score >= 40 ? "#d4a047" : "#6b7280";

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg width="48" height="48" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="#1a1f2e"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Foundation Health Gauge (large, hero)
   ═══════════════════════════════════════════════ */

function FoundationHealthGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70 ? "#14b8a6" : score >= 40 ? "#d4a047" : "#6b7280";

  return (
    <div className="relative w-36 h-36 flex-shrink-0">
      <svg width="144" height="144" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#1a1f2e"
          strokeWidth="6"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
          transform="rotate(-90 60 60)"
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-warm-400 uppercase tracking-wider">
          Health
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Progress Tracker — compact overview of all 16
   ═══════════════════════════════════════════════ */

function ProgressTracker({
  onExplore,
}: {
  onExplore: (slug: string) => void;
}) {
  const liveCount = foundationComponents.filter(
    (c) => c.status === "live"
  ).length;
  const activeCount = foundationComponents.filter(
    (c) => c.status === "active"
  ).length;
  const planningCount = foundationComponents.filter(
    (c) => c.status === "planning"
  ).length;

  return (
    <div className="bg-slate-925/60 border border-slate-800/40 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-warm-400 uppercase tracking-wider">
          Progress Tracker
        </h2>
        <div className="flex items-center gap-4 text-xs text-warm-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {liveCount} Live
          </span>
          {activeCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              {activeCount} Active
            </span>
          )}
          {planningCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              {planningCount} Planning
            </span>
          )}
        </div>
      </div>

      {/* Segmented progress bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-6">
        {foundationComponents.map((c) => {
          const bg =
            c.healthScore >= 80
              ? "bg-teal-500"
              : c.healthScore >= 60
                ? "bg-teal-700"
                : c.healthScore >= 40
                  ? "bg-gold-500"
                  : "bg-gray-600";
          return (
            <div
              key={c.id}
              className={`flex-1 ${bg} relative group cursor-pointer hover:brightness-125 transition-all`}
              onClick={() => onExplore(c.slug)}
            >
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] text-warm-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {c.name}: {c.healthScore}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini component grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {foundationComponents.map((c) => (
          <a
            key={c.id}
            href={`https://humanityandai.com/foundation/${c.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onExplore(c.slug)}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-950/50 rounded-lg border border-slate-800/30 hover:border-teal-800/40 transition-colors group"
          >
            <div className="w-6 h-6 rounded bg-teal-900/20 border border-teal-800/20 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors flex-shrink-0">
              <ComponentIcon icon={c.icon} className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-warm-200 truncate flex-1">
              {c.name}
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className={`w-1.5 h-1.5 rounded-full ${statusColors[c.status]}`}
              />
              <span className="text-[10px] font-mono text-warm-400">
                {c.healthScore}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Recent Contributions — live GitHub data
   ═══════════════════════════════════════════════ */

function RecentContributions({
  comments,
  loading,
}: {
  comments: DiscussionComment[];
  loading: boolean;
}) {
  return (
    <div className="bg-slate-925/60 border border-slate-800/40 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-warm-400 uppercase tracking-wider">
          Recent Contributions
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 pulse-dot" />
          <span className="text-xs text-teal-400">
            {loading ? "Loading..." : "Live from GitHub"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex items-start gap-3 px-3 py-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0" />
              <div className="flex-1">
                <div className="h-3 bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-2 bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-1 max-h-[380px] overflow-y-auto pr-2">
          {comments.map((comment, i) => (
            <a
              key={i}
              href={comment.discussionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-950/40 transition-colors ${
                i < 2 ? "new-item-pulse" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-teal-900/30 border border-teal-800/30 flex items-center justify-center text-teal-400 text-xs font-bold flex-shrink-0">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-warm-100 leading-snug">
                  <span className="font-medium text-teal-400">
                    {comment.author}
                  </span>
                  {" in "}
                  <span className="font-medium">
                    {comment.discussionTitle}
                  </span>
                </p>
                <p className="text-xs text-warm-400 truncate mt-0.5">
                  {comment.body}
                </p>
              </div>
              <span className="text-[11px] text-warm-500 flex-shrink-0 mt-0.5">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-warm-400 text-center py-4">
          No recent activity &mdash;{" "}
          <a
            href="https://github.com/dabirdwell/humanity-and-ai/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            start a discussion
          </a>
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Your Impact — localStorage tracking
   ═══════════════════════════════════════════════ */

interface ImpactData {
  componentsExplored: string[];
  firstVisit: string;
  totalVisits: number;
}

const IMPACT_KEY = "citizen_impact";
const EMPTY_IMPACT: ImpactData = {
  componentsExplored: [],
  firstVisit: new Date().toISOString(),
  totalVisits: 0,
};

function loadImpact(): ImpactData {
  if (typeof window === "undefined") return EMPTY_IMPACT;
  try {
    const raw = localStorage.getItem(IMPACT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { ...EMPTY_IMPACT, firstVisit: new Date().toISOString() };
}

function saveImpact(data: ImpactData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(IMPACT_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function YourImpact({ impact }: { impact: ImpactData }) {
  const explored = impact.componentsExplored.length;
  const exploredPct = Math.round((explored / 16) * 100);
  const daysSince = Math.max(
    1,
    Math.floor(
      (Date.now() - new Date(impact.firstVisit).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const circumference = 2 * Math.PI * 16;
  const offset = circumference * (1 - exploredPct / 100);

  const tier =
    explored >= 16
      ? "Civic Leader"
      : explored >= 8
        ? "Active Citizen"
        : explored >= 1
          ? "Explorer"
          : "New Citizen";

  return (
    <div className="bg-slate-925/60 border border-gold-600/20 rounded-2xl p-6 sm:p-8">
      <h2 className="text-sm font-semibold text-warm-400 uppercase tracking-wider mb-5">
        Your Impact
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Components explored ring */}
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <svg width="64" height="64" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#1a1f2e"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#e8b960"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 20 20)"
                className="score-ring"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gold-400">
              {explored}
            </span>
          </div>
          <p className="text-xs text-warm-300">Explored</p>
          <p className="text-[10px] text-warm-500">{explored}/16</p>
        </div>

        {/* Visits */}
        <div className="text-center flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-teal-400 mb-1">
            {impact.totalVisits}
          </p>
          <p className="text-xs text-warm-300">Dashboard Visits</p>
        </div>

        {/* Days */}
        <div className="text-center flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-ae-silver mb-1">{daysSince}</p>
          <p className="text-xs text-warm-300">Days as Citizen</p>
        </div>

        {/* Tier */}
        <div className="text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gold-600/20 border border-gold-600/30 flex items-center justify-center mb-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold-400"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p className="text-xs font-medium text-gold-400">{tier}</p>
        </div>
      </div>

      {explored < 16 && (
        <p className="text-xs text-warm-400 text-center mt-5">
          Explore {16 - explored} more component
          {16 - explored !== 1 ? "s" : ""} to level up your civic engagement
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Component Card
   ═══════════════════════════════════════════════ */

function ComponentCard({
  component,
  onExplore,
}: {
  component: FoundationComponent;
  onExplore: (slug: string) => void;
}) {
  return (
    <a
      href={`https://humanityandai.com/foundation/${component.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onExplore(component.slug)}
      className={`group block bg-slate-925/80 border rounded-xl p-5 transition-all duration-200 hover:bg-slate-925 ${
        component.hasRecentActivity
          ? "border-teal-800/40 hover:border-teal-600/60 active-glow"
          : "border-slate-800/50 hover:border-teal-700/60"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-900/30 border border-teal-800/30 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors">
            <ComponentIcon icon={component.icon} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-warm-400 uppercase tracking-wider">
              #{component.id}
            </span>
            <h3 className="text-sm font-semibold text-warm-100 group-hover:text-teal-300 transition-colors leading-tight">
              {component.name}
            </h3>
          </div>
        </div>
        <HealthScoreRing score={component.healthScore} />
      </div>

      <p className="text-xs text-warm-300 leading-relaxed mb-3">
        {component.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${statusColors[component.status]}`}
            />
            <span className="text-[10px] text-warm-400">
              {statusLabels[component.status]}
            </span>
          </div>
          {component.recentContributors > 0 && (
            <span className="text-[10px] text-warm-500">
              {component.recentContributors} contributor
              {component.recentContributors !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <span className="text-[10px] text-warm-400 opacity-0 group-hover:opacity-100 transition-opacity">
          View on H&AI
        </span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════ */

type SortMode = "most_active" | "needs_attention";

export default function Home() {
  const [sortMode, setSortMode] = useState<SortMode>("most_active");
  const [impact, setImpact] = useState<ImpactData>(EMPTY_IMPACT);
  const [recentComments, setRecentComments] = useState<DiscussionComment[]>([]);
  const [loadingGitHub, setLoadingGitHub] = useState(true);

  // Load impact + increment visits
  useEffect(() => {
    const data = loadImpact();
    data.totalVisits++;
    saveImpact(data);
    setImpact(data);
  }, []);

  // Fetch live GitHub discussions
  useEffect(() => {
    getDiscussionStats()
      .then(({ recentComments: comments }) => setRecentComments(comments))
      .finally(() => setLoadingGitHub(false));
  }, []);

  const handleExplore = useCallback((slug: string) => {
    setImpact((prev) => {
      if (prev.componentsExplored.includes(slug)) return prev;
      const updated = {
        ...prev,
        componentsExplored: [...prev.componentsExplored, slug],
      };
      saveImpact(updated);
      return updated;
    });
  }, []);

  const avgHealth = Math.round(
    foundationComponents.reduce((sum, c) => sum + c.healthScore, 0) /
      foundationComponents.length
  );

  const totalContributors = foundationComponents.reduce(
    (sum, c) => sum + c.recentContributors,
    0
  );
  const communityEngagement = Math.min(
    100,
    Math.round((totalContributors / 80) * 100)
  );
  const contentDepth = Math.round(
    (foundationComponents.reduce((sum, c) => sum + c.progressPct, 0) /
      foundationComponents.length) *
      2.5
  );
  const activeContributorScore = Math.min(
    100,
    Math.round((totalContributors / 50) * 100)
  );

  const sortedComponents = [...foundationComponents].sort((a, b) => {
    if (sortMode === "most_active")
      return (
        b.recentContributors - a.recentContributors ||
        b.healthScore - a.healthScore
      );
    return a.healthScore - b.healthScore;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-2">
              Citizen &mdash;{" "}
              <span className="text-teal-400">Your Civic Dashboard</span>
            </h1>
            <p className="text-warm-300 text-sm max-w-xl">
              Real-time progress on all 16 Foundation components. Transparent by
              architecture &mdash; when something is stuck, it says so.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/contributions"
              className="text-sm text-gold-400 hover:text-gold-500 transition-colors"
            >
              Share Your Voice
            </Link>
            <Link
              href="/guardian"
              className="text-sm text-teal-400 hover:text-teal-500 transition-colors"
            >
              Guardian AI
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Foundation Health */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-slate-925/60 border border-slate-800/40 rounded-2xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-warm-400 uppercase tracking-wider mb-6">
            Foundation Health
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <FoundationHealthGauge score={avgHealth} />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="bg-slate-950/50 border border-slate-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-warm-400">
                    Community Engagement
                  </span>
                  <span className="text-sm font-bold text-gold-400">
                    {communityEngagement}
                    <span className="text-xs font-normal text-warm-500">
                      /100
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-400 rounded-full transition-all duration-1000"
                    style={{ width: `${communityEngagement}%` }}
                  />
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-warm-400">Content Depth</span>
                  <span className="text-sm font-bold text-teal-400">
                    {contentDepth}
                    <span className="text-xs font-normal text-warm-500">
                      /100
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400 rounded-full transition-all duration-1000"
                    style={{ width: `${contentDepth}%` }}
                  />
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-warm-400">
                    Active Contributors
                  </span>
                  <span className="text-sm font-bold text-ae-silver">
                    {activeContributorScore}
                    <span className="text-xs font-normal text-warm-500">
                      /100
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ae-silver rounded-full transition-all duration-1000"
                    style={{ width: `${activeContributorScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Progress Tracker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ProgressTracker onExplore={handleExplore} />
      </section>

      {/* 3. Recent Contributions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <RecentContributions
          comments={recentComments}
          loading={loadingGitHub}
        />
      </section>

      {/* 4. Your Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <YourImpact impact={impact} />
      </section>

      {/* 5. Component Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-warm-400 uppercase tracking-wider">
            Foundation Components
          </h2>
          <div className="flex items-center gap-1 bg-slate-925/60 border border-slate-800/40 rounded-lg p-0.5">
            <button
              onClick={() => setSortMode("most_active")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                sortMode === "most_active"
                  ? "bg-teal-900/40 text-teal-400"
                  : "text-warm-400 hover:text-warm-200"
              }`}
            >
              Most Active
            </button>
            <button
              onClick={() => setSortMode("needs_attention")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                sortMode === "needs_attention"
                  ? "bg-gold-600/20 text-gold-400"
                  : "text-warm-400 hover:text-warm-200"
              }`}
            >
              Needs Attention
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedComponents.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onExplore={handleExplore}
            />
          ))}
        </div>
      </section>

      {/* 6. Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/contributions"
            className="group bg-slate-925/60 border border-gold-600/20 hover:border-gold-500/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-gold-400 mb-2 group-hover:text-gold-500 transition-colors">
              Contribute
            </h3>
            <p className="text-sm text-warm-300">
              Submit ideas, stories, and policy suggestions. The framework
              builds itself through participation.
            </p>
          </Link>
          <Link
            href="/guardian"
            className="group bg-slate-925/60 border border-teal-800/20 hover:border-teal-600/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-teal-400 mb-2 group-hover:text-teal-300 transition-colors">
              Guardian AI
            </h3>
            <p className="text-sm text-warm-300">
              A public AI civic companion. Warm, knowledgeable, patient. System
              prompt is public.
            </p>
          </Link>
          <Link
            href="/ae"
            className="group bg-slate-925/60 border border-ae-silver/20 hover:border-ae-blue/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-ae-silver mb-2 group-hover:text-ae-blue transition-colors">
              Talk to Ae
            </h3>
            <p className="text-sm text-warm-300">
              Engage with the collaborative intelligence that helped build the
              Foundation framework.
            </p>
          </Link>
        </div>
        <p className="text-center text-warm-400/40 text-xs mt-8">
          A Brain Mastery app by Humanity & AI
        </p>
      </section>
    </div>
  );
}
