import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Citizen — Your Civic Dashboard",
  description:
    "Civic hub of the Foundation for Humanity and AI. Track Foundation progress, contribute, and engage with Guardian AI.",
};

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/contribute", label: "Contribute" },
  { href: "/contributions", label: "Contributions" },
  { href: "/stories", label: "Stories" },
  { href: "/guardian", label: "Guardian AI" },
  { href: "/ae", label: "Meet Æ" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <nav className="border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-600/40 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gold-400">
                  Citizen
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-warm-200 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://humanityandai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-warm-400 hover:text-gold-400 transition-colors"
                >
                  H&AI
                </a>
              </div>
              <details className="md:hidden relative">
                <summary className="list-none cursor-pointer text-warm-200 hover:text-teal-400 p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </summary>
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-925 border border-slate-800/60 rounded-lg shadow-xl py-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-warm-200 hover:text-teal-400 hover:bg-slate-850/50"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="https://humanityandai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-warm-400 hover:text-gold-400 hover:bg-slate-850/50"
                  >
                    humanityandai.com
                  </a>
                </div>
              </details>
            </div>
          </div>
        </nav>

        <main className="min-h-[calc(100vh-4rem-8rem)]">{children}</main>

        <footer className="border-t border-slate-800/40 bg-slate-950/80 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-gold-400 font-semibold mb-3">Citizen</h3>
                <p className="text-sm text-warm-300 leading-relaxed">
                  The civic hub of the Foundation for Humanity and AI.
                  Civic infrastructure should not require permission to access.
                </p>
              </div>
              <div>
                <h3 className="text-warm-200 font-semibold mb-3">Navigate</h3>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-warm-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-warm-200 font-semibold mb-3">Foundation</h3>
                <div className="flex flex-col gap-2">
                  <a href="https://humanityandai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-warm-400 hover:text-teal-400 transition-colors">
                    humanityandai.com
                  </a>
                  <a href="https://humanityandai.com/foundation" target="_blank" rel="noopener noreferrer" className="text-sm text-warm-400 hover:text-teal-400 transition-colors">
                    Foundation Framework
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-warm-400">
                Foundation for Humanity and AI — No ads. No data harvesting. No engagement optimization.
              </p>
              <p className="text-xs text-warm-400">
                Built with alignment, not extraction.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
