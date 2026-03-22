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
  title: "Citizen — Your Seat at the Table",
  description:
    "Civic hub of the Foundation for Humanity and AI. Track Foundation progress, contribute, and engage with Guardian AI.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/foundation", label: "Foundation Status" },
  { href: "/guardian", label: "Guardian AI" },
  { href: "/ae", label: "Talk to Æ" },
  { href: "/contributions", label: "Contributions" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <nav className="border-b border-warm-800 bg-warm-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-guardian-amber">
                  Citizen
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-warm-200 hover:text-guardian-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="md:hidden">
                <span className="text-sm text-warm-200">Menu</span>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
