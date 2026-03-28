"use client";

import { useState, useRef, useEffect } from "react";

/* ── keyword → Foundation component mapping ─────────────────────── */

interface FoundationMatch {
  label: string;
  slug: string;
  blurb: string;
}

const keywordMap: { keywords: string[]; match: FoundationMatch }[] = [
  {
    keywords: ["health", "doctor", "medical", "hospital", "sick", "disease", "clinic", "medicine", "healthcare"],
    match: {
      label: "Healthcare Access",
      slug: "healthcare-access",
      blurb: "AI-augmented healthcare available to every person regardless of means.",
    },
  },
  {
    keywords: ["school", "education", "learn", "teach", "student", "tutor", "classroom", "college", "university"],
    match: {
      label: "Accessible Education",
      slug: "accessible-education",
      blurb: "AI-powered learning tools adapted to every learner's needs.",
    },
  },
  {
    keywords: ["food", "hunger", "hungry", "meal", "nutrition", "grocery", "snap", "feed"],
    match: {
      label: "Food Security",
      slug: "food-security",
      blurb: "Ensuring every person has reliable access to nutritious food.",
    },
  },
  {
    keywords: ["rent", "housing", "home", "shelter", "homeless", "apartment", "eviction", "landlord", "mortgage"],
    match: {
      label: "Housing",
      slug: "housing",
      blurb: "Stable, affordable housing as a foundation for civic participation.",
    },
  },
  {
    keywords: ["mental health", "anxiety", "depression", "therapy", "counseling", "stress", "burnout", "loneliness", "suicide", "ptsd"],
    match: {
      label: "Mental Health",
      slug: "mental-health",
      blurb: "Accessible mental health support and community wellness resources.",
    },
  },
  {
    keywords: ["safety", "crime", "police", "violence", "danger", "assault", "theft", "emergency", "911"],
    match: {
      label: "Community Safety",
      slug: "safety",
      blurb: "Building safer communities through trust, transparency, and mutual aid.",
    },
  },
  {
    keywords: ["job", "work", "employment", "career", "unemployment", "layoff", "hire", "resume", "wage", "labor"],
    match: {
      label: "AI Labor Transition",
      slug: "ai-labor-transition",
      blurb: "Structured support for workers navigating the changing economy.",
    },
  },
  {
    keywords: ["vote", "election", "democracy", "government", "congress", "senate", "representative", "ballot", "civic"],
    match: {
      label: "Democratic AI Governance",
      slug: "democratic-ai-governance",
      blurb: "Citizen-driven oversight of AI development and deployment.",
    },
  },
  {
    keywords: ["privacy", "data", "surveillance", "tracking", "spy", "personal data"],
    match: {
      label: "Privacy Infrastructure",
      slug: "privacy-infrastructure",
      blurb: "Citizen data sovereignty and protection from surveillance capitalism.",
    },
  },
  {
    keywords: ["environment", "climate", "carbon", "pollution", "green", "sustainability", "nature", "energy"],
    match: {
      label: "Environmental Stewardship",
      slug: "environmental-stewardship",
      blurb: "AI deployment that accounts for and minimizes environmental impact.",
    },
  },
  {
    keywords: ["compute", "computer", "ai", "technology", "tech", "ubi", "basic income", "universal basic"],
    match: {
      label: "Universal Basic Compute",
      slug: "universal-basic-compute",
      blurb: "Guaranteed access to computational resources for every citizen.",
    },
  },
  {
    keywords: ["information", "news", "media", "censorship", "free speech", "journalism", "knowledge"],
    match: {
      label: "Information Freedom",
      slug: "information-freedom",
      blurb: "Universal access to information without corporate gatekeeping.",
    },
  },
  {
    keywords: ["disability", "accessible", "accessibility", "blind", "deaf", "wheelchair", "assistive"],
    match: {
      label: "Disability & Accessibility",
      slug: "disability-accessibility",
      blurb: "AI systems designed with and for disabled communities.",
    },
  },
  {
    keywords: ["art", "creative", "music", "artist", "create", "paint", "write", "film"],
    match: {
      label: "Creative Commons AI",
      slug: "creative-commons-ai",
      blurb: "AI tools that empower rather than replace human creativity.",
    },
  },
  {
    keywords: ["indigenous", "tribal", "native", "sovereignty"],
    match: {
      label: "Indigenous Data Sovereignty",
      slug: "indigenous-data-sovereignty",
      blurb: "Tribal and indigenous communities control their own data and AI systems.",
    },
  },
  {
    keywords: ["global south", "developing", "international", "africa", "asia", "latin america", "equity"],
    match: {
      label: "Global South Partnership",
      slug: "global-south-partnership",
      blurb: "Ensuring AI benefits reach developing nations equitably.",
    },
  },
  {
    keywords: ["algorithm", "bias", "fairness", "transparent", "explainable", "audit"],
    match: {
      label: "Algorithmic Transparency",
      slug: "algorithmic-transparency",
      blurb: "All algorithms affecting citizens must be auditable and explainable.",
    },
  },
  {
    keywords: ["internet", "connectivity", "wifi", "broadband", "network", "mesh"],
    match: {
      label: "Community Networks",
      slug: "community-networks",
      blurb: "Local mesh networks and community-owned connectivity.",
    },
  },
  {
    keywords: ["voting", "ballot", "secure vote", "election integrity"],
    match: {
      label: "Secure Voting",
      slug: "secure-voting",
      blurb: "Tamper-proof, auditable digital voting infrastructure.",
    },
  },
];

function findMatch(text: string): FoundationMatch | null {
  const lower = text.toLowerCase();
  // Check multi-word keywords first (longer matches take priority)
  for (const entry of keywordMap) {
    for (const kw of entry.keywords) {
      if (kw.includes(" ")) {
        if (lower.includes(kw)) return entry.match;
      }
    }
  }
  // Then single-word keywords
  for (const entry of keywordMap) {
    for (const kw of entry.keywords) {
      if (!kw.includes(" ")) {
        // Word-boundary-ish match for single keywords
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        if (regex.test(lower)) return entry.match;
      }
    }
  }
  return null;
}

/* ── message types ──────────────────────────────────────────────── */

interface Message {
  id: string;
  role: "user" | "guardian";
  text: string;
  link?: { url: string; label: string };
  timestamp: Date;
}

/* ── component ──────────────────────────────────────────────────── */

export default function GuardianChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "guardian",
      text: "Hello — I'm Guardian, a civic AI being built as part of the Foundation for Humanity and AI. I'm still early in development, but I can point you toward Foundation resources on topics like healthcare, education, housing, safety, and more. What's on your mind?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate a brief "thinking" delay
    setTimeout(() => {
      const match = findMatch(trimmed);
      let guardianMsg: Message;

      if (match) {
        guardianMsg = {
          id: `g-${Date.now()}`,
          role: "guardian",
          text: `Guardian AI is being developed as part of Foundation. For now, here is what Foundation says about ${match.label}:\n\n"${match.blurb}"`,
          link: {
            url: `https://humanityandai.com/foundation/${match.slug}`,
            label: `Learn more about ${match.label} →`,
          },
          timestamp: new Date(),
        };
      } else {
        guardianMsg = {
          id: `g-${Date.now()}`,
          role: "guardian",
          text: "Guardian AI will eventually be able to help with this. For now, explore the full Foundation framework to see how civic AI infrastructure is being built — piece by piece, in the open.",
          link: {
            url: "https://humanityandai.com/foundation/",
            label: "Explore the Foundation Framework →",
          },
          timestamp: new Date(),
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, guardianMsg]);
      inputRef.current?.focus();
    }, 1200 + Math.random() * 800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-950 via-[#0e1220] to-[#0d1019]">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-slate-800/40 bg-slate-950/60 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Shield icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600/20 to-guardian-amber/10 border border-teal-700/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400">
                <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-slate-950" />
          </div>
          <div>
            <h1 className="text-warm-50 font-semibold text-lg leading-tight">Guardian AI</h1>
            <p className="text-xs text-warm-400">Civic companion · Foundation stub</p>
          </div>
          <a
            href="https://humanityandai.com/foundation/guardian-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-teal-400/70 hover:text-teal-400 transition-colors hidden sm:block"
          >
            View Principles
          </a>
        </div>
      </div>

      {/* ── Message Thread ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-teal-700/30 border border-teal-600/20 text-warm-100 rounded-2xl rounded-br-md"
                    : "bg-slate-850/80 border border-slate-700/30 text-warm-200 rounded-2xl rounded-bl-md"
                } px-4 py-3`}
              >
                {msg.role === "guardian" && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400">
                      <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
                    </svg>
                    <span className="text-xs font-medium text-teal-400/80">Guardian</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                {msg.link && (
                  <a
                    href={msg.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {msg.link.label}
                  </a>
                )}
                <p className={`text-[10px] mt-2 ${msg.role === "user" ? "text-teal-400/40" : "text-warm-500/40"}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-850/80 border border-slate-700/30 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400">
                    <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
                  </svg>
                  <span className="text-xs font-medium text-teal-400/80">Guardian</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <span className="text-xs text-warm-400 italic">Guardian is listening</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-[guardianDot_1.4s_ease-in-out_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-[guardianDot_1.4s_ease-in-out_0.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-[guardianDot_1.4s_ease-in-out_0.4s_infinite]" />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input Bar ──────────────────────────────────────────── */}
      <div className="border-t border-slate-800/40 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-slate-850/60 border border-slate-700/40 rounded-xl px-4 py-2 focus-within:border-teal-700/50 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about healthcare, education, housing, safety..."
              className="flex-1 bg-transparent text-warm-100 text-sm placeholder:text-warm-500/50 outline-none"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-warm-500/40 mt-2 text-center">
            Guardian AI is a stub — responses link to Foundation resources on humanityandai.com
          </p>
        </div>
      </div>
    </div>
  );
}
