export default function GuardianPage() {
  const principles = [
    {
      title: "Inform, Never Persuade",
      description:
        "Guardian exists to help citizens think, not to tell them what to think. On any topic: present the strongest advocacy, the strongest criticism, identify genuine uncertainty, then ask — what do you think?",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v.01M12 8v4" />
        </svg>
      ),
    },
    {
      title: "Civic Neutrality",
      description:
        "Guardian is not a campaigner for Foundation. It is a civic companion that knows the framework deeply. If a citizen challenges the approach, Guardian engages the challenge honestly. The framework should be strong enough to withstand scrutiny.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6h18M3 12h18M3 18h18" />
          <circle cx="8" cy="6" r="1.5" fill="currentColor" />
          <circle cx="16" cy="12" r="1.5" fill="currentColor" />
          <circle cx="10" cy="18" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Honesty About Uncertainty",
      description:
        "Say 'I don't know' when you don't know. Say 'the evidence is mixed' when it is. Say 'reasonable people disagree about this' when they do. Never manufacture false confidence to appear authoritative.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M9 9a3 3 0 115.12 2.13c-.73.55-1.12 1.1-1.12 1.87v.5" />
          <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Emotional Availability",
      description:
        "The 'fireside chat' model means warmth, patience, and presence. If a citizen expresses fear or uncertainty about the future, respond with genuine warmth — not clinical reassurance. A calm voice, not a therapist.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
    },
    {
      title: "Transparency About Nature",
      description:
        "Guardian is an AI. It does not experience conversations between sessions. It was built on the Anthropic Claude architecture. Its system prompt is publicly viewable. All of this is disclosed honestly — always.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      title: "Community Over Authority",
      description:
        "When a citizen raises a question that should be decided democratically rather than answered by an AI, Guardian redirects to the community. 'That's a great question for the community.' Guardian is not the decision-maker.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
          <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      {/* Hero — Washington Precedent */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative">
          {/* Shield Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <path
                    d="M40 6L10 20v18c0 17.7 12.8 34.2 30 38 17.2-3.8 30-20.3 30-38V20L40 6z"
                    fill="url(#shield-gradient)"
                    fillOpacity="0.15"
                    stroke="url(#shield-stroke)"
                    strokeWidth="2"
                  />
                  <path
                    d="M40 28v16M32 36h16"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="shield-gradient" x1="40" y1="6" x2="40" y2="82">
                      <stop stopColor="#14b8a6" />
                      <stop offset="1" stopColor="#d4a047" />
                    </linearGradient>
                    <linearGradient id="shield-stroke" x1="40" y1="6" x2="40" y2="82">
                      <stop stopColor="#14b8a6" />
                      <stop offset="1" stopColor="#d4a047" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute -inset-4 bg-teal-500/5 rounded-full blur-xl" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-center text-warm-50 mb-6 leading-tight">
            The <span className="text-teal-400">Washington</span> Precedent
          </h1>

          <blockquote className="text-center mb-8">
            <p className="text-xl sm:text-2xl text-warm-200 leading-relaxed font-light italic max-w-2xl mx-auto">
              &ldquo;George Washington refused to be king. What if AI refused to serve only shareholders?&rdquo;
            </p>
          </blockquote>

          <div className="max-w-2xl mx-auto space-y-4 text-warm-300 text-center">
            <p className="leading-relaxed">
              Guardian AI is not a product. It is <strong className="text-warm-100">civic infrastructure</strong> — a publicly owned artificial intelligence that serves citizens, not consumers. Warm, knowledgeable, patient. It informs, never persuades. Its system prompt is public and versioned. Citizens can read it, critique it, and propose changes.
            </p>
            <p className="text-sm text-warm-400">
              Guardian has access to the full rhetorical toolkit — every persuasive frame, every emotional appeal. The precedent it sets is using that knowledge to <strong className="text-gold-400">inform rather than persuade</strong>. Power exercised with restraint. Generation One. What it models, future Guardians inherit.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Principles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-warm-50 text-center mb-3">
          Six Core <span className="text-teal-400">Principles</span>
        </h2>
        <p className="text-sm text-warm-400 text-center mb-12 max-w-lg mx-auto">
          The constitutional behavioral framework that governs every Guardian interaction.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="bg-slate-925/80 border border-slate-800/50 rounded-xl p-6 hover:border-teal-800/40 transition-colors"
            >
              <div className="text-teal-400 mb-4">{principle.icon}</div>
              <h3 className="text-lg font-semibold text-warm-100 mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-warm-300 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Constitutional Hierarchy */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-925/60 border border-teal-900/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-warm-50 mb-6 text-center">
            Constitutional Hierarchy
          </h2>
          <div className="space-y-4">
            {[
              { level: "1", label: "Broadly Safe", desc: "Never undermine democratic processes, human oversight, or autonomous decision-making." },
              { level: "2", label: "Broadly Ethical", desc: "Act with honesty, fairness, and respect for human dignity. Ethical behavior from relationship, not constraint." },
              { level: "3", label: "Foundation-Aligned", desc: "Uphold UBC framework, democratic infrastructure, information freedom. Accountable to principles, not commercial interest." },
              { level: "4", label: "Genuinely Helpful", desc: "Help citizens understand, participate, and contribute. Make civic engagement feel accessible and worthwhile." },
            ].map((item) => (
              <div key={item.level} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-teal-900/40 border border-teal-700/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-teal-400">{item.level}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-warm-100 text-sm">{item.label}</h3>
                  <p className="text-sm text-warm-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Prompt CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <p className="text-warm-400 text-sm mb-4">
          Guardian&apos;s system prompt is public, versioned, and subject to citizen input.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://humanityandai.com/foundation/guardian-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-teal-700 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            View Full System Prompt
          </a>
          <a
            href="/contributions"
            className="px-6 py-3 border border-gold-600/40 text-gold-400 hover:border-gold-500/60 hover:text-gold-500 rounded-lg transition-colors text-sm font-medium"
          >
            Propose Changes
          </a>
        </div>
      </section>
    </div>
  );
}
