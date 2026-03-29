export type ComponentStatus = "not_started" | "planning" | "active" | "live";

export interface FoundationComponent {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: ComponentStatus;
  progressPct: number;
  healthScore: number;
  currentStatusText: string;
  recentContributors: number;
  hasRecentActivity: boolean;
}

export const foundationComponents: FoundationComponent[] = [
  {
    id: 1,
    name: "Healthcare",
    slug: "healthcare",
    description:
      "Healthcare is not a privilege — it is infrastructure. AI-augmented diagnostics and universal access must close the gap.",
    icon: "heart",
    status: "live",
    progressPct: 100,
    healthScore: 90,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 12,
    hasRecentActivity: true,
  },
  {
    id: 2,
    name: "Education",
    slug: "education",
    description:
      "Investing in every learner — regardless of zip code, income, or ability — invests in collective intelligence.",
    icon: "book",
    status: "live",
    progressPct: 100,
    healthScore: 88,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 10,
    hasRecentActivity: true,
  },
  {
    id: 3,
    name: "Food Security",
    slug: "food-security",
    description:
      "No person should wonder where their next meal comes from. Smart distribution and local supply chains eliminate waste.",
    icon: "wheat",
    status: "live",
    progressPct: 100,
    healthScore: 85,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 6,
    hasRecentActivity: true,
  },
  {
    id: 4,
    name: "Housing",
    slug: "housing",
    description:
      "Shelter is a human right, not a speculative asset. Stable housing is the foundation for health, education, and employment.",
    icon: "home",
    status: "live",
    progressPct: 100,
    healthScore: 86,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 7,
    hasRecentActivity: true,
  },
  {
    id: 5,
    name: "Mental Health",
    slug: "mental-health",
    description:
      "Accessible, stigma-free mental health support — augmented by AI where helpful — woven into the fabric of daily life.",
    icon: "brain",
    status: "live",
    progressPct: 100,
    healthScore: 84,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 8,
    hasRecentActivity: true,
  },
  {
    id: 6,
    name: "Environmental Safety",
    slug: "environmental-safety",
    description:
      "True community safety comes from trust, investment, and mutual care — not surveillance. Safe people participate more.",
    icon: "shield",
    status: "live",
    progressPct: 100,
    healthScore: 82,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 5,
    hasRecentActivity: true,
  },
  {
    id: 7,
    name: "Transportation",
    slug: "transportation",
    description:
      "Mobility is freedom. Equitable transit — smart, accessible, and community-designed — connects people to opportunity.",
    icon: "road",
    status: "live",
    progressPct: 100,
    healthScore: 80,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 4,
    hasRecentActivity: true,
  },
  {
    id: 8,
    name: "Digital Access",
    slug: "digital-access",
    description:
      "Shared digital infrastructure owned by the public. Universal connectivity and computational access for every citizen.",
    icon: "globe",
    status: "live",
    progressPct: 100,
    healthScore: 83,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 6,
    hasRecentActivity: true,
  },
  {
    id: 9,
    name: "Civic Participation",
    slug: "civic-participation",
    description:
      "Democracy works when people participate. Every community needs accessible, inclusive spaces for civic engagement.",
    icon: "users",
    status: "live",
    progressPct: 100,
    healthScore: 81,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 9,
    hasRecentActivity: true,
  },
  {
    id: 10,
    name: "Economic Security",
    slug: "economic-security",
    description:
      "A baseline of economic security lets people create, volunteer, care for others, and participate in democracy more fully.",
    icon: "wallet",
    status: "live",
    progressPct: 100,
    healthScore: 79,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 5,
    hasRecentActivity: true,
  },
  {
    id: 11,
    name: "Legal Protection",
    slug: "legal-protection",
    description:
      "Equal access to legal protection regardless of means. AI can help close the justice gap without replacing human judgment.",
    icon: "scale",
    status: "live",
    progressPct: 100,
    healthScore: 78,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 4,
    hasRecentActivity: true,
  },
  {
    id: 12,
    name: "Information Access",
    slug: "information-access",
    description:
      "Access to truthful, unfiltered information is the oxygen of democracy. Information must flow freely, like water.",
    icon: "search",
    status: "live",
    progressPct: 100,
    healthScore: 85,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 7,
    hasRecentActivity: true,
  },
  {
    id: 13,
    name: "Cultural Enrichment",
    slug: "cultural-enrichment",
    description:
      "AI tools that empower rather than replace human creativity. Culture belongs to communities, not corporations.",
    icon: "palette",
    status: "live",
    progressPct: 100,
    healthScore: 77,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 3,
    hasRecentActivity: true,
  },
  {
    id: 14,
    name: "Secure Voting",
    slug: "secure-voting",
    description:
      "Tamper-proof, auditable digital voting infrastructure that preserves the integrity of democratic choice.",
    icon: "shield-check",
    status: "live",
    progressPct: 100,
    healthScore: 76,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 5,
    hasRecentActivity: true,
  },
  {
    id: 15,
    name: "Thought Privacy",
    slug: "thought-privacy",
    description:
      "Your thoughts are yours. No system should access the inner workings of a person's mind without explicit consent.",
    icon: "lock",
    status: "live",
    progressPct: 100,
    healthScore: 80,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 6,
    hasRecentActivity: true,
  },
  {
    id: 16,
    name: "Energy Access",
    slug: "energy-access",
    description:
      "Sustainable, locally generated power frees communities from extraction economics. The sun doesn't send a bill.",
    icon: "sun",
    status: "live",
    progressPct: 100,
    healthScore: 79,
    currentStatusText: "Essay published, community discussion active",
    recentContributors: 4,
    hasRecentActivity: true,
  },
];

export const statusColors: Record<ComponentStatus, string> = {
  not_started: "bg-gray-500",
  planning: "bg-gold-500",
  active: "bg-teal-500",
  live: "bg-blue-500",
};

export const statusLabels: Record<ComponentStatus, string> = {
  not_started: "Not Started",
  planning: "Planning",
  active: "Active Development",
  live: "Live",
};
