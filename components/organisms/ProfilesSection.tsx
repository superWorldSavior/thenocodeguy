import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Globe } from "lucide-react";

const AGENT_SLUGS = ["commercial", "admin", "webmaster"] as const;
const AGENT_ICONS = [Briefcase, FileText, Globe] as const;
const AGENT_INDICES = [0, 1, 2] as const;
const CONNECTOR_INDICES = [0, 1, 2, 3] as const;

type ProfileKey =
  | "title"
  | "subtitle"
  | "viewProfile"
  | `agent${0 | 1 | 2}Name`
  | `agent${0 | 1 | 2}Role`
  | `agent${0 | 1 | 2}Desc`
  | `agent${0 | 1 | 2}Connector${0 | 1 | 2 | 3}`;

export default async function ProfilesSection() {
  const t = await getTranslations("profiles");

  const agents = AGENT_INDICES.map((i) => ({
    Icon: AGENT_ICONS[i],
    name: t(`agent${i}Name` as ProfileKey),
    role: t(`agent${i}Role` as ProfileKey),
    desc: t(`agent${i}Desc` as ProfileKey),
    connectors: CONNECTOR_INDICES.map((j) =>
      t(`agent${i}Connector${j}` as ProfileKey)
    ),
    slug: AGENT_SLUGS[i],
  }));

  return (
    <section id="profiles" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Link
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-muted"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <agent.Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">
                {agent.name}
              </h3>
              <p className="mb-3 text-sm font-medium text-primary">
                {agent.role}
              </p>
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
                <span>{t("viewProfile")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
