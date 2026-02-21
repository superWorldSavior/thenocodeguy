import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Briefcase,
  FileText,
  Globe,
  CircleDot,
  Link2,
  Rocket,
  BadgeCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/organisms/HeroSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection";

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

  // Testimonials now handled by TestimonialsSection component

  return (
    <>
      <HeroSection />

      <HowItWorksSection />

      {/* Agents */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("agentsTitle")}</h2>
            <p className="text-muted-foreground">{t("agentsSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => (
              <Link
                key={agent.name}
                href={`/agents/${agentSlugs[i]}`}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-muted"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <agent.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-foreground">{agent.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary">{agent.role}</p>
                <p className="mb-4 text-sm text-muted-foreground">{agent.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.connectors.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{t("seeAllAgents")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("howTitle")}</h2>
            <p className="text-muted-foreground">{t("howSubtitle")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {howSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
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
              <div key={stat.label} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing teaser */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-card p-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("pricingTeaser")}</p>
                <p className="text-2xl font-bold text-foreground">{t("pricingTeaserPrice")}</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              {t("pricingTeaserCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
          <MessageSquare className="mx-auto mb-6 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("ctaSectionTitle")}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {t("ctaSectionSubtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("ctaSectionButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
