import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Briefcase,
  FileText,
  Globe,
  Quote,
  CircleDot,
  Link2,
  Rocket,
  BadgeCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: `TheNoCodeGuy — ${t("heroHighlight")}`,
    description: t("heroSubtitle"),
    openGraph: {
      title: `TheNoCodeGuy — ${t("heroHighlight")}`,
      description: t("heroSubtitle"),
      url: "https://thenocodeguy.com",
    },
  };
}

const agentIcons = [Briefcase, FileText, Globe];
const howIcons = [CircleDot, Link2, Rocket];

export default async function HomePage() {
  const t = await getTranslations("home");
  type Key = Parameters<typeof t>[0];

  const agents = [0, 1, 2].map((i) => ({
    icon: agentIcons[i],
    name: t(`agent${i}Name` as Key),
    role: t(`agent${i}Role` as Key),
    desc: t(`agent${i}Desc` as Key),
    connectors: [0, 1, 2, 3].map((j) => t(`agent${i}Connector${j}` as Key)),
  }));

  const agentSlugs = ["commercial", "admin", "webmaster"];

  const howSteps = [0, 1, 2].map((i) => ({
    icon: howIcons[i],
    title: t(`how${i}Title` as Key),
    desc: t(`how${i}Desc` as Key),
  }));

  const stats = [
    { value: t("statsValue0"), label: t("statsLabel0") },
    { value: t("statsValue1"), label: t("statsLabel1") },
    { value: t("statsValue2"), label: t("statsLabel2") },
  ];

  const testimonials = [
    { quote: t("testimonial0Quote"), author: t("testimonial0Author"), role: t("testimonial0Role") },
    { quote: t("testimonial1Quote"), author: t("testimonial1Author"), role: t("testimonial1Role") },
    { quote: t("testimonial2Quote"), author: t("testimonial2Author"), role: t("testimonial2Role") },
  ];

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
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mb-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {t("heroHighlight")}
            </span>
          </p>
          <p className="mx-auto mb-10 mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-base text-gray-300 transition-colors hover:border-emerald-500/50 hover:text-white"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("agentsTitle")}</h2>
            <p className="text-gray-400">{t("agentsSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => (
              <Link
                key={agent.name}
                href={`/agents/${agentSlugs[i]}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-emerald-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <agent.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-white">{agent.name}</h3>
                <p className="mb-3 text-sm font-medium text-emerald-400">{agent.role}</p>
                <p className="mb-4 text-sm text-gray-400">{agent.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.connectors.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-400"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{t("seeAllAgents")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("howTitle")}</h2>
            <p className="text-gray-400">{t("howSubtitle")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {howSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                  <step.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="mb-2 text-sm font-bold text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("testimonialsTitle")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <Quote className="mb-4 h-6 w-6 text-emerald-500/50" />
                <p className="mb-4 text-sm text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-white/5 p-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <BadgeCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t("pricingTeaser")}</p>
                <p className="text-2xl font-bold text-white">{t("pricingTeaserPrice")}</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
            >
              {t("pricingTeaserCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <MessageSquare className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("ctaSectionTitle")}
          </h2>
          <p className="mb-8 text-gray-400">
            {t("ctaSectionSubtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaSectionButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
