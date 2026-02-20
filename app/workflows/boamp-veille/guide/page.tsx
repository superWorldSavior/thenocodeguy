import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide : Veille BOAMP automatisée — TheNoCodeGuy",
  description: "Architecture complète, code et déploiement du workflow de veille BOAMP automatisée.",
  robots: { index: false },
};

export default function BoampGuidePage() {
  return (
    <main className="min-h-screen bg-gray-950 py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Nav */}
        <Link
          href="/workflows"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400 print:hidden"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux workflows
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              Windmill · TypeScript · API BOAMP
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white print:text-black sm:text-4xl">
            Veille BOAMP automatisée
          </h1>
          <p className="text-lg text-gray-400 print:text-gray-700">
            Surveillance quotidienne du Bulletin Officiel des Annonces des Marchés Publics.
            Zéro effort manuel — les opportunités arrivent dans votre boîte mail chaque matin.
          </p>
        </div>

        {/* Résultats */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Ce que ça fait concrètement</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { metric: "~800", label: "appels d'offres analysés par mois" },
              { metric: "2h", label: "économisées chaque jour de recherche manuelle" },
              { metric: "< 1h", label: "pour le déploiement complet" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center print:border-gray-300"
              >
                <div className="mb-1 text-3xl font-bold text-blue-400 print:text-blue-700">{item.metric}</div>
                <div className="text-sm text-gray-400 print:text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Architecture</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 print:border-gray-300 print:bg-gray-50">
            <div className="flex flex-col gap-3">
              {[
                { step: "1", title: "Cron Windmill (07:00 chaque matin)", desc: "Déclenchement automatique du script Python" },
                { step: "2", title: "API BOAMP (api.boamp.fr)", desc: "Récupération des dernières publications filtrées par mots-clés" },
                { step: "3", title: "Scoring & filtrage", desc: "Pertinence calculée sur titre, objet, montant estimé, lieu" },
                { step: "4", title: "Enrichissement", desc: "Lien direct vers l'annonce + date limite de candidature" },
                { step: "5", title: "Email digest", desc: "Récapitulatif HTML envoyé via SMTP ou Graph API" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
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

        {/* Prérequis */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Prérequis</h2>
          <ul className="space-y-3">
            {[
              "Windmill self-hosted (Docker) ou Windmill Cloud",
              "Python 3.10+ disponible dans l'environnement Windmill",
              "Accès SMTP ou Microsoft Graph API pour l'envoi d'email",
              "10 minutes pour lire la doc de l'API BOAMP (publique, gratuite)",
            ].map((req) => (
              <li key={req} className="flex items-start gap-3 text-gray-300 print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        {/* Code */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Script principal (TypeScript / Bun)</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900 p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-4 w-4" />
              <span>windmill · f/openclaw/veille_opportunites</span>
            </div>
            <pre className="overflow-x-auto text-sm text-gray-300 print:text-gray-800">
{`const HIGH_VALUE = [
  "intelligence artificielle", "agent ia", "agentic", "mcp",
  "knowledge management", "knowledge graph", "rag",
  "workflow ia", "automatisation ia"
];
const MEDIUM_VALUE = [
  "automatisation", "transformation digitale",
  "systeme information", "data", "erp"
];
const SECTORS = [
  "aeronautique", "aerospace", "defense", "industrie",
  "manufacturing", "energie", "dgac", "dga"
];

function score(titre: string, acheteur: string): number {
  const text = (titre + " " + acheteur).toLowerCase();
  let s = 0;
  for (const kw of HIGH_VALUE)  if (text.includes(kw)) s += 3;
  for (const kw of MEDIUM_VALUE) if (text.includes(kw)) s += 1;
  for (const kw of SECTORS)     if (text.includes(kw)) s += 2;
  return s;
}

export async function main() {
  const BASE =
    "https://boamp-datadila.opendatasoft.com/api/explore/v2.1/" +
    "catalog/datasets/boamp/records";
  const keywords = [
    "intelligence artificielle", "automatisation",
    "knowledge management", "transformation digitale",
  ];
  const seen = new Set<string>();
  const items: any[] = [];

  for (const kw of keywords) {
    try {
      const url =
        \`\${BASE}?where=objet%20like%20%22\${encodeURIComponent(kw)}%22\` +
        \`&limit=10&order_by=dateparution%20DESC\` +
        \`&select=objet%2Cdateparution%2Cnomacheteur%2Cidweb%2Curl_avis\`;
      const resp = await fetch(url, { headers: { Accept: "application/json" } });
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const r of data.results ?? []) {
        if (!r.idweb || seen.has(r.idweb)) continue;
        seen.add(r.idweb);
        // Garder uniquement les 3 derniers jours
        const ageMs = Date.now() - new Date(r.dateparution).getTime();
        if (ageMs > 3 * 24 * 60 * 60 * 1000) continue;
        const titre = (r.objet ?? "").replace(/\\n/g, " ").substring(0, 150);
        items.push({
          titre,
          date:     r.dateparution,
          acheteur: r.nomacheteur ?? "N/A",
          url:      r.url_avis ?? \`https://www.boamp.fr/avis/detail/\${r.idweb}\`,
          score:    score(titre, r.nomacheteur ?? ""),
        });
      }
    } catch (_e) { /* skip keyword on error */ }
  }

  // Top 5 par score de pertinence
  const top = items.sort((a, b) => b.score - a.score).slice(0, 5);
  return { scanned: items.length, top, timestamp: new Date().toISOString() };
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Ce script tourne sur Windmill (runtime Bun). Il interroge l&apos;API publique BOAMP,
            filtre les annonces de moins de 3 jours et les classe par score de pertinence métier.
          </p>
        </section>

        {/* Adaptation */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">Comment l&apos;adapter à votre cas</h2>
          <div className="space-y-4">
            {[
              {
                title: "Filtrer par région",
                desc: "Ajoutez un paramètre `lieu` ou filtrez sur le champ `codeinsee` pour cibler un département ou une région spécifique.",
              },
              {
                title: "Changer les mots-clés",
                desc: "Le tableau `KEYWORDS` est la seule variable à modifier pour cibler votre secteur (BTP, DSI, formation, conseil...).",
              },
              {
                title: "Ajouter un seuil de montant",
                desc: "Filtrez sur `montant` pour ne recevoir que les marchés supérieurs à un certain seuil (ex. > 50k€).",
              },
              {
                title: "Notification WhatsApp",
                desc: "Remplacez l'envoi email par un webhook WhatsApp (OpenClaw, Twilio, etc.) pour une alerte immédiate sur mobile.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/5 bg-gray-900/50 p-5 print:border-gray-200"
              >
                <div className="mb-1 font-semibold text-white print:text-black">{item.title}</div>
                <div className="text-sm text-gray-400 print:text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center print:hidden">
          <p className="mb-2 text-lg font-semibold text-white">
            Besoin que je l&apos;implémente pour vous ?
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Je peux déployer ce workflow sur votre infrastructure en moins d&apos;une journée,
            avec les filtres adaptés à votre secteur.
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
