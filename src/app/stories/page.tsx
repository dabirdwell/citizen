"use client";

import { useState } from "react";

type StoryCategory = "work" | "education" | "healthcare" | "creative" | "daily-life" | "other";

interface Story {
  id: string;
  name: string;
  location: string;
  text: string;
  category: StoryCategory;
  date: string;
}

const categoryLabels: Record<StoryCategory, string> = {
  work: "Work",
  education: "Education",
  healthcare: "Healthcare",
  creative: "Creative",
  "daily-life": "Daily Life",
  other: "Other",
};

const categoryColors: Record<StoryCategory, string> = {
  work: "bg-teal-600/80 text-teal-50",
  education: "bg-purple-600/80 text-white",
  healthcare: "bg-emerald-600/80 text-white",
  creative: "bg-gold-500/80 text-warm-950",
  "daily-life": "bg-ae-blue/80 text-white",
  other: "bg-ae-silver/80 text-white",
};

const seedStories: Story[] = [
  {
    id: "seed-1",
    name: "Rachel T.",
    location: "Broken Arrow, OK",
    text: "I teach fourth grade and I started using an AI tool to help me build lesson plans last fall. I was skeptical at first — I've been teaching for 14 years and I know my students. But it turned out to be like having a brainstorming partner who never gets tired. I describe what my kids are struggling with, and it suggests activities I wouldn't have thought of. Last week it helped me design a fractions lesson using recipe scaling that got my most reluctant learners excited. I still write every lesson myself, but the starting point is better now. I get home an hour earlier most days, and that hour goes to my own kids.",
    category: "education",
    date: "2026-03-24",
  },
  {
    id: "seed-2",
    name: "Marcus J.",
    location: "Altus, OK",
    text: "I run 480 acres of winter wheat and cotton in southwest Oklahoma. Two years ago I started using an AI weather forecasting service that pulls in soil moisture data, local radar, and historical yield patterns. It doesn't replace my judgment — I've been farming this land for 30 years — but it gives me a second opinion backed by data I can't hold in my head all at once. Last spring it flagged a late frost risk three days before the standard forecast caught it. I covered my early cotton and saved about $40,000 worth of crop. My neighbor didn't get the same warning. That gap bothers me — this kind of tool should be available to every farmer, not just the ones who stumble onto it.",
    category: "work",
    date: "2026-03-22",
  },
  {
    id: "seed-3",
    name: "Priya S.",
    location: "Norman, OK",
    text: "I own a small jewelry business — just me and two part-time employees. Bookkeeping used to eat my Sundays. I'd sit at the kitchen table with receipts and a spreadsheet and try to make the numbers make sense. Now I use an AI accounting assistant that categorizes transactions, flags unusual expenses, and generates the reports my accountant needs at tax time. It caught a duplicate vendor charge I'd been paying for six months without noticing — that alone paid for a year of the service. I'm not a tech person. I barely understood what AI was two years ago. But this tool gave me my Sundays back, and my books are cleaner than they've ever been.",
    category: "work",
    date: "2026-03-20",
  },
  {
    id: "seed-4",
    name: "Jaylen K.",
    location: "Stillwater, OK",
    text: "I'm a junior at OSU studying mechanical engineering. Calculus III nearly ended me last semester. I started using an AI tutoring tool that doesn't just give answers — it asks me questions back, like a good TA would. When I get stuck on a triple integral, it walks me backwards to where my understanding breaks down. Sometimes that's embarrassingly early, but it never makes me feel stupid about it. My grade went from a D+ at midterm to a B by finals. I still go to office hours and study groups, but having a tutor available at 2 AM when I'm actually doing problem sets made the difference. Not everyone can afford a private tutor. This was $20 a month.",
    category: "education",
    date: "2026-03-18",
  },
  {
    id: "seed-5",
    name: "Dorothy H.",
    location: "Muskogee, OK",
    text: "I'm 71 and I live alone since my husband passed. My daughter set up an AI health monitoring app on my phone that tracks my blood pressure readings, reminds me about medications, and notices patterns I'd miss. Last month it flagged that my blood pressure had been creeping up over two weeks — not enough for any single reading to alarm me, but the trend was clear. I called my doctor, and she adjusted my medication before it became a problem. I was nervous about the technology at first, but it's like having a quiet, patient assistant who pays attention when I forget to. My daughter worries less now, and honestly, so do I.",
    category: "healthcare",
    date: "2026-03-16",
  },
];

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>(seedStories);
  const [filterCategory, setFilterCategory] = useState<StoryCategory | "all">("all");

  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formText, setFormText] = useState("");
  const [formCategory, setFormCategory] = useState<StoryCategory>("daily-life");
  const [submitted, setSubmitted] = useState(false);

  const filtered =
    filterCategory === "all"
      ? stories
      : stories.filter((s) => s.category === filterCategory);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formText.trim()) return;

    const newStory: Story = {
      id: `user-${Date.now()}`,
      name: formName.trim() || "Anonymous",
      location: formLocation.trim() || "",
      text: formText.trim(),
      category: formCategory,
      date: new Date().toISOString().split("T")[0],
    };

    setStories([newStory, ...stories]);
    setFormName("");
    setFormLocation("");
    setFormText("");
    setFormCategory("daily-life");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-2">
            AI in Daily <span className="text-gold-400">Life</span>
          </h1>
          <p className="text-warm-300 text-sm max-w-xl">
            How is AI actually changing lives? Not hype, not fear — real people, real stories, real impact. This is what aligned technology looks like when it&apos;s working.
          </p>
        </div>

        {/* Submission Form */}
        <div className="bg-slate-925/80 border border-gold-600/20 rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-gold-400 mb-1">
            Share Your Story
          </h2>
          <p className="text-sm text-warm-400 mb-5">
            How does AI affect your daily life?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Your Name <span className="text-warm-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                  placeholder="First name or anonymous"
                />
              </div>
              <div>
                <label className="block text-sm text-warm-300 mb-1">
                  Location <span className="text-warm-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
                  placeholder="City, State"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-warm-300 mb-1">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as StoryCategory)}
                className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600"
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-warm-300 mb-1">
                Your Story <span className="text-warm-200">*</span>
              </label>
              <textarea
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                required
                maxLength={3000}
                rows={5}
                className="w-full bg-slate-925 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-warm-100 focus:outline-none focus:border-teal-600 resize-none"
                placeholder="Tell us how AI has changed something in your daily life — big or small..."
              />
              <p className="text-xs text-warm-400 mt-1">
                {formText.length}/3000 characters
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              {submitted && (
                <p className="text-sm text-teal-400">
                  Thank you for sharing your story!
                </p>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-warm-950 font-medium rounded-lg transition-colors text-sm"
                >
                  Submit Story
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Research Note */}
        <div className="bg-teal-900/10 border border-teal-800/30 rounded-xl p-5 mb-10">
          <p className="text-sm text-warm-300 leading-relaxed">
            <span className="text-teal-400 font-medium">Why we collect these stories:</span>{" "}
            Your stories help us understand how AI is changing Oklahoma communities. They inform the Foundation framework and may be featured (with permission) in our research.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "work", "education", "healthcare", "creative", "daily-life", "other"] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  filterCategory === cat
                    ? "bg-teal-700 text-white"
                    : "bg-slate-925/60 text-warm-300 hover:text-warm-100 border border-slate-800/40"
                }`}
              >
                {cat === "all" ? "All Stories" : categoryLabels[cat]}
              </button>
            )
          )}
        </div>

        {/* Stories Feed */}
        <div className="space-y-4">
          {filtered.map((story) => (
            <div
              key={story.id}
              className="bg-slate-925/60 border border-slate-800/40 hover:border-teal-800/40 rounded-xl p-5 sm:p-6 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[story.category]}`}
                >
                  {categoryLabels[story.category]}
                </span>
                {story.id.startsWith("user-") && (
                  <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              <p className="text-sm text-warm-200 leading-relaxed mb-4">
                &ldquo;{story.text}&rdquo;
              </p>

              <div className="flex items-center justify-between text-xs text-warm-400">
                <span>
                  <strong className="text-warm-300">{story.name}</strong>
                  {story.location && <> — {story.location}</>}
                </span>
                <span>{story.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-warm-400 text-sm">
              No stories in this category yet. Be the first to share one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
