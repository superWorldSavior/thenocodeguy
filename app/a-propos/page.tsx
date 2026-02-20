import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Brain, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos — TheNoCodeGuy",
  description:
    "Agence spécialisée en automatisation IA agentique. 10+ ans d'expérience, 200+ sessions livrées, expertise n8n, Make, et workflows IA.",
  openGraph: {
    title: "À propos | TheNoCodeGuy",
    description: "Agence spécialisée en automatisation IA agentique.",
  },
};

const expertise = [
  {
    icon: Brain,
    title: "Architecture IA agentique",
    description: "RAG, GraphRAG, LLMCompiler, orchestration multi-agents. On construit les systèmes IA qui s'adaptent à votre business.",
  },
  {
    icon: GitBranch,
    title: "Automatisation & workflows",
    description: "n8n, Make, Node-RED, Zapier, Airflow. Experts dans l'art de connecter des outils et de les faire travailler ensemble.",
  },
  {
    icon: Globe,
    title: "Knowledge Management",
    description: "Neo4j certifié, Knowledge Graphs, bases de connaissances structurées. Votre data devient un actif stratégique.",
  },
  {
    icon: Zap,
    title: "GEO — Generative Engine Optimization",
    description: "Être visible dans les réponses IA (ChatGPT, Perplexity, Claude). Le SEO du futur, aujourd'hui.",
  },
];

export default function AProposPage() {
  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
            On est des{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              architectes d&apos;automatisation
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Pas une agence de templates. On conçoit des systèmes d&apos;automatisation sur mesure
            qui s&apos;adaptent à votre réalité business — et qui durent.
          </p>
        </div>

        {/* Story */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Pourquoi TheNoCodeGuy ?</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Le no-code a révolutionné la façon dont les entreprises construisent leurs
                outils. Mais avec l&apos;IA, il y a eu un saut qualitatif : aujourd&apos;hui, on peut
                construire des workflows qui <strong className="text-white">prennent des décisions</strong>, pas seulement
                qui exécutent des tâches.
              </p>
              <p>
                Depuis 2014, on accompagne des entrepreneurs, PME et grandes entreprises dans
                leur transformation digitale. 200+ sessions livrées. Des dizaines de workflows
                en production qui tournent 24h/24 sans intervention humaine.
              </p>
              <p>
                Notre philosophie : <strong className="text-white">comprendre avant d&apos;automatiser</strong>.
                Un mauvais process automatisé, c&apos;est juste un mauvais process qui va plus vite.
                On commence toujours par l&apos;audit.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10+", label: "ans d'expérience" },
              { value: "200+", label: "sessions livrées" },
              { value: "50+", label: "outils maîtrisés" },
              { value: "24h", label: "temps de réponse max" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="mb-1 text-3xl font-bold text-emerald-400">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-20">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">Notre expertise</h2>
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

        {/* Values */}
        <div className="mb-20 rounded-xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-6 text-xl font-bold">Ce qu&apos;on ne fait PAS</h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">✕</span>
              <span>Du copier-coller de templates existants sans adaptation à votre contexte</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">✕</span>
              <span>Des livrables PowerPoint sans mise en production réelle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-red-400">✕</span>
              <span>De l&apos;automatisation pour faire de l&apos;automatisation — on part toujours d&apos;un besoin métier concret</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">On travaille ensemble ?</h2>
          <p className="mb-8 text-gray-400">
            Envoyez-nous votre challenge. On vous répond avec une approche concrète.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer la conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
