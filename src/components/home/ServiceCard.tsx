import { Clock, type LucideIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  color?: string
  badge?: string
  delay?: string
  onInfoClick?: () => void
} 

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'bg-primary/10 text-primary',
  badge,
  delay,
  onInfoClick,
}: ServiceCardProps) {

  return (
    <div className="glass-card p-6 h-full flex flex-col group hover:border-primary/30 transition-all duration-300">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm border-border/50">
              {badge}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-1">
          {description}
        </p>

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
              Information
            </button>
            <a 
              href="https://consulat.ga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors text-center"
            >
              Faire la demande
            </a>
          </div>
        </div>
    </div>
  )
}

export default ServiceCard
