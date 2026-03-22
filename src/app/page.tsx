import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-950 via-warm-900/50 to-warm-950" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-guardian-amber">Citizen</span>
          </h1>
          <p className="text-2xl sm:text-3xl text-warm-100 mb-2 font-light">
            Your seat at the table.
          </p>
          <p className="text-lg text-warm-200 mb-12 max-w-xl mx-auto">
            The civic hub of the Foundation for Humanity and AI. Track progress
            on all 16 components, contribute your voice, and engage with AI
            built for citizens — not consumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/foundation"
              className="px-8 py-3 bg-civic-blue hover:bg-civic-blue-light text-white rounded-lg transition-colors text-lg"
            >
              Foundation Status
            </Link>
            <Link
              href="/guardian"
              className="px-8 py-3 border border-guardian-amber text-guardian-amber hover:bg-guardian-amber/10 rounded-lg transition-colors text-lg"
            >
              Talk to Guardian AI
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Foundation Status"
            description="Real-time progress on all 16 UBC components. Transparent by architecture — when something is stuck, it says so."
            href="/foundation"
            accent="civic"
          />
          <FeatureCard
            title="Guardian AI"
            description="A public AI civic companion. Warm, knowledgeable, patient. Informs, never persuades. System prompt is public."
            href="/guardian"
            accent="guardian"
          />
          <FeatureCard
            title="Talk to Æ"
            description="Engage with the collaborative intelligence that helped build the Foundation framework. Not a chatbot — a perspective."
            href="/ae"
            accent="ae"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <FeatureCard
            title="Contribute"
            description="Submit stories, proposals, data, and ideas against specific UBC components. The framework builds itself through participation."
            href="/contributions"
            accent="civic"
          />
          <FeatureCard
            title="Secure Voting"
            description="Transparent, auditable voting on Foundation priorities. Coming after independent security audit."
            href="#"
            accent="guardian"
            comingSoon
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-800 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-warm-200 text-sm">
          <p>Foundation for Humanity and AI</p>
          <p>
            Citizen is free. Civic infrastructure should not require permission
            to access.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
  accent,
  comingSoon,
}: {
  title: string;
  description: string;
  href: string;
  accent: "civic" | "guardian" | "ae";
  comingSoon?: boolean;
}) {
  const accentColors = {
    civic: "border-civic-blue hover:border-civic-blue-light",
    guardian: "border-guardian-amber hover:border-guardian-amber-light",
    ae: "border-ae-silver hover:border-ae-blue",
  };

  return (
    <Link
      href={href}
      className={`block p-6 rounded-lg border ${accentColors[accent]} bg-warm-900/30 transition-colors group`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-warm-50">{title}</h3>
        {comingSoon && (
          <span className="text-xs px-2 py-1 rounded bg-warm-800 text-warm-200">
            Coming Soon
          </span>
        )}
      </div>
      <p className="text-warm-200 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
