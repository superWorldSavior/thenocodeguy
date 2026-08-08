'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CalPopupButton from '@/components/molecules/CalPopupButton'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export type HeroSlide = {
  badge: string
  headline: string
  subline: string
  image: string
  imageAlt: string
}

type HeroCarouselProps = {
  slides: HeroSlide[]
  ctaPrimary: string
  ctaSecondary: string
  trustLine: string
  trustBadge1: string
  trustBadge2: string
  trustBadge3: string
}

const BADGE_COLORS: Record<number, string> = {
  0: 'border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300',
  1: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300',
  2: 'border-blue-400/40 bg-blue-400/10 text-blue-700 dark:text-blue-300',
  3: 'border-violet-400/40 bg-violet-400/10 text-violet-700 dark:text-violet-300',
}

export default function HeroCarousel({
  slides,
  ctaPrimary,
  ctaSecondary,
  trustLine,
  trustBadge1,
  trustBadge2,
  trustBadge3,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({ delay: 6000, stopOnMouseEnter: true }),
        ]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">

                {/* Left — copy */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
                        BADGE_COLORS[i] ?? BADGE_COLORS[0]
                      )}
                    >
                      <Zap className="h-3 w-3" />
                      {slide.badge}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                    {slide.headline}
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                    {slide.subline}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <CalPopupButton
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-brand-yellow hover:text-primary hover:shadow-xl hover:shadow-brand-yellow/30"
                    >
                      {ctaPrimary}
                      <ArrowRight className="h-4 w-4" />
                    </CalPopupButton>
                    <Link
                      href="#how-it-works"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      {ctaSecondary}
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground">{trustLine}</p>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {trustBadge1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      {trustBadge2}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      {trustBadge3}
                    </span>
                  </div>
                </div>

                {/* Right — image */}
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/10">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      title={slide.imageAlt}
                      fill
                      className="object-cover"
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                current === i
                  ? 'w-8 bg-brand-yellow'
                  : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
