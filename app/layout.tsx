import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TheNoCodeGuy — Automatisation IA sur mesure",
    template: "%s | TheNoCodeGuy",
  },
  description:
    "Agence spécialisée en workflows IA agentiques et automatisation no-code. On automatise ce que vous répétez.",
  openGraph: {
    siteName: "TheNoCodeGuy",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <Script
          src="/umami/script.js"
          data-website-id="1df87a17-4ae1-42cd-8f61-ce1e7a4650b3"
          data-api="/umami/api/send"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
