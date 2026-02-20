import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, GitBranch, Zap, RefreshCw, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Automatisation IA sur mesure",
  description:
    "Audit automatisation, workflows n8n/Make sur mesure, lead gen agentique, maintenance mensuelle. Tarifs sur devis.",
  openGraph: {
    title: "Services | TheNoCodeGuy",
    description: "Audit automatisation, workflows sur mesure, lead gen agentique.",
  },
};

const services = [
  {
    icon: BarChart3,
    title: "Audit automatisation",
    tagline: "Comprendre avant d'agir",
    description:
      "On passe 2-4h à analyser vos processus métier en détail : quelles tâches sont répétitives, lesquelles coûtent le plus cher, et où l'automatisation apporte un ROI immédiat.",
    deliverables: [
      "Cartographie de vos process actuels",
      "Identification des quick wins (ROI < 1 mois)",
      "Plan d'automatisation priorisé",
      "Recommandations d'outils adaptés à votre stack",
    ],
    price: "À partir de 490 €",
    cta: "Demander un audit",
  },
  {
    icon: GitBranch,
    title: "Workflows sur mesure",
    tagline: "Du code, sans coder",
    description:
      "On conçoit et déploie des workflows complets avec n8n, Make, ou Zapier — renforcés par une couche IA agentique pour les tâches complexes. Tout est documenté, testé, et livré en production.",
    deliverables: [
      "Design et architecture du flow",
      "Intégration CRM, email, Slack, et 100+ outils",
      "Couche IA (GPT, Claude) pour les décisions complexes",
      "Tests + documentation + transfert de connaissances",
    ],
    price: "Sur devis (à partir de 890 €)",
    cta: "Discuter du projet",
  },
  {
    icon: Zap,
    title: "Lead Gen automatisée",
    tagline: "Prospection 24h/24, sans effort",
    description:
      "Un pipeline de prospection entièrement autonome : identification des cibles, enrichissement IA, personnalisation des messages, séquences multicanal. Vous recevez des leads qualifiés directement dans votre CRM.",
    deliverables: [
      "Scraping et ciblage automatisé",
      "Enrichissement de données (email, LinkedIn, site)",
      "Messages personnalisés par IA",
      "Séquences de relance multi-canal",
    ],
    price: "À partir de 1 200 €/mois",
    cta: "Voir une démo",
  },
  {
    icon: RefreshCw,
    title: "Maintenance & évolution",
    tagline: "Vos flows toujours en prod",
    description:
      "Les APIs changent, les process évoluent. On assure la maintenance proactive de vos workflows : monitoring, corrections, mises à jour, et évolutions au fil de vos besoins.",
    deliverables: [
      "Monitoring quotidien des flows",
      "Corrections en < 24h",
      "Rapport mensuel de performances",
      "Évolutions et nouveaux flows inclus",
    ],
    price: "À partir de 290 €/mois",
    cta: "Démarrer",
  },
];

export default function ServicesPage() {
  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Nos services</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Pas de templates génériques. Chaque mission est construite pour votre business,
            votre stack, vos contraintes.
          </p>
        </div>

        {/* Banner */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/services.png"
            alt="Automatisation IA agentique"
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
            <div
              key={s.title}
              className="rounded-xl border border-white/10 bg-white/5 p-8"
            >
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
                      Livrables
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

        {/* CTA bas */}
        <div className="mt-16 rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Pas sûr de ce dont vous avez besoin ?</h2>
          <p className="mb-6 text-gray-400">
            Décrivez votre challenge. On vous répond avec une recommandation personnalisée, sans engagement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Parler de mon projet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
