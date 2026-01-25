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
  Download,
  CheckCircle2,
  Users,
  BookOpenCheck,
  Globe,
  BookOpen,
  FileCheck,
  ShieldAlert,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CATEGORY_CONFIG: Record<string, { icon: LucideIcon; color: string }> = {
  [ServiceCategory.Identity]: { icon: BookOpenCheck, color: 'bg-blue-500' },
  [ServiceCategory.Visa]: { icon: Globe, color: 'bg-green-500' },
  [ServiceCategory.CivilStatus]: { icon: FileText, color: 'bg-yellow-500' },
  [ServiceCategory.Registration]: { icon: BookOpen, color: 'bg-purple-500' },
  [ServiceCategory.Certification]: { icon: FileCheck, color: 'bg-orange-500' },
  [ServiceCategory.Assistance]: { icon: ShieldAlert, color: 'bg-red-500' },
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
  requirements: string[]
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
              <DialogTitle className="text-2xl">{service.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description principale (moved from header) */}
          <div className="text-muted-foreground prose dark:prose-invert max-w-none">
            <ReactMarkdown>{service.description}</ReactMarkdown>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1">
              <CategoryIcon className="h-3 w-3" />
              {categoryLabel}
            </Badge>
            {service.delay && (
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {service.delay}
              </Badge>
            )}
            {service.price && (
              <Badge variant="outline" className="gap-1">
                {service.price}
              </Badge>
            )}
          </div>

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
          {service.requirements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {t('services.modal.requiredDocuments')} ({service.requirements.length})
              </h4>
              <ul className="space-y-2">
                {service.requirements.map((doc, index) => (
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

          {service.requirements.length > 0 && <Separator />}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {service.actionLink && (
              <Button
                variant="outline"
                className="flex-1 gap-2"
                asChild
              >
                <a href={service.actionLink} target="_blank" rel="noopener noreferrer">
                  {service.actionLink.endsWith('.pdf') ? (
                    <>
                      <Download className="h-4 w-4" />
                      {t('services.modal.downloadForm')}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      {t('services.modal.accessService', 'Accéder au service')}
                    </>
                  )}
                </a>
              </Button>
            )}
            <Button 
              className="flex-1 gap-2" 
              disabled
              title={t('services.modal.requestDisabled', 'Les demandes en ligne seront bientôt disponibles')}
            >
              <FileText className="h-4 w-4" />
              {t('services.modal.createRequest')}
            </Button>
          </div>

          {/* Info supplémentaire */}
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">{t('services.modal.importantInfo')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('services.modal.infoPoints.docs')}</li>
              <li>{t('services.modal.infoPoints.delay')}</li>
              <li>{t('services.modal.infoPoints.identity')}</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

