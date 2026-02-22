import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cgv");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function CGVPage() {
  const t = await getTranslations("cgv");

  const sections = [
    { title: t("objectTitle"), content: t("objectContent") },
    { title: t("modalitiesTitle"), content: t("modalitiesContent") },
    { title: t("pricingTitle"), content: t("pricingContent") },
    { title: t("deliveryTitle"), content: t("deliveryContent") },
    { title: t("liabilityTitle"), content: t("liabilityContent") },
    { title: t("terminationTitle"), content: t("terminationContent") },
    { title: t("confidentialityTitle"), content: t("confidentialityContent") },
    { title: t("lawTitle"), content: t("lawContent") },
  ];

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <FileText className="mx-auto mb-4 h-10 w-10 text-primary" />
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
