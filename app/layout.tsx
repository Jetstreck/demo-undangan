import type { Metadata } from "next";
import { Cinzel, Lato, Pinyon_Script, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// ── High-contrast editorial serif for names & headings ──
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// ── Clean humanist sans for body copy ──────────────────
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

// ── Flowing script for decorative accents ──────────────
const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

// ── Noto Serif SC for Mandarin characters (百年好合 etc) ─
const notoSerifSC = Noto_Serif_SC({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Royal Wedding of Alexander & Clarissa",
  description:
    "A celebration of love, heritage, and eternal union. Chinese Indonesian Royal Heritage × Javanese Keraton Elegance.",
  openGraph: {
    title: "The Royal Wedding of Alexander & Clarissa",
    description: "A sacred ceremony of love and heritage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0D0B09" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "antialiased min-h-screen bg-obsidian",
          cinzel.variable,
          lato.variable,
          pinyon.variable,
          notoSerifSC.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
