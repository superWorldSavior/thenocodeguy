import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Zap,
  MessageSquare,
  ChevronDown,
  Infinity,
  ShieldCheck,
  Lock,
  Server,
  ShieldAlert,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pricing");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
    },
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  type Key = Parameters<typeof t>[0];

  const features = [0, 1, 2, 3, 4, 5].map((i) =>
    t(`starterFeature${i}` as Key)
  );

  const fairUseItems = [0, 1, 2, 3].map((i) =>
    t(`fairUseItem${i}` as Key)
  );

  const faqs = [0, 1, 2, 3].map((i) => ({
    q: t(`faq${i}Q` as Key),
    a: t(`faq${i}A` as Key),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-gray-950 to-gray-950" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            {t("badge")}
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("pageTitle")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {t("pageHighlight")}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/5 p-8">
            <h3 className="mb-2 text-xl font-bold text-white">
              {t("starterName")}
            </h3>
            <p className="mb-6 text-sm text-gray-400">{t("starterDesc")}</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">
                {t("starterPrice")}
              </span>
              <span className="ml-2 text-lg text-gray-400">
                {t("starterPriceSuffix")}
              </span>
            </div>

            <ul className="mb-8 space-y-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="block w-full rounded-lg bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              {t("starterCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Fair use */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <Infinity className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              {t("fairUseTitle")}
            </h2>
            <p className="text-gray-400">{t("fairUseDesc")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fairUseItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security / RGPD */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <ShieldAlert className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              {t("securityTitle" as Key)}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              {t("securityDesc" as Key)}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Lock, titleKey: "securityItem0Title", descKey: "securityItem0Desc" },
              { icon: ShieldCheck, titleKey: "securityItem1Title", descKey: "securityItem1Desc" },
              { icon: Server, titleKey: "securityItem2Title", descKey: "securityItem2Desc" },
            ].map(({ icon: ItemIcon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <ItemIcon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {t(titleKey as Key)}
                </h3>
                <p className="text-sm text-gray-400">{t(descKey as Key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
            {t("faqTitle")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/10 bg-white/5"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-white">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <MessageSquare className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mb-8 text-gray-400">{t("ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
