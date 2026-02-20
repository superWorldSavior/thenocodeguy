import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("metaTitle") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{t("pageTitle")}</h1>
          <p className="text-gray-400">{t("pageSubtitle")}</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
