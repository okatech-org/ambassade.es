import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import {
  FileText,
  Fingerprint,
  Scroll,
  type LucideIcon,
  BookUser,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  CalendarPlus,
} from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'

import { ServiceCategory } from '@convex/lib/validators'

const categoryConfig: Record<string, { icon: LucideIcon; color: string; gradient: string }> = {
  [ServiceCategory.Identity]: {
    icon: Fingerprint,
    color: 'bg-[#1a5dab]/10 text-[#1a5dab]',
    gradient: 'from-[#1a5dab]/15 to-[#4285f4]/5',
  },
  [ServiceCategory.CivilStatus]: {
    icon: Scroll,
    color: 'bg-[#f9ab00]/10 text-[#f9ab00]',
    gradient: 'from-[#f9ab00]/15 to-[#f9ab00]/5',
  },
  [ServiceCategory.Registration]: {
    icon: BookUser,
    color: 'bg-[#34a853]/10 text-[#34a853]',
    gradient: 'from-[#34a853]/15 to-[#34a853]/5',
  },
  Voyage: {
    icon: FileText,
    color: 'bg-[#ea4335]/10 text-[#ea4335]',
    gradient: 'from-[#ea4335]/15 to-[#ea4335]/5',
  },
  default: {
    icon: FileText,
    color: 'bg-[#5f6368]/10 text-[#5f6368]',
    gradient: 'from-[#5f6368]/15 to-[#5f6368]/5',
  },
}

function ServiceSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

function BentoServiceCard({
  service,
  config,
  slug,
  featured = false,
  image,
}: {
  service: any
  config: { icon: LucideIcon; color: string; gradient: string }
  slug: string
  featured?: boolean
  image?: string
}) {
  const { t } = useTranslation()
  const Icon = config.icon

  // Special featured card for Carte Consulaire
  if (featured && slug === 'carte-consulaire') {
    return (
      <div
        onClick={() => window.location.href = `/services/${slug}`}
        className="group relative text-left w-full cursor-pointer rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 block md:col-span-2 md:row-span-2"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a5dab]/5 via-transparent to-[#34a853]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 h-full flex flex-col md:min-h-[420px]">
          {/* ── Desktop Image — absolute overlay on right (hidden on mobile) ── */}
          <div className="hidden md:flex absolute -top-5 bottom-0 right-0 w-[70%] items-center justify-end pointer-events-none">
            <img 
              src="/images/services/carte-consulaire.png" 
              alt="Carte Consulaire Gabonaise"
              className="w-full h-full object-contain object-right scale-[1.125] origin-right drop-shadow-2xl group-hover:scale-[1.175] transition-transform duration-500"
            />
          </div>

          {/* Text content */}
          <div className="relative z-20 p-5 md:p-8 flex flex-col h-full">
            {/* Header: Title then Badge below */}
            <div className="flex flex-col items-start gap-1 mb-3">
              <h3 className="text-xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                Votre pièce d'identité <span className="text-gradient">gabonaise en France</span>
              </h3>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs backdrop-blur-sm">
                ✨ Nouvelle Carte Consulaire
              </Badge>
            </div>

            {/* ── Mobile Image — inline, centered (hidden on desktop) ── */}
            <div className="md:hidden flex justify-center my-3">
              <img 
                src="/images/services/carte-consulaire.png" 
                alt="Carte Consulaire Gabonaise"
                className="w-[75%] max-w-[280px] object-contain drop-shadow-xl"
              />
            </div>

            {/* Documents required */}
            <ul className="text-sm text-foreground/80 space-y-1.5 mb-4 max-w-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                Une copie d'acte de naissance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                Une copie du passeport
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                Un justificatif de domicile
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                <span>Une copie de la carte résident <span className="text-muted-foreground italic">(Facultatif)</span></span>
              </li>
            </ul>

            {/* CTA Button — external link */}
            <a
              href="https://www.consulat.ga/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-fit text-center rounded-full text-white shadow-lg hover:shadow-xl transition-all font-semibold px-6 py-3 md:py-2.5 inline-flex items-center justify-center gap-2 text-sm mb-4 bg-[#1a5dab] hover:bg-[#174ea6]"
              onClick={(e) => e.stopPropagation()}
            >
              Demande de Carte Consulaire
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-2xl line-clamp-2 md:mt-16">
              La carte consulaire atteste de votre inscription au registre des Gabonais de l'étranger.
              <br />
              Elle facilite toutes vos démarches administratives et consulaires sur le territoire français.
            </p>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {[
                { label: 'Reconnaissance officielle', icon: '🏛️' },
                { label: 'Démarches simplifiées', icon: '⚡' },
                { label: 'Validité 5 ans', icon: '📅' },
              ].map((feat) => (
                <div key={feat.label} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-foreground/80 backdrop-blur-sm bg-background/60 rounded-md px-2 py-1 md:px-2.5 md:py-1.5">
                  <span>{feat.icon}</span>
                  <span className="font-medium">{feat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const navigate = useNavigate()

  const handleServiceClick = (slug: string) => {
    navigate({ to: '/services', search: { service: slug } })
  }

  return (
    <button
      type="button"
      onClick={() => handleServiceClick(slug)}
      className={`group relative text-left w-full cursor-pointer rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 block ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      } ${slug === 'demande-audience' ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-400/50' : ''}`}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      )}

      {/* Gradient overlay (only if no image) */}
      {!image && <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />}

      <div className={`relative z-10 p-6 ${featured ? 'md:p-8' : ''} h-full flex flex-col`}>
        {/* Header with Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2.5 rounded-xl shrink-0 ${image ? 'bg-white/10 backdrop-blur-md text-white' : slug === 'demande-audience' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : config.color + ' backdrop-blur-sm'}`}>
            <Icon className={`${featured ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </div>
          <h3 className={`font-bold transition-colors ${featured ? 'text-xl' : 'text-base'} ${image ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className={`leading-relaxed mb-4 flex-1 ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-2'} ${image ? 'text-gray-200' : 'text-muted-foreground'}`}>
          {service.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {service.delay && (
            <span className={`text-xs flex items-center gap-1.5 ${image ? 'text-gray-300' : 'text-muted-foreground'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${image ? 'text-emerald-400' : 'text-emerald-500'}`} />
              {service.delay}
            </span>
          )}
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all ml-auto ${image ? 'text-white opacity-90 group-hover:opacity-100' : 'text-primary opacity-0 group-hover:opacity-100'}`}>
            {t('services.knowMore', 'En savoir plus')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </button>
  )
}







export function ServicesSection() {
  const { t } = useTranslation()
  const services = useQuery(api.functions.services.list, {})

  const isLoading = services === undefined

  const otherServices = services || []

  // Define the exact layout order by slug
  const topRowSlugs = ['carte-consulaire', 'laissez-passer', 'tenant-lieu']
  const bottomRowSlugs = ['transcription-naissance', 'certificat-coutume-celibat', 'demande-audience']

  const findBySlug = (slug: string) => otherServices.find(s => s.slug === slug)

  const topRow = topRowSlugs.map(findBySlug).filter(Boolean) as any[]
  const bottomRow = bottomRowSlugs.map(findBySlug).filter(Boolean) as any[]

  return (
    <section className="py-12 md:py-24 px-4 md:px-6" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            {t('services.badge', 'Nos Services')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.homeTitle', 'Services et démarches')}{' '}
            <span className="text-gradient">
              {t('services.homeTitleHighlight', 'à la une')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              'services.homeDescription',
              'Accédez rapidement à vos démarches administratives les plus courantes.'
            )}
          </p>
        </div>

        {/* Row 1: Carte Consulaire (large) + Laissez-Passer + Tenant Lieu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {isLoading ? (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <ServiceSkeleton />
              </div>
              <ServiceSkeleton />
              <ServiceSkeleton />
            </>
          ) : topRow.length > 0 ? (
            topRow.map((service, i) => {
              const config = categoryConfig[service.category] || categoryConfig['default']
              return (
                <BentoServiceCard
                  key={service._id}
                  service={service}
                  config={config}
                  slug={service.slug}
                  featured={i === 0}
                />
              )
            })
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t('services.empty', 'Aucun service disponible pour le moment.')}
            </div>
          )}
        </div>

        {/* Row 2: Transcription + Certificat de célibat + Demande d'Audience */}
        {!isLoading && bottomRow.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomRow.map((service) => {
              const isAudience = service.slug === 'demande-audience'
              const config = isAudience
                ? { icon: CalendarPlus, color: 'bg-emerald-500/10 text-emerald-600', gradient: 'from-emerald-500/15 to-emerald-400/5' }
                : categoryConfig[service.category] || categoryConfig['default']
              return (
                <BentoServiceCard
                  key={service._id}
                  service={service}
                  config={config}
                  slug={service.slug}
                  featured={false}
                />
              )
            })}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full border-[#1a5dab]/30 text-[#1a5dab] hover:bg-[#1a5dab]/5">
            <Link to="/services">
              {t('services.viewAll', 'Voir tous les services')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>


      </div>


    </section>
  )
}

export default ServicesSection
