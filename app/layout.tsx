import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import ScrollProgress from "@/components/ambient/ScrollProgress";
import { siteConfig } from "@/config/siteConfig";

const archivo = localFont({
  src: [
    { path: "../fonts/archivo-300.woff2", weight: "300" },
    { path: "../fonts/archivo-400.woff2", weight: "400" },
    { path: "../fonts/archivo-500.woff2", weight: "500" },
    { path: "../fonts/archivo-600.woff2", weight: "600" },
    { path: "../fonts/archivo-700.woff2", weight: "700" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-400.woff2", weight: "400" },
    { path: "../fonts/jetbrains-mono-500.woff2", weight: "500" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.clubName} – ${siteConfig.university}`,
  description:
    "Exploring the cosmos from the heart of Jadavpur University. A community of astronomers, astrophotographers, and space enthusiasts.",
  keywords: ["astronomy", "astrophotography", "Jadavpur University", "space", "stargazing"],
  icons: {
    icon: [
      { url: siteConfig.assets.favicon, type: "image/png" },
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: siteConfig.assets.favicon,
    apple: [{ url: siteConfig.assets.favicon }],
  },
  openGraph: {
    title: `${siteConfig.clubName} – ${siteConfig.university}`,
    description:
      "A student-run astronomy society — astrophotography, observation nights, orbital mechanics and everything in between.",
    images: [
      {
        url: siteConfig.assets.logo,
        width: 512,
        height: 512,
        alt: `${siteConfig.clubName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.clubName} – ${siteConfig.university}`,
    description:
      "A student-run astronomy society — astrophotography, observation nights, orbital mechanics and everything in between.",
    images: [siteConfig.assets.logo],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Warm up the asset host so the logo / hero video start instantly. */}
        <link
          rel="preconnect"
          href="https://rwjfnuszkhoznfrjzqfr.supabase.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://rwjfnuszkhoznfrjzqfr.supabase.co" />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
