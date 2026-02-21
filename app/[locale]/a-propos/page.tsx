import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Globe, Brain, GitBranch, Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("metaTitle") };
}

const expertiseIcons = [Brain, GitBranch, Globe, Zap];

export default async function AProposPage() {
  const t = await getTranslations("about");
  type Key = Parameters<typeof t>[0];

  const expertise = [0, 1, 2, 3].map((i) => ({
    icon: expertiseIcons[i],
    title: t(`exp${i}Title` as Key),
    description: t(`exp${i}Desc` as Key),
  }));

  const stats = [0, 1, 2, 3].map((i) => ({
    value: t(`stat${i}Value` as Key),
    label: t(`stat${i}Label` as Key),
  }));

  const notItems = [0, 1, 2].map((i) => t(`notItem${i}` as Key));

  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
            {t("heroTitle")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {t("heroHighlight")}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{t("heroSubtitle")}</p>
        </div>

        {/* Story */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t("storyTitle")}</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                {t("storyP1")}{" "}
                <strong className="text-white">{t("storyP1Bold")}</strong>
                {t("storyP1End")}
              </p>
              <p>{t("storyP2")}</p>
              <p>
                {t("storyP3")}{" "}
                <strong className="text-white">{t("storyP3Bold")}</strong>
                {t("storyP3End")}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/founder-erwan.jpg"
                alt={t("imageAlt")}
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950/90 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Erwan Poiraud</div>
                    <div className="text-xs text-gray-400">{t("founderRole" as Key)}</div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/erwanpoiraud/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-emerald-500/20 hover:text-emerald-400"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                  <div className="mb-1 text-3xl font-bold text-emerald-400">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-20">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">{t("expertiseTitle")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {expertise.map((e) => (
              <div key={e.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <e.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-400">{e.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we don't do */}
        <div className="mb-20 rounded-xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-6 text-xl font-bold">{t("notTitle")}</h2>
          <ul className="space-y-3 text-gray-400">
            {notItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-red-400">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="mb-8 text-gray-400">{t("ctaSubtitle")}</p>
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
