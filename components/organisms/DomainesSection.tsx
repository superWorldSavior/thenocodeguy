import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, HardHat, ShoppingCart, FileStack, Globe } from 'lucide-react'

interface Domaine {
  id: string
  titleKey: string
  tasksKey: string
  image: string
  icon: typeof HardHat
  featured?: boolean
}

const domaines: Domaine[] = [
  {
    id: 'btp',
    titleKey: 'btpTitle',
    tasksKey: 'btpTasks',
    image: '/images/homepage/domaine-btp.webp',
    icon: HardHat,
    featured: true,
  },
  {
    id: 'commerce',
    titleKey: 'commerceTitle',
    tasksKey: 'commerceTasks',
    image: '/images/homepage/domaine-commerce.webp',
    icon: ShoppingCart,
  },
  {
    id: 'admin',
    titleKey: 'adminTitle',
    tasksKey: 'adminTasks',
    image: '/images/homepage/domaine-admin.webp',
    icon: FileStack,
  },
  {
    id: 'web',
    titleKey: 'webTitle',
    tasksKey: 'webTasks',
    image: '/images/homepage/domaine-web.webp',
    icon: Globe,
  },
]

export default async function DomainesSection() {
  const t = await getTranslations('domaines')

  return (
    <section id="domaines" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center animate-fade-in-up">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domaines.map((domaine) => {
            const Icon = domaine.icon
            const tasks = (t(domaine.tasksKey as 'btpTasks') as string).split(',')

            return (
              <div
                key={domaine.id}
                className={`card-hover group relative overflow-hidden rounded-2xl border bg-card ${
                  domaine.featured
                    ? 'border-primary/30 ring-1 ring-primary/10 sm:col-span-2 lg:col-span-1 lg:row-span-1'
                    : 'border-border'
                }`}
              >
                {/* Featured badge */}
                {domaine.featured && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-brand-yellow px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {t('featured')}
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={domaine.image}
                    alt={t(domaine.titleKey as 'btpTitle')}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90 text-primary-foreground shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-3 text-lg font-bold text-card-foreground">
                    {t(domaine.titleKey as 'btpTitle')}
                  </h3>

                  {/* Tasks as badges */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {tasks.map((task, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {task.trim()}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {t('ctaButton')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
