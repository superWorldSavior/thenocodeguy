import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, GitBranch, BarChart3, Shield, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "TheNoCodeGuy — On automatise ce que vous répétez",
  description:
    "Agence d'automatisation IA agentique. Workflows sur mesure, lead gen automatisée, audit process. Livraison clé en main.",
  openGraph: {
    title: "TheNoCodeGuy — On automatise ce que vous répétez",
    description: "Agence d'automatisation IA agentique. Workflows sur mesure, livraison clé en main.",
    url: "https://thenocodeguy.com",
  },
};

const services = [
  {
    icon: BarChart3,
    title: "Audit automatisation",
    description:
      "Analyse complète de vos processus. On identifie ce qui peut être automatisé, dans quel ordre, et avec quel ROI.",
  },
  {
    icon: GitBranch,
    title: "Workflows sur mesure",
    description:
      "Des flows n8n, Make, Zapier renforcés par une couche IA agentique. Adaptés à votre stack, livrés en production.",
  },
  {
    icon: Zap,
    title: "Lead Gen automatisée",
    description:
      "Pipelines de prospection autonomes : scraping, qualification IA, enrichissement, prise de contact. 24h/24.",
  },
];

const testimonials = [
  {
    quote:
      "Erwan m'a montré comment mieux exploiter le module OpenAI de Make via le parsing JSON. Merci beaucoup !",
    author: "Audrey",
    role: "Entrepreneuriale",
  },
  {
    quote:
      "The No Code Guy est efficace et abordable. Il automatise mes tâches depuis deux ans.",
    author: "Kelly",
    role: "kellyassist.fr",
  },
  {
    quote:
      "Si vous cherchez un consultant technico-fonctionnel, Erwan P. est la personne qu'il vous faut.",
    author: "Jean-Charles P.",
    role: "Directeur",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-15"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-950/60 to-gray-950/80" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            Agence d&apos;automatisation IA agentique
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            On automatise{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ce que vous répétez
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
            Des workflows IA sur mesure pour les PME et entrepreneurs qui veulent
            récupérer leur temps. Livraison clé en main, sans jargon, avec des résultats mesurables.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              Démarrer maintenant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-base text-gray-300 transition-colors hover:border-emerald-500/50 hover:text-white"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ce qu&apos;on fait</h2>
            <p className="text-gray-400">Des solutions concrètes, pas des PowerPoints.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <s.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Voir tous les services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "200+", label: "Sessions livrées" },
              { value: "5 ans", label: "d'expertise no-code" },
              { value: "100%", label: "Satisfaction garantie" },
            ].map((stat) => (
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ils nous font confiance</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <Quote className="mb-4 h-6 w-6 text-emerald-500/50" />
                <p className="mb-4 text-sm text-gray-300 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <Shield className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Prêt à automatiser ?
          </h2>
          <p className="mb-8 text-gray-400">
            Décrivez-nous votre challenge. On répond sous 24h avec une proposition concrète.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer le projet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
