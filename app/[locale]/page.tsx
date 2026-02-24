import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/organisms/HeroSection";
import StatsSection from "@/components/organisms/StatsSection";
import DomainesSection from "@/components/organisms/DomainesSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection";
import MissionsSection from "@/components/organisms/MissionsSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";
import CTASection from "@/components/organisms/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: `TheNoCodeGuy — ${t("heroHighlight")}`,
    description: t("heroSubtitle"),
    openGraph: {
      title: `TheNoCodeGuy — ${t("heroHighlight")}`,
      description: t("heroSubtitle"),
      url: "https://thenocodeguy.com",
    },
  };
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DomainesSection />
      <HowItWorksSection />
      <MissionsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
