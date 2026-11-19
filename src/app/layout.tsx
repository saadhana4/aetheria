import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AETHERIA — Artisanal Skincare & Beauty Salon · Paris, 1978",
  description:
    "Cold-pressed. Bio-fermented. Centuries of botanical wisdom. AETHERIA is a luxury apothecary salon founded in Paris, offering bespoke skincare rituals crafted from 47 active botanical compounds.",
  keywords: [
    "luxury skincare",
    "artisanal beauty",
    "bio-fermented skincare",
    "cold-pressed botanicals",
    "Paris beauty salon",
    "AETHERIA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="preload" href="/frames/frame_0001.jpg" as="image" />
      </head>
      <body className="bg-bg text-ink font-sans antialiased">
        {/* SVG Film Grain Overlay */}
        <svg className="film-grain" aria-hidden="true">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {children}
      </body>
    </html>
  );
}
