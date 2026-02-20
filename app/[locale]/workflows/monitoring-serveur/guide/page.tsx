import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SECURITY_CHECK_BASH } from "@/lib/code-samples/security-check";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guides.monitoring");
  const tc = await getTranslations("common");
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function MonitoringGuidePage() {
  const t = await getTranslations("guides.monitoring");
  const tc = await getTranslations("common");

  const checks = [0, 1, 2, 3, 4, 5].map((i) => ({
    name: t(`check${i}Name` as any),
    desc: t(`check${i}Desc` as any),
  }));

  const archSteps = [0, 1, 2, 3, 4].map((i) => ({
    step: String(i + 1),
    title: t(`arch${i}Title` as any),
    desc: t(`arch${i}Desc` as any),
  }));

  const prereqs = [0, 1, 2, 3].map((i) => t(`prereq${i}` as any));

  return (
    <main className="min-h-screen bg-gray-950 py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/workflows" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-emerald-400 print:hidden">
          <ArrowLeft className="h-4 w-4" /> {tc("backToWorkflows")}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {t("tag")}
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white print:text-black sm:text-4xl">{t("title")}</h1>
          <p className="text-lg text-gray-400 print:text-gray-700">{t("intro")}</p>
        </div>

        {/* Checks */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("checksTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map((item) => (
              <div key={item.name} className="flex items-start gap-3 rounded-xl border border-white/5 bg-gray-900/60 p-4 print:border-gray-200">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white print:text-black">{item.name}</div>
                  <div className="text-sm text-gray-400 print:text-gray-600">{item.desc}</div>
                </div>
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

        {/* Code */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("codeTitle")}</h2>
          <div className="rounded-xl border border-white/10 bg-gray-900 p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Terminal className="h-4 w-4" />
              <span>{t("codeCaption")}</span>
            </div>
            <pre className="overflow-x-auto text-sm text-gray-300 print:text-gray-800">
              {SECURITY_CHECK_BASH}
            </pre>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-white print:text-black">{t("prereqTitle")}</h2>
          <ul className="space-y-3">
            {prereqs.map((req) => (
              <li key={req} className="flex items-start gap-3 text-gray-300 print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {req}
              </li>
            ))}
          </ul>
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
