import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return [
    { locale: "fr" },
    { locale: "en" },
    { locale: "zh-TW" },
    { locale: "zh-CN" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("confidentialite");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("confidentialite");

  const sections = [
    { title: t("controllerTitle"), content: t("controllerContent") },
    { title: t("dataCollectedTitle"), content: t("dataCollectedContent") },
    { title: t("purposeTitle"), content: t("purposeContent") },
    { title: t("legalBasisTitle"), content: t("legalBasisContent") },
    { title: t("retentionTitle"), content: t("retentionContent") },
    { title: t("rightsTitle"), content: t("rightsContent") },
    { title: t("dpoTitle"), content: t("dpoContent") },
    { title: t("securityTitle"), content: t("securityContent") },
    { title: t("cnilTitle"), content: t("cnilContent") },
  ];

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Lock className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-muted-foreground">{t("intro")}</p>
        </div>
        <div className="space-y-6">
          {sections.map((section, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <h2 className="mb-3 text-xl font-semibold text-primary">
                  {section.title}
                </h2>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
