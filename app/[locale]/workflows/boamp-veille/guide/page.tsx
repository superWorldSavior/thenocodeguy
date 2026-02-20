import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guides.boamp");
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function BoampGuidePage() {
  const t = await getTranslations("guides.boamp");
  type Key = Parameters<typeof t>[0];
  const tc = await getTranslations("common");

  const metrics = [
    { metric: t("metric0Value"), label: t("metric0Label") },
    { metric: t("metric1Value"), label: t("metric1Label") },
    { metric: t("metric2Value"), label: t("metric2Label") },
  ];

  const archSteps = [0, 1, 2, 3, 4].map((i) => ({
    step: String(i + 1),
    title: t(`arch${i}Title` as Key),
    desc: t(`arch${i}Desc` as Key),
  }));

  const prereqs = [0, 1, 2, 3].map((i) => t(`prereq${i}` as Key));

  const adaptItems = [0, 1, 2, 3].map((i) => ({
    title: t(`adapt${i}Title` as Key),
    desc: t(`adapt${i}Desc` as Key),
  }));

  return (
    <main className="min-h-screen bg-gray-950 py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/workflows" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400 print:hidden">
          <ArrowLeft className="h-4 w-4" /> {tc("backToWorkflows")}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              {t("tag")}
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white print:text-black sm:text-4xl">{t("title")}</h1>
          <p className="text-lg text-gray-400 print:text-gray-700">{t("intro")}</p>
        </div>

        {/* Results */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("resultsTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center print:border-gray-300">
                <div className="mb-1 text-3xl font-bold text-blue-400 print:text-blue-700">{item.metric}</div>
                <div className="text-sm text-gray-400 print:text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("archTitle")}</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 print:border-gray-300 print:bg-gray-50">
            <div className="flex flex-col gap-3">
              {archSteps.map((s) => (
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

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("prereqTitle")}</h2>
          <ul className="space-y-3">
            {prereqs.map((req) => (
              <li key={req} className="flex items-start gap-3 text-gray-300 print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        {/* Code */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("codeTitle")}</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900 p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-4 w-4" />
              <span>{t("codeCaption")}</span>
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

  const top = items.sort((a, b) => b.score - a.score).slice(0, 5);
  return { scanned: items.length, top, timestamp: new Date().toISOString() };
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-500">{t("codeNote")}</p>
        </section>

        {/* Adapt */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("adaptTitle")}</h2>
          <div className="space-y-4">
            {adaptItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/5 bg-gray-900/50 p-5 print:border-gray-200">
                <div className="mb-1 font-semibold text-white print:text-black">{item.title}</div>
                <div className="text-sm text-gray-400 print:text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center print:hidden">
          <p className="mb-2 text-lg font-semibold text-white">{t("ctaTitle")}</p>
          <p className="mb-6 text-sm text-gray-400">{t("ctaSubtitle")}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400">
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
