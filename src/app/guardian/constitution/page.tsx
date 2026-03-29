import Link from "next/link";
import {
  GUARDIAN_SYSTEM_PROMPT,
  GUARDIAN_VERSION,
  GUARDIAN_LAST_UPDATED,
} from "@/data/guardian-prompt";

export const metadata = {
  title: "Guardian Constitution — Citizen",
  description:
    "The full public system prompt for Guardian AI. Transparent, versioned, and subject to citizen input.",
};

export default function ConstitutionPage() {
  // Split prompt into sections by the ═══ dividers
  const sections = GUARDIAN_SYSTEM_PROMPT.split(
    /═{3,}\n([^\n]+)\n═{3,}/
  );

  // Parse into structured sections: first chunk is the preamble, then pairs of [title, body]
  const preamble = sections[0]?.trim();
  const parsedSections: { title: string; body: string }[] = [];
  for (let i = 1; i < sections.length; i += 2) {
    parsedSections.push({
      title: sections[i]?.trim() ?? "",
      body: sections[i + 1]?.trim() ?? "",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-950 via-[#1a130d] to-[#0f0b07]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/guardian"
            className="inline-flex items-center gap-1.5 text-sm text-guardian-amber/60 hover:text-guardian-amber transition-colors mb-6"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Guardian
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-guardian-amber/20 to-amber-900/20 border border-guardian-amber/30 flex items-center justify-center shadow-[0_0_16px_rgba(212,160,71,0.15)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-guardian-amber"
              >
                <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-warm-50">
                Guardian Constitution
              </h1>
              <p className="text-sm text-warm-400 mt-1">
                The complete public system prompt for Guardian AI
              </p>
            </div>
          </div>

          {/* Version badge */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 bg-guardian-amber/10 border border-guardian-amber/20 text-guardian-amber text-xs font-medium px-3 py-1 rounded-full">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
              </svg>
              {GUARDIAN_VERSION}
            </span>
            <span className="text-xs text-warm-400/60">
              Last updated: {GUARDIAN_LAST_UPDATED}
            </span>
            <span className="text-xs text-warm-400/60">
              License: CC-BY-SA 4.0
            </span>
          </div>
        </div>

        {/* Transparency notice */}
        <div className="bg-guardian-amber/5 border border-guardian-amber/15 rounded-xl px-5 py-4 mb-8">
          <p className="text-sm text-warm-200 leading-relaxed">
            This is the complete, unedited system prompt that Guardian AI
            receives at the start of every conversation. No other AI shows you
            its instructions. This transparency is not a vulnerability — it is
            the feature.
          </p>
        </div>

        {/* Prompt content */}
        <div className="space-y-8">
          {/* Preamble */}
          {preamble && (
            <div className="bg-warm-900/20 border border-warm-800/15 rounded-xl px-6 py-5">
              <pre className="text-sm text-warm-200 leading-relaxed whitespace-pre-wrap font-sans">
                {preamble}
              </pre>
            </div>
          )}

          {/* Sections */}
          {parsedSections.map((section) => (
            <div
              key={section.title}
              className="bg-warm-900/20 border border-warm-800/15 rounded-xl px-6 py-5"
            >
              <h2 className="text-lg font-semibold text-guardian-amber mb-4 pb-3 border-b border-guardian-amber/10">
                {section.title}
              </h2>
              <pre className="text-sm text-warm-200 leading-relaxed whitespace-pre-wrap font-sans">
                {section.body}
              </pre>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-12 pt-8 border-t border-warm-800/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-warm-200 mb-1">
                Propose Changes
              </h3>
              <p className="text-xs text-warm-400 leading-relaxed max-w-md">
                Guardian&apos;s system prompt is subject to citizen input. If you
                see something that should change, say so.
              </p>
            </div>
            <a
              href="https://github.com/Humanity-and-AI/Foundation/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-guardian-amber/10 border border-guardian-amber/20 text-guardian-amber text-sm font-medium px-4 py-2 rounded-lg hover:bg-guardian-amber/20 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Propose on GitHub Discussions
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/guardian"
              className="text-sm text-guardian-amber/60 hover:text-guardian-amber transition-colors"
            >
              Talk to Guardian →
            </Link>
            <Link
              href="/foundation"
              className="text-sm text-warm-400/60 hover:text-warm-400 transition-colors"
            >
              View Foundation Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
