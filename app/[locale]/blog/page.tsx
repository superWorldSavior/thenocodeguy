import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("metaTitle") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");

  const articles = [
    {
      slug: "comment-automatiser-veille-email",
      title: t("article0Title"),
      excerpt: t("article0Excerpt"),
      date: t("article0Date"),
      readTime: t("article0ReadTime"),
      tags: ["Email", "IA", "BTP", "Productivite"],
    },
    {
      slug: "windmill-vs-n8n",
      title: t("article1Title"),
      excerpt: t("article1Excerpt"),
      date: t("article1Date"),
      readTime: t("article1ReadTime"),
      tags: ["Productivite", "IA", "Automatisation", "PME"],
    },
  ];

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{t("badge")}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">{t("pageTitle")}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{t("pageSubtitle")}</p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-card sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime} {t("minRead")}</span>
                <span>·</span>
                <span className="text-primary">{t("author")}</span>
              </div>

              <h2 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                {article.title}
              </h2>

              <p className="mb-5 text-muted-foreground">{article.excerpt}</p>

              <div className="flex flex-wrap items-center gap-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-1 text-sm font-medium text-primary">
                  {t("readArticle")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <p className="mb-2 text-lg font-semibold text-foreground">{t("ctaTitle")}</p>
          <p className="mb-6 text-muted-foreground">{t("ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30"
          >
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
