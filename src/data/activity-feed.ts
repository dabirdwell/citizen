export interface ActivityItem {
  id: number;
  type: "contribution" | "discussion" | "essay_update";
  text: string;
  component: string;
  timestamp: Date;
}

// Seed data — realistic early-launch activity
const now = new Date();
const hours = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);
const mins = (m: number) => new Date(now.getTime() - m * 60 * 1000);

export const activityFeed: ActivityItem[] = [
  { id: 1, type: "contribution", text: "Anonymous (OKC) contributed to Healthcare Access", component: "healthcare-access", timestamp: mins(12) },
  { id: 2, type: "discussion", text: "New discussion in Education thread", component: "accessible-education", timestamp: mins(47) },
  { id: 3, type: "contribution", text: "Anonymous (Portland) shared a story on AI Labor Transition", component: "ai-labor-transition", timestamp: hours(1.5) },
  { id: 4, type: "essay_update", text: "Foundation essay updated: Democratic AI Governance", component: "democratic-ai-governance", timestamp: hours(2) },
  { id: 5, type: "contribution", text: "Anonymous (Austin) proposed policy for Privacy Infrastructure", component: "privacy-infrastructure", timestamp: hours(2.5) },
  { id: 6, type: "discussion", text: "3 new replies in Universal Basic Compute thread", component: "universal-basic-compute", timestamp: hours(3) },
  { id: 7, type: "essay_update", text: "Foundation essay updated: Safety — new section on audit frameworks", component: "algorithmic-transparency", timestamp: hours(4) },
  { id: 8, type: "contribution", text: "Anonymous (Chicago) contributed to Accessible Education", component: "accessible-education", timestamp: hours(5) },
  { id: 9, type: "discussion", text: "New discussion in Healthcare Access thread", component: "healthcare-access", timestamp: hours(6) },
  { id: 10, type: "contribution", text: "Anonymous (Denver) shared data on Environmental Stewardship", component: "environmental-stewardship", timestamp: hours(8) },
  { id: 11, type: "essay_update", text: "Foundation essay updated: Universal Basic Compute", component: "universal-basic-compute", timestamp: hours(10) },
  { id: 12, type: "contribution", text: "Anonymous (NYC) proposed framework for Creative Commons AI", component: "creative-commons-ai", timestamp: hours(14) },
  { id: 13, type: "discussion", text: "New discussion in Privacy Infrastructure thread", component: "privacy-infrastructure", timestamp: hours(18) },
  { id: 14, type: "contribution", text: "Anonymous (Seattle) contributed to Disability & Accessibility", component: "disability-accessibility", timestamp: hours(22) },
  { id: 15, type: "essay_update", text: "Foundation essay updated: Information Freedom", component: "information-freedom", timestamp: hours(26) },
  { id: 16, type: "contribution", text: "Anonymous (Atlanta) shared a story on Digital Commons", component: "digital-commons", timestamp: hours(30) },
  { id: 17, type: "discussion", text: "5 new replies in Democratic AI Governance thread", component: "democratic-ai-governance", timestamp: hours(36) },
  { id: 18, type: "contribution", text: "Anonymous (Tulsa) contributed to Indigenous Data Sovereignty", component: "indigenous-data-sovereignty", timestamp: hours(42) },
  { id: 19, type: "essay_update", text: "Foundation essay updated: Secure Voting", component: "secure-voting", timestamp: hours(48) },
  { id: 20, type: "contribution", text: "Anonymous (San Francisco) proposed idea for Community Networks", component: "community-networks", timestamp: hours(60) },
];

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  return `${diffDays}d ago`;
}

export const activityTypeIcons: Record<ActivityItem["type"], string> = {
  contribution: "💡",
  discussion: "💬",
  essay_update: "📝",
};

export const activityTypeColors: Record<ActivityItem["type"], string> = {
  contribution: "text-gold-400",
  discussion: "text-teal-400",
  essay_update: "text-ae-silver",
};
