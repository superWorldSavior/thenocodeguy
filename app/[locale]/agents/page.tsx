import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Globe,
  MessageSquare,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agents");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
    },
  };
}

const agentIcons = [Briefcase, FileText, Globe];
const agentSlugs = ["commercial", "admin", "webmaster"];
const agentKeys = ["commercial", "admin", "webmaster"] as const;

export default async function AgentsPage() {
  const t = await getTranslations("agents");

  const agents = agentKeys.map((key, i) => ({
    icon: agentIcons[i],
    slug: agentSlugs[i],
    name: t(`${key}.name` as any),
    role: t(`${key}.role` as any),
    desc: t(`${key}.desc` as any),
    heroSubtitle: t(`${key}.heroSubtitle` as any),
    workflows: [0, 1, 2, 3, 4].map((j) => t(`${key}.workflow${j}` as any)),
    connectors: [0, 1, 2, 3, 4, 5].map((j) => t(`${key}.connector${j}` as any)),
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
            {t("pageTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Agent cards */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          {agents.map((agent) => (
            <div
              key={agent.slug}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-emerald-500/20"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                    <agent.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h2 className="mb-1 text-2xl font-bold text-white">{agent.name}</h2>
                  <p className="mb-4 text-sm font-medium text-emerald-400">{agent.role}</p>
                  <p className="mb-6 text-gray-400">{agent.heroSubtitle}</p>

                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                    {t("whatsappLabel")}
                  </div>

                  <Link
                    href={`/agents/${agent.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
                  >
                    {t("ctaHire")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                      {t("workflowsIncluded")}
                    </h3>
                    <ul className="space-y-2">
                      {agent.workflows.map((wf) => (
                        <li key={wf} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          {wf}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                      {t("connectorsLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.connectors.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("ctaTitle")}</h2>
          <p className="mb-8 text-gray-400">{t("ctaSubtitle")}</p>
          <Link
            href="/pricing"
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
