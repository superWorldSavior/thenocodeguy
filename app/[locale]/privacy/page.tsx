import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Lock } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const sections = [
    { title: t("collectTitle"), content: t("collectContent") },
    { title: t("useTitle"), content: t("useContent") },
    { title: t("securityTitle"), content: t("securityContent") },
    { title: t("rightsTitle"), content: t("rightsContent") },
    { title: t("retentionTitle"), content: t("retentionContent") },
    { title: t("contactTitle"), content: t("contactContent") },
  ];

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Lock className="mx-auto mb-4 h-10 w-10 text-emerald-400" />
          <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-gray-400">{t("intro")}</p>
        </div>
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="mb-3 text-xl font-semibold text-emerald-400">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
