import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/routing";
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
  metadataBase: new URL("https://thenocodeguy.com"),
  openGraph: {
    siteName: "TheNoCodeGuy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const localeToHtmlLang: Record<string, string> = {
  fr: "fr",
  en: "en",
  "zh-TW": "zh-TW",
  "zh-CN": "zh-CN",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={localeToHtmlLang[locale] ?? locale}>
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
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
