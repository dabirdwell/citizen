export type ComponentStatus = "not_started" | "planning" | "active" | "live";

export interface FoundationComponent {
  id: number;
  name: string;
  description: string;
  status: ComponentStatus;
  progressPct: number;
  currentStatusText: string;
}

export const foundationComponents: FoundationComponent[] = [
  {
    id: 1,
    name: "Universal Basic Compute",
    description: "Guaranteed access to computational resources for every citizen.",
    status: "active",
    progressPct: 35,
    currentStatusText: "Core framework defined, pilot program design in progress",
  },
  {
    id: 2,
    name: "Democratic AI Governance",
    description: "Citizen-driven oversight of AI development and deployment.",
    status: "active",
    progressPct: 40,
    currentStatusText: "Governance model drafted, public comment period active",
  },
  {
    id: 3,
    name: "Information Freedom",
    description: "Universal access to information without corporate gatekeeping.",
    status: "planning",
    progressPct: 20,
    currentStatusText: "Policy framework under development",
  },
  {
    id: 4,
    name: "Algorithmic Transparency",
    description: "All algorithms affecting citizens must be auditable and explainable.",
    status: "planning",
    progressPct: 15,
    currentStatusText: "Research phase — surveying existing transparency frameworks",
  },
  {
    id: 5,
    name: "Digital Commons",
    description: "Shared digital infrastructure owned by the public, not corporations.",
    status: "planning",
    progressPct: 10,
    currentStatusText: "Concept development and stakeholder mapping",
  },
  {
    id: 6,
    name: "AI Labor Transition",
    description: "Structured support for workers displaced by automation.",
    status: "planning",
    progressPct: 18,
    currentStatusText: "Economic modeling and policy research underway",
  },
  {
    id: 7,
    name: "Healthcare Access",
    description: "AI-augmented healthcare available to every person regardless of means.",
    status: "active",
    progressPct: 25,
    currentStatusText: "Partnership discussions with rural health networks",
  },
  {
    id: 8,
    name: "Environmental Stewardship",
    description: "AI deployment must account for and minimize environmental impact.",
    status: "planning",
    progressPct: 12,
    currentStatusText: "Carbon impact assessment methodology in development",
  },
  {
    id: 9,
    name: "Privacy Infrastructure",
    description: "Citizen data sovereignty and protection from surveillance capitalism.",
    status: "active",
    progressPct: 30,
    currentStatusText: "Technical architecture for data sovereignty defined",
  },
  {
    id: 10,
    name: "Accessible Education",
    description: "AI-powered learning tools adapted to every learner's needs.",
    status: "active",
    progressPct: 45,
    currentStatusText: "Clarity and Dojo apps in active development",
  },
  {
    id: 11,
    name: "Secure Voting",
    description: "Tamper-proof, auditable digital voting infrastructure.",
    status: "planning",
    progressPct: 8,
    currentStatusText: "Awaiting independent security audit before development",
  },
  {
    id: 12,
    name: "Community Networks",
    description: "Local mesh networks and community-owned connectivity.",
    status: "not_started",
    progressPct: 0,
    currentStatusText: "Scheduled for future phases",
  },
  {
    id: 13,
    name: "Creative Commons AI",
    description: "AI tools that empower rather than replace human creativity.",
    status: "planning",
    progressPct: 15,
    currentStatusText: "Artist consultation and ethical framework development",
  },
  {
    id: 14,
    name: "Disability & Accessibility",
    description: "AI systems designed with and for disabled communities.",
    status: "planning",
    progressPct: 20,
    currentStatusText: "Advisory board formation with disability advocates",
  },
  {
    id: 15,
    name: "Indigenous Data Sovereignty",
    description: "Tribal and indigenous communities control their own data and AI systems.",
    status: "planning",
    progressPct: 10,
    currentStatusText: "Initial conversations with tribal sovereignty advocates",
  },
  {
    id: 16,
    name: "Global South Partnership",
    description: "Ensuring AI benefits reach developing nations equitably.",
    status: "not_started",
    progressPct: 0,
    currentStatusText: "Scheduled for future phases",
  },
];

export const statusColors: Record<ComponentStatus, string> = {
  not_started: "bg-gray-500",
  planning: "bg-amber-500",
  active: "bg-green-500",
  live: "bg-blue-500",
};

export const statusLabels: Record<ComponentStatus, string> = {
  not_started: "Not Started",
  planning: "Planning",
  active: "Active Development",
  live: "Live",
};
