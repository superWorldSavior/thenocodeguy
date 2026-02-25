import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ArrowRight, Terminal, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SECURITY_CHECK_BASH } from "@/lib/code-samples/security-check";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guides.monitoring");
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function MonitoringGuidePage() {
  const t = await getTranslations("guides.monitoring");
  type Key = Parameters<typeof t>[0];
  const tc = await getTranslations("common");

  const checks = [0, 1, 2, 3, 4, 5].map((i) => ({
    name: t(`check${i}Name` as Key),
    desc: t(`check${i}Desc` as Key),
  }));

  const archSteps = [0, 1, 2, 3, 4].map((i) => ({
    step: String(i + 1),
    title: t(`arch${i}Title` as Key),
    desc: t(`arch${i}Desc` as Key),
  }));

  const prereqs = [0, 1, 2, 3].map((i) => t(`prereq${i}` as Key));

  return (
    <main className="min-h-screen bg-background py-16 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/workflows" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary print:hidden">
          <ArrowLeft className="h-4 w-4" /> {tc("backToWorkflows")}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t("tag")}
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-foreground print:text-black sm:text-4xl">{t("title")}</h1>
          <p className="text-lg text-muted-foreground print:text-gray-700">{t("intro")}</p>
        </div>

        {/* Checks */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-foreground print:text-black">{t("checksTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map((item) => (
              <div key={item.name} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4 print:border-gray-200">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-foreground print:text-black">{item.name}</div>
                  <div className="text-sm text-muted-foreground print:text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-foreground print:text-black">{t("archTitle")}</h2>
          <div className="rounded-xl border border-border bg-card/60 p-6 print:border-gray-300 print:bg-gray-50">
            <div className="flex flex-col gap-3">
              {archSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground print:text-black">{s.title}</div>
                    <div className="text-sm text-muted-foreground print:text-gray-600">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-foreground print:text-black">{t("codeTitle")}</h2>
          <div className="rounded-xl border border-border bg-muted p-5 print:border-gray-300">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-4 w-4" />
              <span>{t("codeCaption")}</span>
            </div>
            <pre className="overflow-x-auto text-sm text-muted-foreground print:text-gray-800">
              {SECURITY_CHECK_BASH}
            </pre>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold text-foreground print:text-black">{t("prereqTitle")}</h2>
          <ul className="space-y-3">
            {prereqs.map((req) => (
              <li key={req} className="flex items-start gap-3 text-muted-foreground print:text-gray-700">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center print:hidden">
          <p className="mb-2 text-lg font-semibold text-foreground">{t("ctaTitle")}</p>
          <p className="mb-6 text-sm text-muted-foreground">{t("ctaSubtitle")}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            {t("ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
