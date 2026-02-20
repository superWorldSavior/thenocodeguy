import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Globe,
  CheckCircle2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const AGENTS: Record<string, {
  icon: typeof Briefcase;
  workflowCount: number;
  connectorCount: number;
  chatExchanges: number;
}> = {
  commercial: {
    icon: Briefcase,
    workflowCount: 5,
    connectorCount: 6,
    chatExchanges: 2,
  },
  admin: {
    icon: FileText,
    workflowCount: 5,
    connectorCount: 6,
    chatExchanges: 2,
  },
  webmaster: {
    icon: Globe,
    workflowCount: 5,
    connectorCount: 6,
    chatExchanges: 2,
  },
};

const VALID_SLUGS = Object.keys(AGENTS);

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return {};
  const t = await getTranslations("agents");
  const name = t.has(`${slug}.name`) ? t(`${slug}.name`) : slug;
  const desc = t.has(`${slug}.heroSubtitle`) ? t(`${slug}.heroSubtitle`) : "";
  return {
    title: `${name} — The No Code Guys`,
    description: desc,
    openGraph: { title: `${name} — The No Code Guys`, description: desc },
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();

  const agent = AGENTS[slug];
  const t = await getTranslations("agents");
  const Icon = agent.icon;

  // Safe translation helper
  const tr = (key: string, fallback = "") => {
    try {
      return t.has(key) ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const name = tr(`${slug}.name`, slug);
  const role = tr(`${slug}.role`, "");
  const heroSubtitle = tr(`${slug}.heroSubtitle`, "");

  const workflows = Array.from({ length: agent.workflowCount }, (_, i) =>
    tr(`${slug}.workflow${i}`, `Workflow ${i + 1}`)
  );
  const connectors = Array.from({ length: agent.connectorCount }, (_, i) =>
    tr(`${slug}.connector${i}`, `Connector ${i + 1}`)
  );
  const chatExchanges = Array.from({ length: agent.chatExchanges }, (_, i) => ({
    user: tr(`${slug}.whatsappExample${i}User`, "..."),
    bot: tr(`${slug}.whatsappExample${i}Bot`, "..."),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-gray-950 to-gray-950" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Icon className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          <p className="mb-6 text-lg font-medium text-emerald-400">{role}</p>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Left: workflows + connectors */}
            <div className="space-y-10">
              <div>
                <h2 className="mb-4 text-xl font-bold text-white">
                  {tr("workflowsIncluded", "Workflows inclus")}
                </h2>
                <ul className="space-y-3">
                  {workflows.map((wf, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span>{wf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold text-white">
                  {tr("connectorsLabel", "Connecteurs compatibles")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {connectors.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                {tr("whatsappLabel", "WhatsApp")}
              </div>
            </div>

            {/* Right: WhatsApp mockup */}
            <div>
              <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
                <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{name}</div>
                    <div className="text-xs text-emerald-400">{tr("whatsappLabel", "WhatsApp")}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {chatExchanges.map((exchange, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-xl rounded-tr-sm bg-emerald-500/20 px-4 py-2.5">
                          <p className="text-sm text-white">{exchange.user}</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white/10 px-4 py-2.5">
                          <p className="text-sm text-gray-300">{exchange.bot}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <Zap className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {tr("ctaHire", "Engager cet agent")}
          </h2>
          <p className="mb-8 text-gray-400">{tr("ctaSubtitle", "")}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              {tr("ctaHire", "Engager cet agent")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-base text-gray-300 transition-colors hover:border-emerald-500/50 hover:text-white"
            >
              {tr("ctaButton", "Voir les tarifs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
