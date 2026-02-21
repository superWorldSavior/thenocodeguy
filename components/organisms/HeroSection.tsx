import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Bot, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ChannelBadges from '@/components/molecules/ChannelBadges'

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
                <Link href="/agents">
                  {t('ctaPrimary')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#how">{t('ctaSecondary')}</Link>
              </Button>
            </div>
            <ChannelBadges size="md" showLabel={true} className="items-start" />
          </div>

          {/* Right column — visual placeholder (decorative, replaced with real asset later) */}
          <div
            aria-hidden="true"
            className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border bg-muted"
          >
            <Bot className="h-20 w-20 text-muted-foreground" />
          </div>

        </div>
      </div>
    </section>
  )
}
