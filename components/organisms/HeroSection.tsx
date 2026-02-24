import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react'

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Mesh gradient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-mesh-gradient" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:min-h-[80vh] lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">

          {/* Left column — copy */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                <Zap className="h-3 w-3" />
                {t('badge')}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl">
              {t('headline')}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {t('subline')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-up animate-delay-200">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {t('trustBadge1')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                {t('trustBadge2')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" />
                {t('trustBadge3')}
              </span>
            </div>
          </div>

          {/* Right column — hero image */}
          <div className="relative animate-fade-in-up animate-delay-300">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/10">
              <Image
                src="/images/homepage/hero-main.webp"
                alt="AI staffing agency — professional team working with AI assistants"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
