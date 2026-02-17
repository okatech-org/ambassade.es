import { createFileRoute, Link } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import {
  BookOpen,
  BookOpenCheck,
  FileCheck,
  FileText,
  Globe,
  ShieldAlert,
  ArrowLeft,
  FileWarning,
  type LucideIcon,
} from 'lucide-react'
import { api } from '@convex/_generated/api'
import { ServiceCategory } from '@convex/lib/validators'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'



export const Route = createFileRoute('/services/$slug')({
  component: ServiceDetailPage,
})

// Category configuration - supports both enum values and French category strings
const categoryConfig: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  // Enum-based keys
  [ServiceCategory.Identity]: {
    icon: BookOpenCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  [ServiceCategory.Visa]: {
    icon: Globe,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
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
  [ServiceCategory.Other]: {
    icon: FileText,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-500/10',
  },
  // French string-based keys (from seed data)
  'Identité': {
    icon: BookOpenCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  'Visa': {
    icon: Globe,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
  },
  'État Civil': {
    icon: FileText,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  'Immatriculation': {
    icon: BookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  'Documents': {
    icon: FileCheck,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
}

const categoryLabels: Record<string, string> = {
  [ServiceCategory.Identity]: 'Identité',
  [ServiceCategory.Visa]: 'Visa',
  [ServiceCategory.CivilStatus]: 'État Civil',
  [ServiceCategory.Registration]: 'Inscription Consulaire',
  [ServiceCategory.Certification]: 'Certification & Légalisation',
  [ServiceCategory.Assistance]: 'Assistance Consulaire',
  [ServiceCategory.TravelDocument]: 'Titre de Voyage',
  [ServiceCategory.Transcript]: 'Transcription',
  [ServiceCategory.Other]: 'Autre',
}

function ServiceDetailPage() {
  const { t } = useTranslation()
  const { slug } = Route.useParams()
  const service = useQuery(api.functions.services.getBySlug, { slug })

  const isLoading = service === undefined

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="flex items-start gap-6 mb-8">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <FileWarning className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('services.notFound', 'Service non trouvé')}</h1>
            <p className="text-muted-foreground mb-6">
              {t('services.notFoundDesc', 'Le service demandé n\'existe pas ou a été supprimé.')}
            </p>
            <Button asChild>
              <Link to="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('services.backToServices', 'Retour aux services')}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    )
  }

  const config = categoryConfig[service.category] || categoryConfig[ServiceCategory.Other]
  const Icon = config.icon
  const categoryLabel = categoryLabels[service.category] || service.category
  // Use direct string fields from simplified schema
  const serviceName = service.title
  const serviceDescription = service.description

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Header */}
        {/* Header */}
        <section className="relative overflow-hidden py-16 px-6">
           {/* Background */}
           <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
           
           <div className="max-w-4xl mx-auto relative z-10">
            <Button asChild variant="ghost" size="sm" className="mb-8 hover:bg-background/50">
              <Link to="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('services.backToServices', 'Retour aux services')}
              </Link>
            </Button>

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className={`p-6 rounded-3xl ${config.bgColor} ${config.color} shadow-lg backdrop-blur-sm ring-1 ring-inset ring-white/10 shrink-0`}>
                <Icon className="w-12 h-12" />
              </div>
              <div className="flex-1 pt-2">
                <Badge variant="secondary" className={`${config.bgColor} ${config.color} mb-4 border-0 px-3 py-1`}>
                  {categoryLabel}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {serviceName}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Warning for Passport/Visa */}
            {([ServiceCategory.Identity, ServiceCategory.Visa, 'Identité', 'Visa'].includes(service.category as any)) && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4">
                <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-500 mb-2">
                    {t('services.passportVisaWarning.title', 'Information Importante')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('services.passportVisaWarning.message', "Les services Passeport et Visa sont de l'autorité de l'Antenne DGDI. Veuillez noter que ce n'est pas le Consulat Général qui établit les Passeports et les Visas en France.")}
                  </p>
                </div>
              </div>
            )}


            {/* Description */}
            <div className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{t('services.descriptionTitle', 'Description')}</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <ReactMarkdown>{serviceDescription}</ReactMarkdown>
                </div>
            </div>

            {/* Required Documents */}
            {service.requirements && service.requirements.length > 0 && (
              <div className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
                        <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">{t('services.requiredDocuments', 'Documents requis')}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{t('services.documentsDesc', 'Les documents suivants sont nécessaires.')}</p>
                    </div>
                </div>
                
                 <ul className="grid sm:grid-cols-2 gap-4">
                    {service.requirements.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background/40 border border-border/40 hover:border-primary/20 transition-colors">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="font-medium text-foreground text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            )}

            {/* Price and Delay Info */}
            {(service.price || service.delay) && (
              <div className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                 <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                        <BookOpenCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{t('services.practicalInfo', 'Informations pratiques')}</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {service.price && (
                    <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                        <span className="text-sm text-muted-foreground block mb-1">Coût</span>
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {service.price === 'Gratuit' ? t('services.free', 'Gratuit') : service.price}
                        </span>
                    </div>
                  )}
                  {service.delay && (
                     <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                        <span className="text-sm text-muted-foreground block mb-1">{t('services.delay', 'Délai moyen')}</span>
                        <span className="text-xl font-semibold text-foreground">
                             {service.delay}
                        </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>


    </div>
  )
}
