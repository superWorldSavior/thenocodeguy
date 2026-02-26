import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import CalPopupButton from "@/components/molecules/CalPopupButton";

export default async function CTASection() {
  const t = await getTranslations("ctaSection");
  const tBooking = await getTranslations("booking");

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="bg-primary mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center sm:px-16">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
          {t("subtitle")}
        </p>
        <CalPopupButton
          className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow dark:bg-primary-foreground px-8 py-3.5 text-base font-semibold text-primary dark:text-brand-yellow shadow-lg transition-all hover:bg-white hover:shadow-xl"
        >
          {t("button")}
          <ArrowRight className="h-4 w-4" />
        </CalPopupButton>
        <p className="mt-3 text-sm text-primary-foreground/70">{tBooking("trustLine")}</p>
      </div>
    </section>
  );
}
