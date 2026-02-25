import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, X, Check } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("domainesWeb");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

const sections = [
  { key: "section1", count: 3 },
  { key: "section2", count: 3 },
  { key: "section3", count: 3 },
  { key: "section4", count: 3 },
  { key: "section5", count: 3 },
] as const;

type SectionKey = (typeof sections)[number]["key"];

export default async function WebPage() {
  const t = await getTranslations("domainesWeb");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="hero-mesh-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                <Globe className="h-3 w-3" />
                {t("badge")}
              </span>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                {t("title")}
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30"
              >
                {t("ctaTop")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative animate-fade-in-up [animation-delay:200ms]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/10">
                <Image
                  src="/images/homepage/domaine-web.webp"
                  alt={t("title")}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avant / Après sections */}
      {sections.map((section, sectionIndex) => (
        <section
          key={section.key}
          className={`px-4 py-16 sm:px-6 ${sectionIndex % 2 === 0 ? "bg-muted/30" : "bg-background"}`}
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
              {t(`${section.key}Title` as `${SectionKey}Title`)}
            </h2>
            <div className="grid gap-4">
              {Array.from({ length: section.count }).map((_, i) => {
                const idx = i + 1;
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 sm:gap-6"
                  >
                    {/* Avant */}
                    <div className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <div>
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-red-400">
                          {t("beforeLabel")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t(`${section.key}Before${idx}` as `${SectionKey}Before1`)}
                        </span>
                      </div>
                    </div>
                    {/* Après */}
                    <div className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <div>
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-emerald-500">
                          {t("afterLabel")}
                        </span>
                        <span className="text-sm text-card-foreground">
                          {t(`${section.key}After${idx}` as `${SectionKey}After1`)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Client reference + stats */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
            <h3 className="mb-4 text-2xl font-bold">{t("referenceTitle")}</h3>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {t("referenceDesc")}
            </p>
            <div className="mb-8 flex gap-8">
              <div>
                <div className="text-3xl font-extrabold text-primary">
                  {t("referenceStat1Value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("referenceStat1Label")}
                </div>
              </div>
              <div className="h-auto w-px bg-border" />
              <div>
                <div className="text-3xl font-extrabold text-primary">
                  {t("referenceStat2Value")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("referenceStat2Label")}
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{t("ctaSubtext")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
