import { getTranslations } from "next-intl/server";
import { FileText, Phone, Calendar, Rocket } from "lucide-react";

const steps = [
  { icon: FileText, num: "01", titleKey: "step1Title", descKey: "step1Desc" },
  { icon: Phone, num: "02", titleKey: "step2Title", descKey: "step2Desc" },
  { icon: Calendar, num: "03", titleKey: "step3Title", descKey: "step3Desc" },
  { icon: Rocket, num: "04", titleKey: "step4Title", descKey: "step4Desc" },
] as const;

type StepKey = (typeof steps)[number]["titleKey"] | (typeof steps)[number]["descKey"];

export default async function HowItWorksSection() {
  const t = await getTranslations("howItWorks");

  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Desktop: horizontal with connector line */}
        <div className="relative hidden sm:block">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-[3.5rem] mx-auto h-px w-3/4 bg-border" />
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-2 text-sm font-bold text-primary">{step.num}</div>
                  <h3 className="mb-2 text-xl font-bold">{t(step.titleKey as StepKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(step.descKey as StepKey)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stacked */}
        <div className="space-y-8 sm:hidden">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="pb-4">
                  <div className="mb-1 text-sm font-bold text-primary">{step.num}</div>
                  <h3 className="mb-1 text-lg font-bold">{t(step.titleKey as StepKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(step.descKey as StepKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
