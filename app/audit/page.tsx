import type { Metadata } from "next";
import { Zap, Clock, TrendingUp, Shield } from "lucide-react";
import AuditForm from "./AuditForm";

export const metadata: Metadata = {
  title: "Audit Gratuit — Votre potentiel d'automatisation en 2 minutes",
  description:
    "Répondez à 4 questions et recevez un rapport IA personnalisé : score d'automatisation, ROI estimé, quick wins et outils recommandés.",
  openGraph: {
    title: "Audit Gratuit Automatisation — TheNoCodeGuy",
    description:
      "Découvrez combien d'heures vous pouvez récupérer et quel ROI attendre. Rapport IA généré en 30 secondes.",
    url: "https://thenocodeguy.com/audit",
  },
};

const benefits = [
  {
    icon: Clock,
    label: "2 minutes",
    desc: "Pour compléter l'audit",
  },
  {
    icon: Zap,
    label: "IA instantanée",
    desc: "Rapport généré en 30s",
  },
  {
    icon: TrendingUp,
    label: "ROI chiffré",
    desc: "Estimation concrète",
  },
  {
    icon: Shield,
    label: "100% gratuit",
    desc: "Sans engagement",
  },
];

export default function AuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            Audit d&apos;automatisation gratuit
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Votre potentiel d&apos;automatisation{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              en 2 minutes
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-400">
            Répondez à 4 questions. Recevez un rapport personnalisé : score,
            heures récupérables, ROI et actions concrètes.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <div className="mx-auto mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                  <b.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-sm font-semibold text-white">{b.label}</div>
                <div className="text-xs text-gray-500">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <AuditForm />
        </div>
      </section>
    </>
  );
}
