const REPO_API = "/api/discussions";
const CACHE_KEY = "citizen_discussion_stats";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export interface DiscussionStat {
  componentSlug: string;
  discussionUrl: string;
  commentCount: number;
  lastActivity: string;
}

export interface DiscussionComment {
  author: string;
  body: string;
  discussionTitle: string;
  createdAt: string;
  discussionUrl: string;
}

// Map discussion titles to component slugs
const TITLE_TO_SLUG: Record<string, string> = {
  "healthcare": "healthcare",
  "education": "education",
  "food security": "food-security",
  "housing": "housing",
  "mental health": "mental-health",
  "environmental safety": "environmental-safety",
  "transportation": "transportation",
  "digital access": "digital-access",
  "civic participation": "civic-participation",
  "economic security": "economic-security",
  "legal protection": "legal-protection",
  "information access": "information-access",
  "cultural enrichment": "cultural-enrichment",
  "secure voting": "secure-voting",
  "thought privacy": "thought-privacy",
  "energy access": "energy-access",
};

function matchSlug(title: string): string | null {
  const lower = title.toLowerCase().trim();
  // Direct match
  if (TITLE_TO_SLUG[lower]) return TITLE_TO_SLUG[lower];
  // Partial match — check if title contains a component name
  for (const [key, slug] of Object.entries(TITLE_TO_SLUG)) {
    if (lower.includes(key)) return slug;
  }
  return null;
}

interface CachedData {
  stats: DiscussionStat[];
  recentComments: DiscussionComment[];
  timestamp: number;
}

function getCached(): CachedData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (Date.now() - cached.timestamp < CACHE_TTL) return cached;
  } catch {
    // Ignore parse errors
  }
  return null;
}

function setCache(data: CachedData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota errors
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GitHubDiscussion {
  number: number;
  title: string;
  html_url: string;
  comments: number;
  updated_at: string;
  created_at: string;
  user?: { login: string };
  body?: string;
}

export async function getDiscussionStats(): Promise<{
  stats: DiscussionStat[];
  recentComments: DiscussionComment[];
}> {
  const cached = getCached();
  if (cached) return { stats: cached.stats, recentComments: cached.recentComments };

  try {
    const res = await fetch(REPO_API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const discussions: GitHubDiscussion[] = await res.json();

    const stats: DiscussionStat[] = [];
    const recentComments: DiscussionComment[] = [];

    for (const d of discussions) {
      const slug = matchSlug(d.title);
      if (slug) {
        stats.push({
          componentSlug: slug,
          discussionUrl: d.html_url,
          commentCount: d.comments,
          lastActivity: d.updated_at,
        });
      }
      // Use top-level discussion info as a proxy for recent activity
      recentComments.push({
        author: d.user?.login ?? "anonymous",
        body: d.body?.slice(0, 120) ?? d.title,
        discussionTitle: d.title,
        createdAt: d.updated_at || d.created_at,
        discussionUrl: d.html_url,
      });
    }

    // Sort by most recent
    recentComments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const result = { stats, recentComments: recentComments.slice(0, 5) };
    setCache({ ...result, timestamp: Date.now() });
    return result;
  } catch (err) {
    console.warn("Failed to fetch GitHub discussions, using static data:", err);
    return { stats: [], recentComments: [] };
  }
}

export function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
