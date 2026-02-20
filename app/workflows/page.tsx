"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Linkedin,
  ArrowRight,
  X,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

const workflows = [
  {
    slug: "boamp-veille",
    icon: Search,
    title: "Veille BOAMP automatisée",
    tagline: "Ne manquez plus un appel d'offres public pertinent",
    description:
      "Surveillance quotidienne du Bulletin Officiel des Annonces des Marchés Publics. Filtrage par mots-clés, envoi des opportunités par email ou WhatsApp chaque matin.",
    tags: ["Windmill", "Python", "Email", "API Gov"],
    metrics: [
      { label: "Temps économisé", value: "2h/jour" },
      { label: "Délai de mise en place", value: "< 1h" },
      { label: "Appels d'offres traités", value: "~800/mois" },
    ],
    color: "blue",
  },
  {
    slug: "monitoring-serveur",
    icon: ShieldCheck,
    title: "Monitoring serveur 24/7",
    tagline: "Alerte immédiate si quelque chose cloche",
    description:
      "Vérification automatique toutes les 6h : CPU, RAM, espace disque, statut Docker, connexions SSH suspectes, UFW. Alerte WhatsApp uniquement si anomalie détectée.",
    tags: ["Bash", "Windmill", "WhatsApp", "Docker"],
    metrics: [
      { label: "Vérifications/jour", value: "4×" },
      { label: "Délai d'alerte", value: "< 5 min" },
      { label: "Faux positifs", value: "0" },
    ],
    color: "emerald",
  },
  {
    slug: "linkedin-auto-post",
    icon: Linkedin,
    title: "LinkedIn Auto-Post",
    tagline: "Publiez régulièrement sans y penser",
    description:
      "6 templates de posts LinkedIn orientés expert IA/automatisation. Planification hebdomadaire, rotation automatique, personnalisation dynamique. Votre personal branding en pilote automatique.",
    tags: ["Windmill", "LinkedIn API", "Templates", "Scheduling"],
    metrics: [
      { label: "Posts/semaine", value: "3–5" },
      { label: "Temps de setup", value: "30 min" },
      { label: "Templates inclus", value: "6" },
    ],
    color: "purple",
  },
];

const colorMap: Record<string, { border: string; bg: string; icon: string; tag: string }> = {
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/60",
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    tag: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    tag: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    tag: "border-purple-500/20 bg-purple-500/10 text-purple-300",
  },
};

export default function WorkflowsPage() {
  const [modal, setModal] = useState<{ slug: string; title: string } | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal) return;
    setLoading(true);

    try {
      await fetch("https://formspree.io/f/meolvdkd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          workflow: modal.title,
          _subject: `Téléchargement workflow : ${modal.title}`,
        }),
      });
      setDone(true);
    } catch {
      // continue anyway
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal(null);
    setEmail("");
    setDone(false);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">Workflows</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Automatisations prêtes à déployer
          </h1>
          <p className="max-w-2xl text-lg text-gray-400">
            Des workflows que j&apos;utilise en production — pas des démos. Chaque guide
            explique le fonctionnement exact, les prérequis, et comment l&apos;adapter à
            votre contexte.
          </p>
        </div>

        {/* Workflow cards */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
          {workflows.map((wf) => {
            const colors = colorMap[wf.color];
            const Icon = wf.icon;
            return (
              <div
                key={wf.slug}
                className={`group rounded-2xl border ${colors.border} bg-gray-900/60 p-6 transition-all sm:p-8`}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="mb-1 text-xl font-bold text-white">{wf.title}</h2>
                    <p className="mb-3 text-sm font-medium text-gray-400">{wf.tagline}</p>
                    <p className="mb-5 text-gray-400">{wf.description}</p>

                    {/* Metrics */}
                    <div className="mb-5 grid grid-cols-3 gap-3">
                      {wf.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-white/5 bg-gray-800/60 p-3 text-center"
                        >
                          <div className={`text-lg font-bold ${colors.icon}`}>{m.value}</div>
                          <div className="mt-0.5 text-xs text-gray-500">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags + CTA */}
                    <div className="flex flex-wrap items-center gap-3">
                      {wf.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1 text-xs ${colors.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                      <button
                        onClick={() => setModal({ slug: wf.slug, title: wf.title })}
                        className="ml-auto flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                      >
                        Obtenir le guide <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <p className="mb-2 text-lg font-semibold text-white">
            Vous voulez ce type d&apos;automatisation dans votre entreprise ?
          </p>
          <p className="mb-6 text-gray-400">
            Je peux l&apos;adapter à votre contexte et le déployer pour vous en quelques
            heures.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Discuter de votre projet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
                <h3 className="mb-2 text-xl font-bold text-white">C&apos;est parti !</h3>
                <p className="mb-6 text-gray-400">
                  Votre guide est disponible ci-dessous. Bonne lecture.
                </p>
                <Link
                  href={`/workflows/${modal.slug}/guide`}
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
                >
                  Accéder au guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-2 text-emerald-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-widest">Guide gratuit</span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-white">{modal.title}</h3>
                <p className="mb-6 text-sm text-gray-400">
                  Entrez votre email pour accéder au guide complet — architecture, code,
                  déploiement.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {loading ? "Envoi…" : "Accéder au guide"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-600">
                  Pas de spam. Juste du contenu utile, quand j&apos;en ai.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
