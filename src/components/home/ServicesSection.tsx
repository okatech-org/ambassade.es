import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import {
  FileText,
  Globe,
  Plane,
  Fingerprint,
  Scroll,
  type LucideIcon,
  BookUser,
  ArrowRight
} from 'lucide-react'
import { api } from '@convex/_generated/api'
import { ServiceCard } from './ServiceCard'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'


const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  "Identité": {
    icon: Fingerprint,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  "Visa": {
    icon: Globe,
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  "Etat Civil": {
    icon: Scroll,
    color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  },
  "Immatriculation": {
    icon: BookUser,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  "Voyage": {
    icon: Plane,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  "default": {
    icon: FileText,
    color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
  },
}

function ServiceSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

export function ServicesSection() {
  const { t } = useTranslation()
  const services = useQuery(api.functions.services.list, {})

  const isLoading = services === undefined

  return (
    <section className="py-16 px-6 bg-secondary/30" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('services.homeTitle', 'Services et démarches à la une')}
          </h2>
          <Button asChild variant="ghost" className="group">
            <Link to="/services">
              {t('services.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
            </>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t('services.empty', 'Aucun service disponible pour le moment.')}
            </div>
          ) : (
            services.slice(0, 3).map((service) => {
              const config = categoryConfig[service.category] || categoryConfig["default"]
              return (
                <ServiceCard
                  key={service._id}
                  icon={config.icon}
                  title={service.title}
                  description={service.description}
                  href={`/services/${service.slug}`}
                  color={config.color}
                  price={service.price}
                  delay={service.delay}
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
