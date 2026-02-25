import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function MissionsSection() {
  const t = await getTranslations('missions')

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Case study card */}
        <div className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr]">
            {/* Image */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
              <Image
                src="/images/homepage/mission-casestudy.webp"
                alt={t('studyTitle')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/10 lg:bg-gradient-to-r lg:from-transparent lg:to-card/20" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t('studyBadge')}
              </span>

              <h3 className="mb-4 text-2xl font-bold text-card-foreground lg:text-3xl">
                {t('studyTitle')}
              </h3>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                {t('studyDesc')}
              </p>

              {/* Stats */}
              <div className="mb-8 flex gap-8">
                <div>
                  <div className="text-3xl font-extrabold text-primary">
                    {t('studyStat1Value')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('studyStat1Label')}
                  </div>
                </div>
                <div className="h-auto w-px bg-border" />
                <div>
                  <div className="text-3xl font-extrabold text-primary">
                    {t('studyStat2Value')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('studyStat2Label')}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                {t('studyCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
