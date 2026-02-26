import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CalPopupButton from "@/components/molecules/CalPopupButton";
import {
  AlertTriangle,
  Check,
  X,
  ArrowRight,
  FileText,
  Shield,
  Clock,
  Building2,
  Calculator,
  Receipt,
  HardHat,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("facture");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function FacturationElectroniquePage() {
  const t = await getTranslations("facture");
  const tBooking = await getTranslations("booking");
  type Key = Parameters<typeof t>[0];

  const problems = [0, 1, 2, 3].map((i) => t(`problem${i}` as Key));

  const beforeAfter = [0, 1, 2, 3, 4].map((i) => ({
    before: t(`ba${i}Before` as Key),
    after: t(`ba${i}After` as Key),
  }));

  const btpSpecs = [
    { icon: FileText, titleKey: "btp0Title", descKey: "btp0Desc" },
    { icon: Shield, titleKey: "btp1Title", descKey: "btp1Desc" },
    { icon: Calculator, titleKey: "btp2Title", descKey: "btp2Desc" },
    { icon: Receipt, titleKey: "btp3Title", descKey: "btp3Desc" },
    { icon: Building2, titleKey: "btp4Title", descKey: "btp4Desc" },
  ];

  const platforms = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
    t(`pa${i}` as Key)
  );

  const steps = [
    { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Check, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div
          className="hero-mesh-gradient pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <div className="animate-fade-in-up">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <HardHat className="h-3 w-3" />
              {t("badge")}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
            <CalPopupButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30">
              {t("ctaTop")}
              <ArrowRight className="h-4 w-4" />
            </CalPopupButton>
            <p className="mt-2 text-sm text-muted-foreground">
              {tBooking("trustLineTech")}
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("problemTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                <span className="text-sm text-card-foreground">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("beforeAfterTitle")}
          </h2>
          <div className="grid gap-4">
            {beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 sm:gap-6"
              >
                <div className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-red-400">
                      {t("beforeLabel")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {row.before}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <div>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      {t("afterLabel")}
                    </span>
                    <span className="text-sm text-card-foreground">
                      {row.after}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BTP Specifics */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("btpTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {btpSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.titleKey}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {t(spec.titleKey as Key)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(spec.descKey as Key)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PA Grid */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("paTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {platforms.map((pa) => (
              <div
                key={pa}
                className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-4 text-center text-sm font-medium text-card-foreground"
              >
                {pa}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("paSubtext")}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("howTitle")}
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="flex gap-5 rounded-xl border border-border bg-card p-5"
                >
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${step.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {t(`how${i}Label` as Key)}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {t(`how${i}Title` as Key)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`how${i}Desc` as Key)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("ctaBottom")}
            </h2>
            <CalPopupButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30">
              {t("ctaTop")}
              <ArrowRight className="h-4 w-4" />
            </CalPopupButton>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("ctaBottomSubtext")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
