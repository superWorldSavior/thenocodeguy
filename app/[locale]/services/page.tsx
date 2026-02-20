import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, GitBranch, Zap, RefreshCw, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");
  return {
    title: t("metaTitle"),
    description: "Audit automatisation, workflows n8n/Make sur mesure, lead gen agentique, maintenance mensuelle.",
  };
}

const icons = [BarChart3, GitBranch, Zap, RefreshCw];

export default async function ServicesPage() {
  const t = await getTranslations("services");
  type Key = Parameters<typeof t>[0];

  const services = [0, 1, 2, 3].map((i) => ({
    icon: icons[i],
    title: t(`service${i}Title` as Key),
    tagline: t(`service${i}Tagline` as Key),
    description: t(`service${i}Desc` as Key),
    deliverables: [0, 1, 2, 3].map((d) => t(`service${i}D${d}` as Key)),
    price: t(`service${i}Price` as Key),
    cta: t(`service${i}Cta` as Key),
  }));

  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{t("pageTitle")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{t("pageSubtitle")}</p>
        </div>

        {/* Banner */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/services.png"
            alt={t("imageAlt")}
            width={1200}
            height={500}
            className="w-full object-cover opacity-80"
            style={{ maxHeight: "320px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-transparent to-gray-950/70" />
        </div>

        {/* Services */}
        <div className="space-y-8">
          {services.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                {/* Left */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <s.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mb-1 text-2xl font-bold">{s.title}</h2>
                  <p className="mb-4 text-sm font-medium text-emerald-400">{s.tagline}</p>
                  <p className="text-gray-400">{s.description}</p>
                </div>

                {/* Right */}
                <div className="w-full lg:w-80">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                      {t("deliverablesLabel")}
                    </h3>
                    <ul className="mb-6 space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mb-4 text-lg font-bold text-white">{s.price}</div>
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
                    >
                      {s.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="mb-6 text-gray-400">{t("ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
