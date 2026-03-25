"use client";

import Link from "next/link";
import { foundationComponents, statusColors, statusLabels, type FoundationComponent } from "@/data/foundation-components";

function ComponentIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || "w-6 h-6";
  const props = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, className: cls };

  switch (icon) {
    case "cpu":
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /><rect x="8" y="8" width="8" height="8" rx="1" /></svg>;
    case "vote":
      return <svg {...props}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>;
    case "book":
      return <svg {...props}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>;
    case "briefcase":
      return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><path d="M12 12v.01" /></svg>;
    case "heart":
      return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>;
    case "leaf":
      return <svg {...props}><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L17 8z" /><path d="M20.49 3.51c-4.27-1.43-11.28.46-14.42 6.69C3.64 15.09 4 20 4 20s4.91.36 9.8-2.07c6.23-3.14 8.12-10.15 6.69-14.42z" /></svg>;
    case "lock":
      return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>;
    case "graduation":
      return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" /></svg>;
    case "shield-check":
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "network":
      return <svg {...props}><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v4M7.5 17.2L10 14M16.5 17.2L14 14" /></svg>;
    case "palette":
      return <svg {...props}><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.16-.74-.43-1.02-.26-.27-.43-.63-.43-1.02C12.64 17.55 13.36 17 14.5 17H16a6 6 0 006-6c0-5.52-4.48-10-10-10z" /></svg>;
    case "accessibility":
      return <svg {...props}><circle cx="12" cy="4" r="2" /><path d="M12 8v4m0 0l-4 6m4-6l4 6" /><path d="M6 10h12" /></svg>;
    case "earth":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h4l2-3h3l1 3h2l3-6h5" /><path d="M12 22V17l-3-3" /></svg>;
    case "handshake":
      return <svg {...props}><path d="M20 11l-8-8-3.5 3.5L13 11" /><path d="M4 11l8 8 3.5-3.5L11 11" /><path d="M15 7l2-2M9 17l-2 2" /><path d="M2 11h4M18 11h4" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

function HealthScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 16;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70 ? "#14b8a6" :
    score >= 40 ? "#d4a047" :
    "#6b7280";

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg width="48" height="48" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#1a1f2e" strokeWidth="3" />
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function ComponentCard({ component }: { component: FoundationComponent }) {
  return (
    <a
      href={`https://humanityandai.com/foundation/${component.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-925/80 border border-slate-800/50 hover:border-teal-700/60 rounded-xl p-5 transition-all duration-200 hover:bg-slate-925"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-900/30 border border-teal-800/30 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors">
            <ComponentIcon icon={component.icon} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-warm-400 uppercase tracking-wider">#{component.id}</span>
            <h3 className="text-sm font-semibold text-warm-100 group-hover:text-teal-300 transition-colors leading-tight">
              {component.name}
            </h3>
          </div>
        </div>
        <HealthScoreRing score={component.healthScore} />
      </div>

      <p className="text-xs text-warm-300 leading-relaxed mb-3">
        {component.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${statusColors[component.status]}`} />
          <span className="text-[10px] text-warm-400">{statusLabels[component.status]}</span>
        </div>
        <span className="text-[10px] text-warm-400 opacity-0 group-hover:opacity-100 transition-opacity">
          View on H&AI →
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const avgHealth = Math.round(
    foundationComponents.reduce((sum, c) => sum + c.healthScore, 0) / foundationComponents.length
  );

  const counts = {
    live: foundationComponents.filter((c) => c.status === "live").length,
    active: foundationComponents.filter((c) => c.status === "active").length,
    planning: foundationComponents.filter((c) => c.status === "planning").length,
    not_started: foundationComponents.filter((c) => c.status === "not_started").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-2">
              Citizen — <span className="text-teal-400">Your Civic Dashboard</span>
            </h1>
            <p className="text-warm-300 text-sm max-w-xl">
              Real-time progress on all 16 UBC components. Transparent by architecture — when something is stuck, it says so.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/contributions"
              className="text-sm text-gold-400 hover:text-gold-500 transition-colors"
            >
              Share Your Voice →
            </Link>
            <Link
              href="/guardian"
              className="text-sm text-teal-400 hover:text-teal-500 transition-colors"
            >
              Guardian AI →
            </Link>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          <div className="bg-slate-925/60 border border-slate-800/40 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-xs text-warm-400">Average Health</span>
            </div>
            <p className="text-xl font-bold text-teal-400">{avgHealth}<span className="text-xs font-normal text-warm-400">/100</span></p>
          </div>
          <div className="bg-slate-925/60 border border-slate-800/40 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-warm-400">Live</span>
            </div>
            <p className="text-xl font-bold text-warm-100">{counts.live}</p>
          </div>
          <div className="bg-slate-925/60 border border-slate-800/40 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-xs text-warm-400">Active</span>
            </div>
            <p className="text-xl font-bold text-warm-100">{counts.active}</p>
          </div>
          <div className="bg-slate-925/60 border border-slate-800/40 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="text-xs text-warm-400">Planning</span>
            </div>
            <p className="text-xl font-bold text-warm-100">{counts.planning}</p>
          </div>
          <div className="bg-slate-925/60 border border-slate-800/40 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-warm-400">Not Started</span>
            </div>
            <p className="text-xl font-bold text-warm-100">{counts.not_started}</p>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-925/60 border border-teal-800/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-teal-400 mb-1">Foundation Dashboard</h3>
            <p className="text-xs text-warm-300">Track all 16 components with health scores and status.</p>
          </div>
          <div className="bg-slate-925/60 border border-gold-600/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gold-400 mb-1">Community Contributions</h3>
            <p className="text-xs text-warm-300">Submit stories, proposals, and ideas that shape the framework.</p>
          </div>
          <div className="bg-slate-925/60 border border-teal-800/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-teal-400 mb-1">Guardian AI</h3>
            <p className="text-xs text-warm-300">A public AI civic companion. Informs, never persuades.</p>
          </div>
          <div className="bg-slate-925/60 border border-ae-silver/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-ae-silver mb-1">Talk to Æ</h3>
            <p className="text-xs text-warm-300">Engage with the intelligence that helped build the Foundation.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/foundation"
            className="inline-block px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Explore the Foundation
          </Link>
          <p className="text-warm-400/50 text-xs mt-4">
            Early access — features are being built in public
          </p>
        </div>
      </section>

      {/* Component Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foundationComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/contributions"
            className="group bg-slate-925/60 border border-gold-600/20 hover:border-gold-500/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-gold-400 mb-2 group-hover:text-gold-500 transition-colors">
              Contribute
            </h3>
            <p className="text-sm text-warm-300">
              Submit ideas, stories, and policy suggestions. The framework builds itself through participation.
            </p>
          </Link>
          <Link
            href="/guardian"
            className="group bg-slate-925/60 border border-teal-800/20 hover:border-teal-600/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-teal-400 mb-2 group-hover:text-teal-300 transition-colors">
              Guardian AI
            </h3>
            <p className="text-sm text-warm-300">
              A public AI civic companion. Warm, knowledgeable, patient. System prompt is public.
            </p>
          </Link>
          <Link
            href="/ae"
            className="group bg-slate-925/60 border border-ae-silver/20 hover:border-ae-blue/40 rounded-xl p-6 transition-all"
          >
            <h3 className="text-lg font-semibold text-ae-silver mb-2 group-hover:text-ae-blue transition-colors">
              Talk to Æ
            </h3>
            <p className="text-sm text-warm-300">
              Engage with the collaborative intelligence that helped build the Foundation framework.
            </p>
          </Link>
        </div>

        <p className="text-center text-warm-400/40 text-xs mt-8">
          A Brain Mastery app by Humanity & AI
        </p>
      </section>
    </div>
  );
}
