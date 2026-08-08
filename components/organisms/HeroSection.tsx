import { getTranslations } from 'next-intl/server'
import HeroCarousel, { type HeroSlide } from './HeroCarousel'

const SLIDE_IMAGES = [
  { image: '/images/homepage/domaine-btp.webp', altKey: 'BTP' },
  { image: '/images/homepage/domaine-commerce.webp', altKey: 'Commerce' },
  { image: '/images/homepage/carousel-admin.webp', altKey: 'Admin' },
  { image: '/images/homepage/carousel-web.webp', altKey: 'Web' },
]

export default async function HeroSection() {
  const t = await getTranslations('hero')
  const tBooking = await getTranslations('booking')

  const slides: HeroSlide[] = SLIDE_IMAGES.map((s, i) => ({
    badge: t(`slide${i}Badge`),
    headline: t(`slide${i}Headline`),
    subline: t(`slide${i}Subline`),
    image: s.image,
    imageAlt: `${s.altKey} — ${t(`slide${i}Badge`)}`,
  }))

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Mesh gradient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-mesh-gradient" />

      <div className="relative">
        <HeroCarousel
          slides={slides}
          ctaPrimary={t('ctaPrimary')}
          ctaSecondary={t('ctaSecondary')}
          trustLine={tBooking('trustLine')}
          trustBadge1={t('trustBadge1')}
          trustBadge2={t('trustBadge2')}
          trustBadge3={t('trustBadge3')}
        />
      </div>
    </section>
  )
}
