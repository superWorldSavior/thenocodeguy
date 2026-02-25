import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Mail,
  FileWarning,
  ShieldCheck,
  Calculator,
  Search,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.windmillVsN8n");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://thenocodeguy.com/blog/windmill-vs-n8n",
    },
  };
}

const TASK_ICONS = [Mail, FileWarning, ShieldCheck, Calculator, Search] as const;

export default async function WindmillVsN8nPage() {
  const t = await getTranslations("articles.windmillVsN8n");
  type Key = Parameters<typeof t>[0];

  const tasks = [0, 1, 2, 3, 4].map((i) => ({
    icon: TASK_ICONS[i],
    title: t(`task${i}Title` as Key),
    before: t(`task${i}Before` as Key),
    after: t(`task${i}After` as Key),
  }));

  const roiItems = [0, 1, 2].map((i) => ({
    icon: [Clock, TrendingUp, Zap][i],
    stat: t(`roiStat${i}` as Key),
    label: t(`roiLabel${i}` as Key),
  }));

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {t("breadcrumb")}
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-widest">
              {t("blogBadge")}
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                TN
              </div>
              <span>
                <span className="text-card-foreground">TheNoCodeGuy</span>
              </span>
            </div>
            <span>·</span>
            <span>{t("date")}</span>
            <span>·</span>
            <span>{t("readTime")}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {(["Productivite", "IA", "Automatisation", "PME"] as const).map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {t(`tag${tag}` as Key)}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mb-12 h-px bg-border" />

        {/* Article body */}
        <article className="space-y-12 text-card-foreground">
          {/* Hook */}
          <section>
            <p className="text-xl font-medium leading-relaxed text-foreground">
              {t("hook")}
            </p>
            <p className="mt-4 leading-relaxed">{t("hookP2")}</p>
          </section>

          {/* 5 Tasks */}
          <section>
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              {t("tasksTitle")}
            </h2>

            <div className="space-y-6">
              {tasks.map((task, i) => {
                const Icon = task.icon;
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    {/* Task header */}
                    <div className="flex items-center gap-4 border-b border-border bg-muted/50 px-6 py-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {task.title}
                      </h3>
                    </div>

                    {/* Before / After */}
                    <div className="grid gap-0 sm:grid-cols-2">
                      {/* Before */}
                      <div className="border-b border-border px-6 py-5 sm:border-b-0 sm:border-r">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                          <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                          {t("beforeLabel")}
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {task.before}
                        </p>
                      </div>

                      {/* After */}
                      <div className="px-6 py-5">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          {t("afterLabel")}
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {task.after}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ROI Section */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("roiTitle")}
            </h2>
            <p className="mb-8 leading-relaxed">{t("roiIntro")}</p>

            <div className="grid gap-4 sm:grid-cols-3">
              {roiItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
                  >
                    <Icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold text-foreground">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 leading-relaxed">{t("roiP1")}</p>
            <p className="mt-4 leading-relaxed">{t("roiP2")}</p>
          </section>

          {/* CTA Section */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-10">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              {t("ctaBody")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30"
            >
              {t("ctaButton")} <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Signature */}
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              TN
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {t("signatureName")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("signatureRole")}
              </p>
            </div>
          </div>
        </article>

        {/* Bottom nav */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-12 sm:flex-row sm:justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> {t("bottomNavBack")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary"
          >
            {t("bottomNavNext")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
