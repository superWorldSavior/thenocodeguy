import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, GitBranch, BarChart3, Shield, Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: "TheNoCodeGuy — On automatise ce que vous répétez",
    description:
      "Agence d'automatisation IA agentique. Workflows sur mesure, lead gen automatisée, audit process. Livraison clé en main.",
    openGraph: {
      title: "TheNoCodeGuy — On automatise ce que vous répétez",
      description: "Agence d'automatisation IA agentique. Workflows sur mesure, livraison clé en main.",
      url: "https://thenocodeguy.com",
    },
  };
}

const serviceIcons = [BarChart3, GitBranch, Zap];

export default async function HomePage() {
  const t = await getTranslations("home");

  const services = [
    { icon: serviceIcons[0], title: t("service0Title"), description: t("service0Desc") },
    { icon: serviceIcons[1], title: t("service1Title"), description: t("service1Desc") },
    { icon: serviceIcons[2], title: t("service2Title"), description: t("service2Desc") },
  ];

  const stats = [
    { value: t("statsValue0"), label: t("statsLabel0") },
    { value: t("statsValue1"), label: t("statsLabel1") },
    { value: t("statsValue2"), label: t("statsLabel2") },
  ];

  const testimonials = [
    { quote: t("testimonial0Quote"), author: t("testimonial0Author"), role: t("testimonial0Role") },
    { quote: t("testimonial1Quote"), author: t("testimonial1Author"), role: t("testimonial1Role") },
    { quote: t("testimonial2Quote"), author: t("testimonial2Author"), role: t("testimonial2Role") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-15"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-950/60 to-gray-950/80" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            {t("badge")}
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {t("heroTitle")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {t("heroHighlight")}
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-base text-gray-300 transition-colors hover:border-emerald-500/50 hover:text-white"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("servicesTitle")}</h2>
            <p className="text-gray-400">{t("servicesSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <s.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
            >
              {t("seeAllServices")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("testimonialsTitle")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <Quote className="mb-4 h-6 w-6 text-emerald-500/50" />
                <p className="mb-4 text-sm text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 to-transparent p-10 text-center">
          <Shield className="mx-auto mb-6 h-10 w-10 text-emerald-400" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("ctaSectionTitle")}
          </h2>
          <p className="mb-8 text-gray-400">
            {t("ctaSectionSubtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("ctaSectionButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
