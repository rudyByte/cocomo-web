import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://cocomo.com"),
  title: {
    template: "%s — Cocomo",
    default: "Cocomo — Growth Operating System for Merchants",
  },
  description:
    "Know what to grow. Then watch it get done. Cocomo is the Growth Operating System that continuously finds the opportunity, recommends the action, and executes it. Free to start — we earn only when you grow.",
  keywords: ["growth operating system", "merchant growth", "restaurant analytics", "revenue growth", "influencer marketing"],
  authors: [{ name: "Cocomo" }],
  creator: "Cocomo",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cocomo.com",
    siteName: "Cocomo",
    title: "Cocomo — Growth Operating System",
    description: "Know what to grow. Then watch it get done.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cocomo Growth OS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocomo — Growth Operating System",
    description: "Know what to grow. Then watch it get done.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── Theme Script (inline, prevents FOUC) ────────────────────────────────────
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('cocomo-theme');
    var theme = stored || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`.trim();

// ── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cocomo",
              url: "https://cocomo.com",
              description: "Growth Operating System for ambitious merchants",
              foundingDate: "2023",
            }),
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
