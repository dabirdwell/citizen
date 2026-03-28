"use client";

import { useState } from "react";
import Link from "next/link";
import { wizardComponents, type WizardComponent } from "@/data/foundation-wizard";

/* ─── Step indicator ─── */

const stepLabels = ["Choose", "Learn", "Share", "Done"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {stepLabels.map((label, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gold-500 text-slate-950 scale-110 shadow-lg shadow-gold-500/20"
                    : isDone
                    ? "bg-teal-600 text-white"
                    : "bg-slate-800/60 text-warm-400"
                }`}
              >
                {isDone ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[10px] tracking-wide transition-colors ${
                  isActive ? "text-gold-400 font-medium" : isDone ? "text-teal-400" : "text-warm-500"
                }`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 rounded-full mb-4 transition-colors duration-300 ${
                  i < current ? "bg-teal-600" : "bg-slate-800/60"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Icons ─── */

function WizardIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || "w-7 h-7";
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: cls,
  };

  switch (icon) {
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...props}>
          <path d="M12 21V10" />
          <path d="M16 6c-1.5 1.5-3 3-4 4" />
          <path d="M8 6c1.5 1.5 3 3 4 4" />
          <path d="M18 3c-2 2-4.5 4-6 7" />
          <path d="M6 3c2 2 4.5 4 6 7" />
          <path d="M14 14c-1 1-2 2-2 2" />
          <path d="M10 14c1 1 2 2 2 2" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2a7 7 0 00-4.6 12.3A4.98 4.98 0 007 17a5 5 0 005 5 5 5 0 005-5c0-1-.3-2-.4-2.7A7 7 0 0012 2z" />
          <path d="M12 8v4m0 0l-2-1m2 1l2-1" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...props}>
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...props}>
          <path d="M20 11l-8-8-3.5 3.5L13 11" />
          <path d="M4 11l8 8 3.5-3.5L11 11" />
          <path d="M15 7l2-2M9 17l-2 2" />
          <path d="M2 11h4M18 11h4" />
        </svg>
      );
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    case "road":
      return (
        <svg {...props}>
          <path d="M4 20L8 4M16 20l4-16" />
          <path d="M12 6v2M12 12v2M12 18v2" />
        </svg>
      );
    case "tools":
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...props}>
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <circle cx="16" cy="14" r="1" />
          <path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

/* ─── Step 1: Choose a Component ─── */

function StepChoose({
  onSelect,
}: {
  onSelect: (c: WizardComponent) => void;
}) {
  return (
    <div className="wizard-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-warm-50 mb-3">
          What matters most to <span className="text-gold-400">your community</span>?
        </h2>
        <p className="text-warm-300 text-sm max-w-lg mx-auto">
          Choose a Foundation component to share your perspective on. Every voice shapes the framework.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {wizardComponents.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="group flex flex-col items-center gap-3 bg-slate-925/60 border border-slate-800/50 hover:border-gold-500/50 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:bg-slate-925/90 hover:shadow-lg hover:shadow-gold-500/5 hover:-translate-y-0.5 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-warm-900/40 border border-warm-800/30 flex items-center justify-center text-warm-300 group-hover:text-gold-400 group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-all duration-200">
              <WizardIcon icon={c.icon} />
            </div>
            <span className="text-sm font-medium text-warm-200 group-hover:text-warm-50 transition-colors leading-snug">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Read the Excerpt ─── */

function StepLearn({
  component,
  onContinue,
  onBack,
}: {
  component: WizardComponent;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="wizard-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-4">
          <WizardIcon icon={component.icon} className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-warm-50 mb-2">
          {component.name}
        </h2>
        <p className="text-xs text-warm-500 uppercase tracking-wider">
          Foundation Component #{component.id}
        </p>
      </div>

      <div className="bg-slate-925/80 border border-warm-800/20 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="relative">
          <div className="absolute -top-2 -left-1 text-4xl text-gold-500/30 leading-none select-none">&ldquo;</div>
          <p className="text-warm-200 leading-relaxed text-base sm:text-lg pl-6 pr-2">
            {component.excerpt}
          </p>
          <div className="absolute -bottom-4 right-0 text-4xl text-gold-500/30 leading-none select-none">&rdquo;</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm text-warm-400 hover:text-warm-200 transition-colors"
        >
          &larr; Choose different
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20"
        >
          Share your thoughts &rarr;
        </button>
      </div>
    </div>
  );
}

/* ─── Step 3: Submit Feedback ─── */

function StepShare({
  component,
  onSubmit,
  onBack,
}: {
  component: WizardComponent;
  onSubmit: (text: string) => void;
  onBack: () => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="wizard-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-slate-925/60 border border-slate-800/40 rounded-full px-4 py-1.5 mb-4">
          <WizardIcon icon={component.icon} className="w-4 h-4 text-gold-400" />
          <span className="text-xs text-warm-300">{component.name}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-warm-50 mb-2">
          Your voice <span className="text-gold-400">matters</span>
        </h2>
        <p className="text-warm-300 text-sm max-w-md mx-auto">
          This is how civic infrastructure gets built — one honest perspective at a time.
        </p>
      </div>

      <div className="bg-slate-925/80 border border-warm-800/20 rounded-2xl p-6 sm:p-8 mb-6">
        <label className="block text-sm font-medium text-warm-200 mb-3">
          What would <span className="text-gold-400">{component.name}</span> look like in your community?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          maxLength={5000}
          placeholder="Share your ideas, experiences, or vision. There are no wrong answers — only perspectives that haven't been heard yet."
          className="w-full bg-slate-950/60 border border-slate-800/50 focus:border-gold-500/50 rounded-xl px-4 py-3 text-sm text-warm-100 placeholder:text-warm-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/20 resize-none transition-colors leading-relaxed"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-warm-500">
            Your contribution helps shape the Foundation framework.
          </p>
          <span className="text-[11px] text-warm-500">
            {text.length}/5000
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm text-warm-400 hover:text-warm-200 transition-colors"
        >
          &larr; Back
        </button>
        <button
          onClick={() => onSubmit(text)}
          disabled={text.trim().length < 10}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-400 disabled:bg-slate-800 disabled:text-warm-500 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 disabled:shadow-none"
        >
          Submit &rarr;
        </button>
      </div>
    </div>
  );
}

/* ─── Step 4: Confirmation ─── */

function StepConfirmation({
  component,
  onStartOver,
}: {
  component: WizardComponent;
  onStartOver: () => void;
}) {
  return (
    <div className="wizard-fade-in max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-600/10 border-2 border-teal-500/30 text-teal-400 mb-6 confirmation-pop">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-warm-50 mb-3">
          Thank you, <span className="text-teal-400">citizen</span>.
        </h2>
        <p className="text-warm-300 text-sm max-w-md mx-auto leading-relaxed">
          Your perspective on <strong className="text-warm-100">{component.name}</strong> has been
          received. Every contribution moves the Foundation forward.
        </p>
      </div>

      <div className="bg-slate-925/80 border border-teal-800/20 rounded-2xl p-6 sm:p-8 mb-8">
        <p className="text-warm-300 text-sm mb-4">
          Continue the conversation with others who care about this work:
        </p>
        <a
          href={component.discussionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-700/50 rounded-xl text-sm text-warm-100 hover:text-teal-300 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          Join the GitHub Discussion &rarr;
        </a>
        <p className="text-[11px] text-warm-500 mt-3">
          {component.name} — GitHub Discussion for Foundation Component #{component.id}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onStartOver}
          className="px-6 py-3 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 text-gold-400 font-medium rounded-xl transition-all duration-200 text-sm"
        >
          Contribute to another component
        </button>
        <Link
          href="/"
          className="px-6 py-3 text-sm text-warm-400 hover:text-warm-200 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Wizard ─── */

export default function ContributeWizard() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<WizardComponent | null>(null);
  // Will be POSTed to Formspree in a future iteration
  const [, setSubmittedText] = useState("");

  function handleSelect(c: WizardComponent) {
    setSelected(c);
    setStep(1);
  }

  function handleContinue() {
    setStep(2);
  }

  function handleSubmit(text: string) {
    setSubmittedText(text);
    // In the future, this will POST to Formspree.
    // For now, go straight to confirmation.
    setStep(3);
  }

  function handleStartOver() {
    setSelected(null);
    setSubmittedText("");
    setStep(0);
  }

  function handleBack(toStep: number) {
    setStep(toStep);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1019] to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-xs text-warm-500 uppercase tracking-widest mb-2">
            Foundation for Humanity &amp; AI
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-warm-100">
            Contribution <span className="text-gold-400">Wizard</span>
          </h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator current={step} />

        {/* Step Content */}
        {step === 0 && <StepChoose onSelect={handleSelect} />}
        {step === 1 && selected && (
          <StepLearn
            component={selected}
            onContinue={handleContinue}
            onBack={() => handleBack(0)}
          />
        )}
        {step === 2 && selected && (
          <StepShare
            component={selected}
            onSubmit={handleSubmit}
            onBack={() => handleBack(1)}
          />
        )}
        {step === 3 && selected && (
          <StepConfirmation
            component={selected}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}
