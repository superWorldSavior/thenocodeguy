import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CTASection() {
  const t = await getTranslations("ctaSection");

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="cta-gradient mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center sm:px-16">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
          {t("subtitle")}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-all hover:bg-white hover:shadow-xl"
        >
          {t("button")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
