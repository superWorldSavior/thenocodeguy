import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Bot, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Radial gradient background — decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,theme(colors.indigo.100/60),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">

          {/* Left column — copy */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="secondary">{t('badge')}</Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {t('headline')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('subline')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default" size="lg">
                <Link href="#profiles">
                  {t('ctaPrimary')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>

          {/* Right column — visual placeholder (decorative, replaced with real asset later) */}
          <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{t('badge')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
