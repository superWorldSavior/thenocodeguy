import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

export default async function CTASection() {
  const t = await getTranslations("ctaSection");

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
        <MessageSquare className="mx-auto mb-6 h-10 w-10 text-primary" />
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-8 text-muted-foreground">
          {t("subtitle")}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("button")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
