"use client";

import { useState, useEffect } from "react";
import {
  foundationComponents,
  statusColors,
  statusLabels,
  type ComponentStatus,
  type FoundationComponent,
} from "@/data/foundation-components";
import {
  getDiscussionStats,
  formatTimeAgo,
  type DiscussionStat,
  type DiscussionComment,
} from "@/lib/github-discussions";

type SortOption = "number" | "status" | "progress";

interface MergedComponent extends FoundationComponent {
  commentCount?: number;
  discussionUrl?: string;
  lastActivity?: string;
}

export default function FoundationStatusPage() {
  const [filter, setFilter] = useState<ComponentStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("number");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [liveStats, setLiveStats] = useState<DiscussionStat[]>([]);
  const [recentComments, setRecentComments] = useState<DiscussionComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiscussionStats()
      .then(({ stats, recentComments: comments }) => {
        setLiveStats(stats);
        setRecentComments(comments);
      })
      .finally(() => setLoading(false));
  }, []);

  // Merge live stats into component data
  const merged: MergedComponent[] = foundationComponents.map((c) => {
    const stat = liveStats.find((s) => s.componentSlug === c.slug);
    return {
      ...c,
      commentCount: stat?.commentCount,
      discussionUrl: stat?.discussionUrl,
      lastActivity: stat?.lastActivity,
    };
  });

  const filtered =
    filter === "all" ? merged : merged.filter((c) => c.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "progress") return b.progressPct - a.progressPct;
    if (sort === "status") return a.status.localeCompare(b.status);
    return a.id - b.id;
  });

  const counts = {
    live: foundationComponents.filter((c) => c.status === "live").length,
    active: foundationComponents.filter((c) => c.status === "active").length,
    planning: foundationComponents.filter((c) => c.status === "planning")
      .length,
    not_started: foundationComponents.filter((c) => c.status === "not_started")
      .length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-50 mb-2">
          Foundation Status
        </h1>
        <p className="text-warm-200 text-sm">
          Real-time progress on all 16 Foundation components
          {loading && " — loading live data..."}
        </p>
      </div>

      {/* Activity Feed */}
      {recentComments.length > 0 && (
        <div className="mb-8 bg-warm-900/50 border border-warm-800 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-warm-50 mb-3">
            Activity Feed
          </h2>
          <div className="space-y-3">
            {recentComments.map((comment, i) => (
              <a
                key={i}
                href={comment.discussionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-civic-blue mt-2 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-warm-100 group-hover:text-civic-blue-light transition-colors">
                    <span className="font-medium">{comment.author}</span>
                    {" in "}
                    <span className="font-medium">
                      {comment.discussionTitle}
                    </span>
                  </p>
                  <p className="text-xs text-warm-300 truncate">
                    {comment.body}
                  </p>
                  <p className="text-xs text-warm-400 mt-0.5">
                    {formatTimeAgo(comment.createdAt)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Live" count={counts.live} color="bg-blue-500" />
        <SummaryCard
          label="Active Development"
          count={counts.active}
          color="bg-green-500"
        />
        <SummaryCard
          label="Planning"
          count={counts.planning}
          color="bg-amber-500"
        />
        <SummaryCard
          label="Not Started"
          count={counts.not_started}
          color="bg-gray-500"
        />
      </div>

      {/* Filter/Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-warm-200">Filter:</label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as ComponentStatus | "all")
            }
            className="bg-warm-900 border border-warm-800 rounded px-3 py-1.5 text-sm text-warm-100"
          >
            <option value="all">All</option>
            <option value="live">Live</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-warm-200">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-warm-900 border border-warm-800 rounded px-3 py-1.5 text-sm text-warm-100"
          >
            <option value="number">Component #</option>
            <option value="progress">Progress</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sorted.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            expanded={expandedId === component.id}
            onToggle={() =>
              setExpandedId(expandedId === component.id ? null : component.id)
            }
          />
        ))}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="bg-warm-900/50 border border-warm-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-sm text-warm-200">{label}</span>
      </div>
      <p className="text-2xl font-bold text-warm-50">{count}</p>
    </div>
  );
}

function ComponentCard({
  component,
  expanded,
  onToggle,
}: {
  component: MergedComponent;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-warm-900/30 border border-warm-800 hover:border-civic-blue rounded-lg p-4 transition-colors">
      <button onClick={onToggle} className="text-left w-full">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-warm-200">#{component.id}</span>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${statusColors[component.status]}`}
            />
            <span className="text-xs text-warm-200">
              {statusLabels[component.status]}
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-warm-50 mb-2 text-sm">
          {component.name}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-warm-800 rounded-full h-1.5 mb-2">
          <div
            className="bg-civic-blue h-1.5 rounded-full transition-all"
            style={{ width: `${component.progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-warm-200">
            {component.progressPct}%
          </span>
          {component.commentCount !== undefined && (
            <span className="text-xs text-civic-blue-light">
              {component.commentCount} contribution
              {component.commentCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Last Activity Badge */}
        {component.lastActivity && (
          <div className="mt-2">
            <span className="text-xs bg-warm-800 text-warm-300 px-2 py-0.5 rounded-full">
              Last activity: {formatTimeAgo(component.lastActivity)}
            </span>
          </div>
        )}
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-warm-800">
          <p className="text-sm text-warm-200 mb-2">{component.description}</p>
          <p className="text-xs text-warm-100 italic">
            {component.currentStatusText}
          </p>

          {/* Contributions link */}
          {component.discussionUrl && (
            <a
              href={component.discussionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-civic-blue-light hover:underline"
            >
              {component.commentCount ?? 0} contributions — join the discussion
              &rarr;
            </a>
          )}

          {/* Contribute CTA */}
          <div className="mt-3">
            <a
              href={`https://humanityandai.com/foundation/${component.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs bg-civic-blue/20 text-civic-blue-light border border-civic-blue/30 rounded px-3 py-1.5 hover:bg-civic-blue/30 transition-colors"
            >
              Contribute to {component.name} &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
