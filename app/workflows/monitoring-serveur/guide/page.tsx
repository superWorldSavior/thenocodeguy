import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";
import { SECURITY_CHECK_BASH } from "@/lib/code-samples/security-check";

export const metadata: Metadata = {
  title: "Guide : Monitoring serveur 24/7 — TheNoCodeGuy",
  description: "Architecture et code du workflow de monitoring serveur automatisé avec alerte WhatsApp.",
  robots: { index: false },
};

export default function MonitoringGuidePage() {
  return (
    <main className="min-h-screen bg-gray-950 py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/workflows"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400 print:hidden"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux workflows
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Bash · Windmill · WhatsApp
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white print:text-black sm:text-4xl">
            Monitoring serveur 24/7
          </h1>
          <p className="text-lg text-gray-400 print:text-gray-700">
            Vérification automatique toutes les 6h. Alerte WhatsApp uniquement si quelque
            chose cloche. Silence si tout va bien — zéro bruit, zéro faux positif.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Ce que ça surveille</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { check: "CPU", desc: "Alerte si charge > 80% sur 5 min" },
              { check: "RAM", desc: "Alerte si utilisation > 85%" },
              { check: "Disque", desc: "Alerte si espace libre < 10%" },
              { check: "Docker", desc: "Alerte si un conteneur est arrêté inopinément" },
              { check: "SSH", desc: "Détection de connexions suspectes dans auth.log" },
              { check: "UFW", desc: "Vérification que le pare-feu est actif" },
            ].map((item) => (
              <div
                key={item.check}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-gray-900/60 p-4 print:border-gray-200"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white print:text-black">{item.check}</div>
                  <div className="text-sm text-gray-400 print:text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Architecture</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 print:border-gray-300 print:bg-gray-50">
            <div className="flex flex-col gap-3">
              {[
                { step: "1", title: "Cron Windmill (6h / 12h / 18h / 0h)", desc: "Déclenchement 4× par jour via expression cron" },
                { step: "2", title: "Script Bash sur le serveur", desc: "Collecte des métriques système via commandes Unix standard" },
                { step: "3", title: "Évaluation des seuils", desc: "Comparaison à des valeurs configurables par variable d'environnement" },
                { step: "4", title: "Décision d'alerte", desc: "Si tout OK → rien. Si anomalie → composition du message" },
                { step: "5", title: "Alerte WhatsApp (si anomalie)", desc: "Message formaté envoyé via OpenClaw / webhook WhatsApp" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-white print:text-black">{s.title}</div>
                    <div className="text-sm text-gray-400 print:text-gray-600">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Script principal (Bash)</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900 p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-4 w-4" />
              <span>windmill · f/openclaw/security_check</span>
            </div>
            <pre className="overflow-x-auto text-sm text-gray-300 print:text-gray-800">
              {SECURITY_CHECK_BASH}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Prérequis</h2>
          <ul className="space-y-3">
            {[
              "Serveur Linux (Ubuntu 20.04+) avec accès SSH",
              "Windmill self-hosted ou Cloud pour l'orchestration",
              "Docker installé (optionnel si pas de conteneurs)",
              "Un webhook WhatsApp ou Telegram pour les alertes",
            ].map((req) => (
              <li key={req} className="flex items-start gap-3 text-gray-300 print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center print:hidden">
          <p className="mb-2 text-lg font-semibold text-white">
            Votre serveur mérite une surveillance professionnelle
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Je déploie ce workflow sur votre infrastructure en 2h, avec les seuils
            calibrés à votre charge réelle.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer un projet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
