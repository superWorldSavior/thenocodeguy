import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GitBranch,
  ExternalLink,
  Zap,
  Bell,
  BarChart3,
  Search,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Workflows — TheNoCodeGuy",
  description:
    "Les workflows d'automatisation réels qu'on utilise en production. Open-source, documentés, prêts à déployer sur Windmill.",
  openGraph: {
    title: "Workflows | TheNoCodeGuy",
    description:
      "Des workflows Windmill open-source pour automatiser votre veille, votre monitoring et votre analytics. Prêts à déployer.",
    url: "https://thenocodeguy.com/workflows",
  },
};

const workflows = [
  {
    id: "veille-boamp",
    icon: Search,
    title: "Veille BOAMP automatique",
    tagline: "Ne ratez plus un appel d'offres public",
    description:
      "Scrape le Bulletin Officiel des Annonces des Marchés Publics chaque matin. Filtre par mots-clés, qualifie les opportunités avec GPT-4o, et envoie un digest email. Zéro surveillance manuelle.",
    stack: ["Windmill", "Python", "GPT-4o", "SMTP"],
    useCase: "Agences & prestataires publics",
    status: "open-source",
    stats: { runs: "7j/7", time: "< 2 min", saved: "2h/semaine" },
    githubUrl: "https://github.com/thenocodeguy/workflow-veille-boamp",
    color: "emerald",
  },
  {
    id: "monitoring-serveur",
    icon: Bell,
    title: "Monitoring serveur proactif",
    tagline: "Alertes intelligentes avant que ça tombe",
    description:
      "Surveille CPU, RAM, disque et services critiques sur vos VPS. Analyse les tendances avec un modèle IA pour prédire les incidents avant qu'ils arrivent. Alertes WhatsApp/email avec contexte.",
    stack: ["Windmill", "Bash", "Claude 3.5", "WhatsApp API"],
    useCase: "DevOps & infogérance",
    status: "open-source",
    stats: { runs: "Toutes les 5 min", time: "< 30s", saved: "1h/jour" },
    githubUrl: "https://github.com/thenocodeguy/workflow-monitoring-serveur",
    color: "blue",
  },
  {
    id: "analytics-digest",
    icon: BarChart3,
    title: "Analytics digest Umami",
    tagline: "Vos stats web directement dans WhatsApp",
    description:
      "Récupère les métriques clés Umami (pages vues, visiteurs uniques, sources) et génère un résumé hebdomadaire lisible. Livré le lundi matin dans WhatsApp avec les tendances vs semaine précédente.",
    stack: ["Windmill", "TypeScript", "Umami API", "WhatsApp"],
    useCase: "Fondateurs & marketeurs",
    status: "open-source",
    stats: { runs: "1x/semaine", time: "< 1 min", saved: "30 min/semaine" },
    githubUrl: "https://github.com/thenocodeguy/workflow-analytics-digest",
    color: "violet",
  },
  {
    id: "veille-email",
    icon: Mail,
    title: "Veille email intelligente",
    tagline: "GPT lit vos newsletters à votre place",
    description:
      "Trie et résume vos newsletters automatiquement. Classe par pertinence, extrait les infos actionnables, et génère un digest quotidien. Compatible avec Gmail, Outlook et tout IMAP.",
    stack: ["Windmill", "Python", "GPT-4o mini", "Graph API"],
    useCase: "Veille concurrentielle & sectorielle",
    status: "bientôt",
    stats: { runs: "1x/jour", time: "< 5 min", saved: "1h/jour" },
    githubUrl: null,
    color: "orange",
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string; stat: string }> = {
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/40",
    stat: "text-emerald-400",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "bg-blue-500/10 text-blue-400",
    border: "hover:border-blue-500/40",
    stat: "text-blue-400",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    icon: "bg-violet-500/10 text-violet-400",
    border: "hover:border-violet-500/40",
    stat: "text-violet-400",
  },
  orange: {
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: "bg-orange-500/10 text-orange-400",
    border: "hover:border-orange-500/40",
    stat: "text-orange-400",
  },
};

export default function WorkflowsPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <GitBranch className="h-3.5 w-3.5" />
            Workflows open-source
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ce qu&apos;on automatise{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              en vrai
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Pas des démos. Des workflows réels qui tournent en production sur{" "}
            <span className="font-medium text-white">Windmill</span>, open-sourcés et documentés.
            Forkez, adaptez, déployez.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open-source sur GitHub
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Windmill-native
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              README + documentation inclus
            </span>
          </div>
        </div>

        {/* Workflow cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {workflows.map((wf) => {
            const colors = colorMap[wf.color];
            return (
              <div
                key={wf.id}
                className={`group relative flex flex-col rounded-2xl border border-white/10 bg-gray-900/50 p-6 transition-all ${colors.border} hover:bg-gray-900 sm:p-8`}
              >
                {/* Status badge */}
                <div className="mb-5 flex items-start justify-between">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}>
                    <wf.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${colors.badge}`}
                  >
                    {wf.status === "open-source" ? "Open-source" : "Bientôt"}
                  </span>
                </div>

                {/* Title & description */}
                <h2 className="mb-1 text-xl font-bold text-white">{wf.title}</h2>
                <p className="mb-3 text-sm font-medium text-gray-400">{wf.tagline}</p>
                <p className="mb-5 text-sm leading-relaxed text-gray-400">{wf.description}</p>

                {/* Stats */}
                <div className="mb-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Fréquence", value: wf.stats.runs },
                    { label: "Durée", value: wf.stats.time },
                    { label: "Gain", value: wf.stats.saved },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/5 bg-white/5 p-3 text-center"
                    >
                      <div className={`text-xs font-semibold ${colors.stat}`}>{stat.value}</div>
                      <div className="mt-0.5 text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {wf.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Use case + CTA */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Pour : <span className="text-gray-400">{wf.useCase}</span>
                  </span>
                  {wf.githubUrl ? (
                    <a
                      href={wf.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      Voir sur GitHub
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-600 italic">En cours de packaging…</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white">Windmill — pourquoi ce choix ?</h2>
            <p className="mt-3 text-gray-400">
              Pas n8n, pas Make. Windmill est le seul outil qui colle avec notre façon de travailler.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Vrai code, vrais scripts",
                desc: "TypeScript, Python, Bash natifs. Pas de limitations de nœuds fantaisistes. Si ça s'exécute en local, ça tourne sur Windmill.",
              },
              {
                title: "Auto-hébergé & RGPD",
                desc: "Vos données restent sur votre serveur. On livre le workflow ET l'infrastructure. Zero vendor lock-in.",
              },
              {
                title: "Git-native",
                desc: "Chaque workflow est du code versionnable. Fork, PR, rollback — le workflow engineering comme du vrai dev.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <Zap className="mb-3 h-5 w-5 text-emerald-400" />
                <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/lab/windmill-vs-n8n"
              className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Lire : Pourquoi j&apos;utilise Windmill et pas n8n
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
            <GitBranch className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
            <h2 className="mb-4 text-3xl font-bold text-white">
              Besoin d&apos;un workflow sur mesure ?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-400">
              Ces workflows couvrent nos cas d&apos;usage. Le vôtre est différent ?
              On le construit, on le documente, on le déploie sur votre infra.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
              >
                Décrire mon besoin
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm text-gray-300 transition-colors hover:border-emerald-500/50 hover:text-white"
              >
                Audit gratuit →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
