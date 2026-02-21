import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),transparent)] p-10 text-center">
        <MessageSquare className="mx-auto mb-6 h-10 w-10 text-primary" />
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-8 text-muted-foreground">
          {t("subtitle")}
        </p>
        <Button asChild size="lg">
          <Link href="/contact" className="inline-flex items-center gap-2">
            {t("button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("altText")}
        </p>
      </div>
    </section>
  );
}
