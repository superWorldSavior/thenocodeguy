import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, CheckCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("domainesBtp");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

const taskKeys = [
  "task1", "task2", "task3", "task4",
  "task5", "task6", "task7", "task8",
] as const;

export default async function BtpPage() {
  const t = await getTranslations("domainesBtp");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="hero-mesh-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                <HardHat className="h-3 w-3" />
                {t("badge")}
              </span>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                {t("title")}
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative animate-fade-in-up animate-delay-200">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/10">
                <Image
                  src="/images/homepage/domaine-btp.webp"
                  alt={t("title")}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tasks list */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold">{t("tasksTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {taskKeys.map((key) => (
              <div
                key={key}
                className="card-hover flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-card-foreground">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client reference */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
            <h3 className="mb-4 text-2xl font-bold">{t("referenceTitle")}</h3>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {t("referenceDesc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
