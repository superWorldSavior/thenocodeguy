import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Mail,
  Brain,
  MessageCircle,
  Clock,
  AlertTriangle,
  Zap,
  Quote,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.veilleEmail");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://thenocodeguy.com/blog/comment-automatiser-veille-email",
    },
  };
}

export default async function VeilleEmailPage() {
  const t = await getTranslations("articles.veilleEmail");
  type Key = Parameters<typeof t>[0];

  const steps = [
    { icon: Mail, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: MessageCircle, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const beforeAfterStats = [0, 1, 2].map((i) => ({
    label: t(`stat${i}Label` as Key),
    before: t(`stat${i}Before` as Key),
    after: t(`stat${i}After` as Key),
  }));

  const painPoints = [0, 1, 2, 3].map((i) => t(`pain${i}` as Key));

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
        <header className="mb-12">
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
            <span aria-hidden="true">-</span>
            <span>{t("date")}</span>
            <span aria-hidden="true">-</span>
            <span>{t("readTime")}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Email", "IA", "BTP", "Productivite"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-12 h-px bg-border" />

        <article className="space-y-14 text-card-foreground">
          {/* Hook */}
          <section>
            <p className="text-xl font-medium leading-relaxed text-foreground">
              {t("hook")}
            </p>
            <p className="mt-4 leading-relaxed">{t("hookP2")}</p>
          </section>

          {/* Le probleme */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("problemTitle")}
            </h2>
            <p className="leading-relaxed">{t("problemIntro")}</p>
            <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
              <p className="mb-3 text-sm font-semibold text-foreground">
                {t("problemListTitle")}
              </p>
              <ul className="space-y-2">
                {painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 leading-relaxed">{t("problemConclusion")}</p>
          </section>

          {/* La solution */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("solutionTitle")}
            </h2>
            <p className="leading-relaxed">{t("solutionP1")}</p>
            <p className="mt-4 leading-relaxed">{t("solutionP2")}</p>
          </section>

          {/* Comment ca marche - 3 steps */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t("howTitle")}
            </h2>
            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-5 rounded-xl border border-border bg-card p-5"
                  >
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${step.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {t(`how${i}Label` as Key)}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-foreground">
                        {t(`how${i}Title` as Key)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed">
                        {t(`how${i}Desc` as Key)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* WhatsApp digest example */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("digestTitle")}
            </h2>
            <p className="mb-4 leading-relaxed">{t("digestIntro")}</p>
            <div className="rounded-xl border border-green-500/20 bg-green-50/5 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
                WhatsApp - 7h30
              </p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("digestUrgent1")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("digestUrgent1Detail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("digestUrgent2")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("digestUrgent2Detail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-yellow-500" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("digestAction1")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("digestAction1Detail")}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <p className="text-xs text-muted-foreground">
                  {t("digestFooter")}
                </p>
              </div>
            </div>
          </section>

          {/* Avant / Apres */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t("beforeAfterTitle")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {beforeAfterStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-5 text-center"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-red-400 line-through">
                      {stat.before}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-bold text-primary">
                      {stat.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm font-medium text-foreground">
                {t("beforeAfterHighlight")}
              </p>
            </div>
          </section>

          {/* Testimonial */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("testimonialTitle")}
            </h2>
            <div className="relative rounded-xl border border-border bg-card p-6">
              <Quote className="absolute -top-3 left-5 h-6 w-6 text-primary/30" />
              <blockquote className="mt-2 text-lg italic leading-relaxed text-foreground">
                {t("testimonialQuote")}
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t("testimonialInitials")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t("testimonialAuthor")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("testimonialRole")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <Clock className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary"
            >
              {t("ctaButton")} <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Signature */}
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
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
