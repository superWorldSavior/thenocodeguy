import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function LegalPage() {
  const t = await getTranslations("legal");

  const sections = [
    { title: t("editor"), content: t("editorContent") },
    { title: t("hosting"), content: t("hostingContent") },
    { title: t("ip"), content: t("ipContent") },
  ];

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Shield className="mx-auto mb-4 h-10 w-10 text-emerald-400" />
          <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        </div>
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="mb-3 text-xl font-semibold text-emerald-400">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
