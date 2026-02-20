import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("lab");
  return { title: t("metaTitle") };
}

export default async function LabPage() {
  const t = await getTranslations("lab");

  const articles = [
    {
      slug: "comment-automatiser-veille-email",
      title: t("article0Title"),
      excerpt: t("article0Excerpt"),
      date: t("article0Date"),
      readTime: t("article0ReadTime"),
      tags: ["Email", "GPT-4o", "Windmill", "Graph API"],
    },
    {
      slug: "windmill-vs-n8n",
      title: t("article1Title"),
      excerpt: t("article1Excerpt"),
      date: t("article1Date"),
      readTime: t("article1ReadTime"),
      tags: ["Windmill", "n8n", "Automatisation", "Agents IA"],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <FlaskConical className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{t("badge")}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{t("pageTitle")}</h1>
          <p className="max-w-2xl text-lg text-gray-400">{t("pageSubtitle")}</p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/lab/${article.slug}`}
              className="group block rounded-2xl border border-white/10 bg-gray-900/50 p-6 transition-all hover:border-emerald-500/40 hover:bg-gray-900 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime} {t("minRead")}</span>
                <span>·</span>
                <span className="text-emerald-400">{t("author")}</span>
              </div>

              <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-emerald-400 sm:text-2xl">
                {article.title}
              </h2>

              <p className="mb-5 text-gray-400">{article.excerpt}</p>

              <div className="flex flex-wrap items-center gap-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                    {tag}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-1 text-sm font-medium text-emerald-400">
                  {t("readArticle")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <p className="mb-2 text-lg font-semibold text-white">{t("ctaTitle")}</p>
          <p className="mb-6 text-gray-400">{t("ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
