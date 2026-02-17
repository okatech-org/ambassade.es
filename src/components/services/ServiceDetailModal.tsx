import ReactMarkdown from 'react-markdown'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ServiceCategory } from '@convex/lib/validators'
import {
  Clock,
  FileText,
  CheckCircle2,
  Users,
  BookOpenCheck,
  Globe,
  BookOpen,
  FileCheck,
  ShieldAlert,
  AlertTriangle,
  Banknote,
  CalendarCheck,
  Mail,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

const CATEGORY_CONFIG: Record<string, { icon: LucideIcon; color: string }> = {
  [ServiceCategory.Identity]: { icon: BookOpenCheck, color: 'bg-blue-500' },
  [ServiceCategory.Visa]: { icon: Globe, color: 'bg-green-500' },
  [ServiceCategory.CivilStatus]: { icon: FileText, color: 'bg-yellow-500' },
  [ServiceCategory.Registration]: { icon: BookOpen, color: 'bg-purple-500' },
  [ServiceCategory.Certification]: { icon: FileCheck, color: 'bg-orange-500' },
  [ServiceCategory.Assistance]: { icon: ShieldAlert, color: 'bg-red-500' },
  [ServiceCategory.TravelDocument]: { icon: Globe, color: 'bg-teal-500' },
  [ServiceCategory.Transcript]: { icon: FileCheck, color: 'bg-emerald-500' },
  [ServiceCategory.Other]: { icon: FileText, color: 'bg-gray-500' },
}

// Simplified service interface matching the new schema
interface ServiceInfo {
  _id: string
  title: string
  slug: string
  description: string
  content?: string
  category: string
  price?: string
  delay?: string
  validity?: string
  isUrgent?: boolean
  notes?: string
  requirements?: string[]
  actionLink?: string
  isOnline: boolean
}

interface ServiceDetailModalProps {
  service: ServiceInfo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceDetailModal({
  service,
  open,
  onOpenChange,
}: ServiceDetailModalProps) {
  const { t } = useTranslation()
  
  if (!service) return null

  const categoryKey = Object.values(ServiceCategory).includes(service.category as any) 
    ? service.category 
    : ServiceCategory.Other
    
  const categoryConfig = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG[ServiceCategory.Other]
  const CategoryIcon = categoryConfig.icon
  
  const categoryLabel = t(`services.categoriesMap.${service.category}`)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl lg:max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${categoryConfig.color}/10`}>
              <CategoryIcon className={`h-8 w-8 text-${categoryConfig.color.replace('bg-', '')}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <DialogTitle className="text-2xl">{service.title}</DialogTitle>
                {service.isUrgent && (
                  <Badge variant="destructive" className="gap-1 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Warning for Passport/Visa */}
          {([ServiceCategory.Identity, ServiceCategory.Visa, 'Identité', 'Visa'].includes(service.category as any)) && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-700 dark:text-amber-500 mb-1">
                    {t('services.passportVisaWarning.title', 'Information Importante')}
                  </h4>
                  <p className="text-muted-foreground">
                    {t('services.passportVisaWarning.message', "Les services Passeport et Visa sont de l'autorité de l'Antenne DGDI. Veuillez noter que ce n'est pas le Consulat Général qui établit les Passeports et les Visas en France.")}
                  </p>
                </div>
              </div>
          )}

          {/* Description principale */}
          <div className="text-muted-foreground prose dark:prose-invert max-w-none">
            <ReactMarkdown>{service.description}</ReactMarkdown>
          </div>

          {/* Info badges row: category, price, delay, validity */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="gap-1">
              <CategoryIcon className="h-3 w-3" />
              {categoryLabel}
            </Badge>
            {service.price && (
              <Badge className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Banknote className="h-3 w-3" />
                {service.price}
              </Badge>
            )}
            {service.delay && (
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {service.delay}
              </Badge>
            )}
            {service.validity && (
              <Badge variant="outline" className="gap-1 border-teal-500/30 text-teal-700 dark:text-teal-400">
                <CalendarCheck className="h-3 w-3" />
                Validité : {service.validity}
              </Badge>
            )}
          </div>

          {/* Notes / Important info */}
          {service.notes && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Note importante</h4>
                <p className="text-muted-foreground">{service.notes}</p>
              </div>
            </div>
          )}

          {/* Detailed content (markdown) */}
          {service.content && (
            <>
              <Separator />
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>
                  {service.content}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Bénéficiaires éligibles */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              {t('services.modal.eligibleBeneficiaries')}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1 bg-green-600 text-white">
                <CheckCircle2 className="h-3 w-3" />
                {t('services.modal.citizens')}
              </Badge>
              <Badge variant="secondary" className="gap-1 bg-blue-600 text-white">
                <CheckCircle2 className="h-3 w-3" />
                {t('services.modal.residents')}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Documents requis */}
          {(service.requirements?.length ?? 0) > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {t('services.modal.requiredDocuments')} ({service.requirements?.length})
              </h4>
              <ul className="space-y-2">
                {service.requirements?.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(service.requirements?.length ?? 0) > 0 && <Separator />}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 gap-2 w-full sm:w-auto" 
              asChild
            >
              <a href="mailto:consulatgeneralgabon@yahoo.fr?subject=Demande de renseignement" >
                <Mail className="h-4 w-4" />
                Contacter le consulat
              </a>
            </Button>
          </div>

          {/* Cross-links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/integration"
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Guide d'intégration</p>
                <p className="text-xs text-muted-foreground truncate">Conseils pratiques en France</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link
              to="/vie-en-france"
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Vie en France</p>
                <p className="text-xs text-muted-foreground truncate">Démarches préfectorales</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>

          {/* Info supplémentaire */}
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Consulat Général du Gabon
            </p>
            <p>26 bis, avenue Raphaël — 75016 Paris</p>
            <p>📧 consulatgeneralgabon@yahoo.fr</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
