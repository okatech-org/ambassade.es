import { Clock, type LucideIcon, AlertTriangle, Banknote, CalendarCheck } from 'lucide-react'
import { Badge } from '../ui/badge'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  color?: string
  badge?: string
  delay?: string
  price?: string
  validity?: string
  isUrgent?: boolean
  greenHighlight?: boolean
  onInfoClick?: () => void
} 

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'bg-primary/10 text-primary',
  badge,
  delay,
  price,
  validity,
  isUrgent,
  greenHighlight,
  onInfoClick,
}: ServiceCardProps) {

  return (
    <div className={`glass-card p-6 h-full flex flex-col group hover:border-primary/30 transition-all duration-300 ${isUrgent ? 'border-red-500/30 hover:border-red-500/50' : ''} ${greenHighlight ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-400/50' : ''}`}>
        {/* Header with icon and badges */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {isUrgent && (
              <Badge variant="destructive" className="text-xs gap-1 animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Urgent
              </Badge>
            )}
            {badge && (
              <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm border-border/50">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Price & Validity row */}
        {(price || validity) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {price && (
              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                <Banknote className="w-4 h-4" />
                <span>{price}</span>
              </div>
            )}
            {validity && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Validité : {validity}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer with delay and buttons */}
        <div className="mt-auto space-y-4 pt-4 border-t border-border/30">
          {delay && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>{delay}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onInfoClick}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
            >
              📋 Voir la fiche
            </button>
            <a 
              href="https://www.consulat.ga/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors text-center"
            >
              Faire la démarche
            </a>
          </div>
        </div>
    </div>
  )
}

export default ServiceCard

