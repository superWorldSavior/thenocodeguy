import type { Metadata } from "next";
import { Zap, Clock, TrendingUp, Shield } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AuditForm from "./AuditForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("audit");
  return { title: t("metaTitle") };
}

export default async function AuditPage() {
  const t = await getTranslations("audit");

  const benefits = [
    { icon: Clock, label: t("benefit0Label"), desc: t("benefit0Desc") },
    { icon: Zap, label: t("benefit1Label"), desc: t("benefit1Desc") },
    { icon: TrendingUp, label: t("benefit2Label"), desc: t("benefit2Desc") },
    { icon: Shield, label: t("benefit3Label"), desc: t("benefit3Desc") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            {t("badge")}
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroTitle")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {t("heroHighlight")}
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-400">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
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
