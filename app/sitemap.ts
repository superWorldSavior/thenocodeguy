import type { MetadataRoute } from "next";

const BASE = "https://thenocodeguy.com";
const LOCALES = ["fr", "en", "zh-TW", "zh-CN"];

const PAGES = [
  "/",
  "/agents",
  "/agents/commercial",
  "/agents/admin",
  "/agents/webmaster",
  "/pricing",
  "/contact",
  "/services",
  "/audit",
  "/a-propos",
  "/legal",
  "/privacy",
  "/lab",
  "/workflows",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      const prefix = locale === "fr" ? "" : `/${locale}`;
      languages[locale] = `${BASE}${prefix}${page === "/" ? "" : page}`;
    }

    entries.push({
      url: `${BASE}${page === "/" ? "" : page}`,
      lastModified: new Date(),
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1.0 : page === "/pricing" ? 0.9 : 0.7,
      alternates: { languages },
    });
  }

  return entries;
}
