import { getTranslations } from 'next-intl/server'

const stats = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label' },
  { valueKey: 'stat4Value', labelKey: 'stat4Label' },
] as const

type StatKey = (typeof stats)[number]['valueKey'] | (typeof stats)[number]['labelKey']

export default async function StatsSection() {
  const t = await getTranslations('stats')

  return (
    <section className="stats-gradient px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-extrabold text-white sm:text-4xl">
              {t(stat.valueKey as StatKey)}
            </div>
            <div className="mt-1 text-sm font-medium text-white/80">
              {t(stat.labelKey as StatKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
