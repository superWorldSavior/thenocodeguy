import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertTriangle,
  Building2,
  Check,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import CalPopupButton from "@/components/molecules/CalPopupButton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("articles.factureBtp");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://thenocodeguy.com/blog/facturation-electronique-btp-2026",
    },
  };
}

export default async function FactureBtpArticlePage() {
  const t = await getTranslations("articles.factureBtp");
  type Key = Parameters<typeof t>[0];

  const btpSpecs = [
    { titleKey: "btp0Title", descKey: "btp0Desc" },
    { titleKey: "btp1Title", descKey: "btp1Desc" },
    { titleKey: "btp2Title", descKey: "btp2Desc" },
    { titleKey: "btp3Title", descKey: "btp3Desc" },
  ];

  const douleurs = [0, 1, 2, 3, 4, 5].map((i) => t(`douleur${i}` as Key));

  const solutions = [0, 1, 2, 3].map((i) => t(`solution${i}` as Key));

  const tags = ["Facturation", "BTP", "IA", "2026", "Conformite"];

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
            {tags.map((tag) => (
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

          {/* Calendrier */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("calTitle")}
            </h2>
            <p className="leading-relaxed">{t("calP1")}</p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {t("calDate1")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("calDesc1")}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {t("calDate2")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("calDesc2")}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 leading-relaxed">{t("calP2")}</p>
          </section>

          {/* Plateformes Agreees */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("paTitle")}
            </h2>
            <p className="leading-relaxed">{t("paP1")}</p>
            <p className="mt-4 leading-relaxed">{t("paP2")}</p>
            <p className="mt-4 leading-relaxed">{t("paP3")}</p>
          </section>

          {/* Specificites BTP */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("btpTitle")}
            </h2>
            <p className="leading-relaxed">{t("btpP1")}</p>
            <div className="mt-6 space-y-4">
              {btpSpecs.map((spec) => (
                <div
                  key={spec.titleKey}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t(spec.titleKey as Key)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t(spec.descKey as Key)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Douleurs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("douleursTitle")}
            </h2>
            <div className="rounded-xl border border-border bg-muted/50 p-5">
              <ul className="space-y-3">
                {douleurs.map((douleur, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                    <span>{douleur}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Solution */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("solutionTitle")}
            </h2>
            <p className="leading-relaxed">{t("solutionP1")}</p>
            <p className="mt-4 leading-relaxed">{t("solutionP2")}</p>
            <div className="mt-6 space-y-3">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{solution}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <CalPopupButton className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary">
              {t("ctaButton")} <ArrowRight className="h-4 w-4" />
            </CalPopupButton>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("ctaSubtext")}
            </p>
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
          <CalPopupButton className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary">
            {t("bottomNavNext")} <ArrowRight className="h-4 w-4" />
          </CalPopupButton>
        </div>
      </div>
    </main>
  );
}
