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
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Desktop: vertical timeline with alternating layout */}
        <div className="relative hidden lg:block">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />

          <div className="space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = idx % 2 === 0;

              return (
                <div key={step.num} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                  {/* Left content */}
                  <div className={isLeft ? "pr-8 text-right" : ""}>
                    {isLeft && (
                      <>
                        <h3 className="mb-2 text-xl font-bold">{t(step.titleKey as StepKey)}</h3>
                        <p className="text-muted-foreground">{t(step.descKey as StepKey)}</p>
                      </>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="mt-0.5 text-[10px] font-bold text-primary">{step.num}</span>
                  </div>

                  {/* Right content */}
                  <div className={!isLeft ? "pl-8" : ""}>
                    {!isLeft && (
                      <>
                        <h3 className="mb-2 text-xl font-bold">{t(step.titleKey as StepKey)}</h3>
                        <p className="text-muted-foreground">{t(step.descKey as StepKey)}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet: horizontal with connector */}
        <div className="relative hidden sm:block lg:hidden">
          <div className="absolute left-0 right-0 top-[2rem] mx-auto h-px w-3/4 bg-border" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background shadow-md">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-2 text-sm font-bold text-primary">{step.num}</div>
                  <h3 className="mb-2 text-lg font-bold">{t(step.titleKey as StepKey)}</h3>
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
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background shadow-md">
                    <Icon className="h-6 w-6 text-primary" />
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
