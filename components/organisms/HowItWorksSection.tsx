"use client";

import { useTranslations } from "next-intl";
import { FileText, Search, Calendar, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  num: number;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const steps: Step[] = [
  { num: 1, icon: FileText, titleKey: "step1Title", descKey: "step1Desc" },
  { num: 2, icon: Search, titleKey: "step2Title", descKey: "step2Desc" },
  { num: 3, icon: Calendar, titleKey: "step3Title", descKey: "step3Desc" },
  { num: 4, icon: Rocket, titleKey: "step4Title", descKey: "step4Desc" },
];

export default function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 bg-border sm:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                    {step.num}
                  </div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {t(step.titleKey as any)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(step.descKey as any)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
