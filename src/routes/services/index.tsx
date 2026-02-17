import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import {
  BookOpen,
  BookOpenCheck,
  FileCheck,
  FileText,
  ShieldAlert,
  Search,
  Filter,
  CalendarPlus,
  ArrowRight,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { api } from '@convex/_generated/api'
import { ServiceCategory } from '@convex/lib/validators'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { ServiceCard } from '@/components/home/ServiceCard'
import { ServiceDetailModal } from '@/components/services/ServiceDetailModal'
import { DGDIServiceBanner } from '@/components/services/DGDIServiceBanner'
import { PageHero } from '@/components/PageHero'
import { z } from 'zod'
import { useState, useEffect, useMemo } from 'react'

const servicesSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(), // comma-separated
  service: z.string().optional(), // service slug for modal
})

export const Route = createFileRoute('/services/')({
  component: ServicesPage,
  validateSearch: (search) => servicesSearchSchema.parse(search),
})

const categoryConfig: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  [ServiceCategory.Identity]: {
    icon: BookOpenCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  [ServiceCategory.CivilStatus]: {
    icon: FileText,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  [ServiceCategory.Registration]: {
    icon: BookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  [ServiceCategory.Certification]: {
    icon: FileCheck,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  [ServiceCategory.Assistance]: {
    icon: ShieldAlert,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10',
  },
  [ServiceCategory.TravelDocument]: {
    icon: Globe,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-500/10',
  },
  [ServiceCategory.Transcript]: {
    icon: FileCheck,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  [ServiceCategory.Other]: {
    icon: FileText,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-500/10',
  },
}

function ServiceCardSkeleton() {
  return (
    <div className="glass-card p-6 h-full flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

function ServicesPage() {
  const { t } = useTranslation()
  const navigate = useNavigate({ from: Route.fullPath })
  const search = Route.useSearch()
  const services = useQuery(api.functions.services.listCatalog, {})

  const [searchQuery, setSearchQuery] = useState(search.query || '')

  // Find selected service from URL param
  const selectedService = useMemo(() => {
    if (!search.service || !services) return null
    return services.find(s => s.slug === search.service) || null
  }, [search.service, services])

  const modalOpen = !!search.service && !!selectedService

  // Sync state with URL params
  const updateFilters = (updates: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
      replace: true,
    })
  }

  // Handle modal open/close with URL sync
  const handleServiceClick = (slug: string) => {
    updateFilters({ service: slug })
  }

  const handleModalClose = (open: boolean) => {
    if (!open) {
      updateFilters({ service: undefined })
    }
  }

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== search.query) {
        updateFilters({ query: searchQuery || undefined })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const selectedCategories = search.category ? search.category.split(',') : []

  const toggleCategory = (cat: string) => {
    const current = selectedCategories
    const next = current.includes(cat) 
      ? current.filter(c => c !== cat)
      : [...current, cat]
    updateFilters({ category: next.join(',') || undefined })
  }

  const isLoading = services === undefined

  const filteredServices = services?.filter(service => {
    // Exclude "Demande d'Audience" from the card grid (shown as a button instead)
    if (service.slug === 'demande-audience') return false

    const matchesQuery = !search.query || 
      service.title.toLowerCase().includes(search.query.toLowerCase()) ||
      service.description.toLowerCase().includes(search.query.toLowerCase())
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category)

    return matchesQuery && matchesCategory
  })

  const clearFilters = () => {
    setSearchQuery('')
    updateFilters({ query: undefined, category: undefined })
  }

  const activeFiltersCount = (search.query ? 1 : 0) + selectedCategories.length

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero image="/images/heroes/hero-services.png">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
            {t('services.badge', 'Services Consulaires')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('services.pageTitle', 'Nos')}{' '}
             <span className="text-gradient hover:animate-shimmer bg-[length:200%_auto]">{t('services.pageTitleHighlight', 'Services')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('services.pageDescription', 'Découvrez l\'ensemble des services consulaires proposés par la République Gabonaise pour ses citoyens à l\'étranger.')}
          </p>

           {/* Search Bar + Demande d'Audience */}
           <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                className="h-14 pl-12 pr-4 rounded-2xl bg-background shadow-lg border-primary/10 text-lg placeholder:text-muted-foreground/50 focus-visible:ring-primary/20"
                placeholder={t('services.searchPlaceholder', 'Rechercher un service...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="h-14 px-6 rounded-2xl gap-2 shadow-lg whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              onClick={() => handleServiceClick('demande-audience')}
            >
              <CalendarPlus className="w-5 h-5" />
              {t('services.requestAudience', "Demande d'Audience")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
      </PageHero>



      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar: Filters + DGDI Banner */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-5">
                {/* Filter Panel */}
                <div className="glass-panel p-6 rounded-2xl border-border/40">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
                       <Filter className="w-4 h-4 text-primary" />
                       {t('services.filters', 'Filtres')}
                     </h3>
                     {activeFiltersCount > 0 && (
                       <Button
                         variant="ghost"
                         size="sm"
                         className="h-8 px-2 text-muted-foreground hover:text-red-500 transition-colors"
                         onClick={clearFilters}
                       >
                         {t('services.clearAll', 'Tout effacer')}
                       </Button>
                     )}
                  </div>

                  <div className="space-y-4">
                    <div className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-3 pl-1">
                      {t('services.categories', 'Catégories')}
                    </div>
                    <div className="space-y-1">
                      {Object.values(ServiceCategory).filter((cat) => cat !== ServiceCategory.Visa).map((category) => {
                        const label = t(`services.categoriesMap.${category}`)
                        const config = categoryConfig[category] || categoryConfig[ServiceCategory.Other]
                        const Icon = config.icon
                        const isSelected = selectedCategories.includes(category)

                        return (
                          <Label
                              key={category}
                              htmlFor={`cat-${category}`}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'bg-primary/10 shadow-sm' : 'hover:bg-muted/50'}`}
                          >
                            <Checkbox
                              id={`cat-${category}`}
                              checked={isSelected}
                              onCheckedChange={() => toggleCategory(category)}
                              className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                              <span className={`p-1.5 rounded-md ${config.bgColor} ${config.color.split(' ')[0]}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className={`text-sm ${isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                          </Label>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* DGDI Passeports & Visas Info */}
                <DGDIServiceBanner />
              </div>
            </aside>

            {/* Services Grid */}
            <div className="flex-1">
               <div className="mb-6 flex items-center justify-between">
                 <h2 className="text-xl font-semibold">
                   {filteredServices ? `${filteredServices.length} service${filteredServices.length > 1 ? 's' : ''}` : 'Chargement...'}
                 </h2>
                 {/* Mobile Filter Toggle could go here if needed */}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {isLoading ? (
                   Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
                 ) : filteredServices?.length === 0 ? (
                   <div className="col-span-full py-16 text-center rounded-2xl glass-card border-dashed border-2 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-10 h-10 text-primary/50" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Aucun service trouvé</h3>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        Nous n'avons trouvé aucun service correspondant à vos critères. Essayez de modifier vos filtres ou votre recherche.
                      </p>
                      <Button onClick={clearFilters} variant="outline" className="h-12 px-8 rounded-xl border-primary/20 hover:bg-primary/5 text-primary">
                        Voir tous les services
                      </Button>
                   </div>
                 ) : (
                   filteredServices?.map((service) => {
                     const config = categoryConfig[service.category] || categoryConfig[ServiceCategory.Other]
                     const categoryLabel = t(`services.categoriesMap.${service.category}`)

                     return (
                       <ServiceCard
                         key={service._id}
                         icon={config.icon}
                         title={service.title}
                         description={service.description}
                         color={config.color}
                         badge={categoryLabel}
                         delay={service.delay}
                         onInfoClick={() => handleServiceClick(service.slug)}
                       />
                     )
                   })
                 )}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        open={modalOpen}
        onOpenChange={handleModalClose}
      />

    </div>
  )
}
