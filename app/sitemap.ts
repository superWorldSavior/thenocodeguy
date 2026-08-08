import type { MetadataRoute } from "next";

const BASE = "https://thenocodeguy.com";
const LOCALES = ["fr", "en", "zh-TW", "zh-CN"];

const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
  { path: "/confidentialite", priority: 0.3, changeFrequency: "yearly" },
];

function localizedUrl(locale: string, path: string) {
  const localePrefix = `${BASE}/${locale}`;
  return path === "/" ? localePrefix : `${localePrefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = localizedUrl(locale, page.path);
    }
    return {
      url: localizedUrl("fr", page.path),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    };
  });
}
