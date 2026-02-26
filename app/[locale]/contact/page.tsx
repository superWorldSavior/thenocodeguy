import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CalInlineEmbed from "@/components/molecules/CalInlineEmbed";
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
        {/* Section 1: Cal.com inline booking */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            {t("bookingTitle")}
          </h1>
          <p className="text-muted-foreground">{t("bookingSubtitle")}</p>
        </div>

        <div className="mb-20">
          <CalInlineEmbed />
        </div>

        {/* Divider */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground">
              {t("formFallback")}
            </span>
          </div>
        </div>

        {/* Section 2: Contact form fallback */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-2xl font-bold">{t("formFallback")}</h2>
          <p className="text-muted-foreground">{t("formFallbackSubtitle")}</p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
