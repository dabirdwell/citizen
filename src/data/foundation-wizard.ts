export interface WizardComponent {
  id: number;
  name: string;
  slug: string;
  icon: string;
  excerpt: string;
  discussionUrl: string;
}

const DISCUSSIONS_BASE = "https://github.com/dabirdwell/humanity-and-ai/discussions";

export const wizardComponents: WizardComponent[] = [
  {
    id: 1,
    name: "Healthcare",
    slug: "healthcare",
    icon: "heart",
    excerpt:
      "Healthcare is not a privilege — it is infrastructure. A society that allows its people to suffer preventable illness has failed at the most basic level of the social contract. AI-augmented diagnostics and universal access must work together to close the gap.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 2,
    name: "Education",
    slug: "education",
    icon: "book",
    excerpt:
      "Education is the engine of a functioning democracy. When we invest in every learner — regardless of zip code, income, or ability — we invest in the collective intelligence of our communities. AI can personalize learning without replacing the human connection at its core.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 3,
    name: "Food Security",
    slug: "food-security",
    icon: "wheat",
    excerpt:
      "No person should wonder where their next meal comes from. Food security means local supply chains, community gardens, and smart distribution systems that eliminate waste while feeding everyone. Technology should serve the table, not just the market.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 4,
    name: "Housing",
    slug: "housing",
    icon: "home",
    excerpt:
      "Shelter is a human right, not a speculative asset. Stable housing is the foundation upon which everything else — health, education, employment — is built. Communities thrive when every member has a safe place to call home.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 5,
    name: "Mental Health",
    slug: "mental-health",
    icon: "brain",
    excerpt:
      "Mental health care has been treated as optional for too long. A society that ignores the inner lives of its people will fracture from the inside. Accessible, stigma-free support — augmented by AI where helpful — must be woven into the fabric of daily life.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 6,
    name: "Safety",
    slug: "safety",
    icon: "shield",
    excerpt:
      "Safety is not surveillance. True community safety comes from trust, investment, and mutual care — not from cameras on every corner. When people feel safe, they participate. When they participate, communities grow stronger.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 7,
    name: "Information Access",
    slug: "information-access",
    icon: "globe",
    excerpt:
      "Access to truthful, unfiltered information is the oxygen of democracy. When corporations or algorithms decide what people see, the public loses its ability to self-govern. Information must flow freely, like water through a public system.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 8,
    name: "Thought Privacy",
    slug: "thought-privacy",
    icon: "lock",
    excerpt:
      "Your thoughts are yours. As AI becomes more capable of inferring intent, belief, and emotion, the right to cognitive liberty becomes existential. No system — public or private — should have access to the inner workings of a person's mind without explicit consent.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 9,
    name: "Clean Water",
    slug: "clean-water",
    icon: "droplet",
    excerpt:
      "Clean water is civilization's oldest promise and its most broken one. From Flint to communities worldwide, water access remains a justice issue. Smart infrastructure and transparent monitoring can ensure that every tap delivers what every person deserves.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 10,
    name: "Safe Spaces",
    slug: "safe-spaces",
    icon: "users",
    excerpt:
      "Every community needs places where people can gather, share, and belong without fear. Safe spaces — physical and digital — are where democracy happens at the human scale. They are where neighbors become citizens and strangers become allies.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 11,
    name: "Social Contract",
    slug: "social-contract",
    icon: "handshake",
    excerpt:
      "The social contract is not a document — it is a living agreement between people and the systems that serve them. When that contract breaks, trust dissolves. Rebuilding it requires transparency, accountability, and a shared commitment to the common good.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 12,
    name: "Sustainable Energy",
    slug: "sustainable-energy",
    icon: "sun",
    excerpt:
      "Energy independence is community independence. Sustainable, locally generated power frees communities from extraction economics and gives them control over their own futures. The sun doesn't send a bill — and neither should basic energy access.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 13,
    name: "Transportation",
    slug: "transportation",
    icon: "road",
    excerpt:
      "Mobility is freedom. When transportation systems fail, people are cut off from jobs, healthcare, and each other. Equitable transit — smart, accessible, and community-designed — connects people to opportunity and each other.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 14,
    name: "Skills Training",
    slug: "skills-training",
    icon: "tools",
    excerpt:
      "The economy is changing faster than any one person can keep up with alone. Skills training — continuous, accessible, and adapted to local needs — ensures that no worker is left behind. Retraining is not charity; it is infrastructure.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 15,
    name: "Accessible Education",
    slug: "accessible-education",
    icon: "graduation",
    excerpt:
      "Education that excludes is education that fails. Accessible education means every learner — regardless of disability, language, or background — has the tools and support they need. AI can adapt to the learner; the learner should never have to adapt to the system.",
    discussionUrl: DISCUSSIONS_BASE,
  },
  {
    id: 16,
    name: "UBI",
    slug: "ubi",
    icon: "wallet",
    excerpt:
      "Universal Basic Income is not about replacing work — it is about recognizing that the floor should never be destitution. When people have a baseline of security, they create, volunteer, care for others, and participate in democracy more fully.",
    discussionUrl: DISCUSSIONS_BASE,
  },
];
