import { Calendar, MapPin, Clock, Ticket, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface EventSidebarProps {
  eventDate?: number
  eventEndDate?: number
  eventTime?: string
  eventLocation?: string
  eventAddress?: string
  eventMapLink?: string
  ticketLink?: string
  ticketPrice?: string
}

function formatEventDate(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp))
}

function formatEventDateShort(timestamp: number) {
  const date = new Date(timestamp)
  return {
    day: date.getDate(),
    month: new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(date).toUpperCase(),
    year: date.getFullYear(),
  }
}

export function EventSidebar({
  eventDate,
  eventEndDate,
  eventTime,
  eventLocation,
  eventAddress,
  eventMapLink,
  ticketLink,
  ticketPrice,
}: EventSidebarProps) {
  if (!eventDate) return null

  const dateInfo = formatEventDateShort(eventDate)
  const isFree = !ticketPrice || ticketPrice.toLowerCase() === 'gratuit'

  return (
    <div className="glass-card sticky top-24 overflow-hidden rounded-2xl shadow-lg border-primary/20">
      {/* Date Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 text-center backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 blur-2xl" />
        <div className="relative z-10">
            <div className="text-5xl font-bold mb-1 tracking-tight">{dateInfo.day}</div>
            <div className="text-xl font-medium uppercase tracking-widest opacity-90">{dateInfo.month}</div>
            <div className="text-sm opacity-75 mt-1 font-light">{dateInfo.year}</div>
        </div>
      </div>
      
      <div className="p-6 space-y-5">
        {/* Full Date */}
        <div className="flex items-start gap-4 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-foreground">
              {formatEventDate(eventDate)}
            </div>
            {eventEndDate && eventEndDate !== eventDate && (
              <div className="text-sm text-muted-foreground mt-0.5">
                au {formatEventDate(eventEndDate)}
              </div>
            )}
          </div>
        </div>
        
        {/* Time */}
        {eventTime && (
          <div className="flex items-center gap-4 group">
             <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">{eventTime}</span>
          </div>
        )}
        
        {/* Location */}
        {eventLocation && (
          <div className="flex items-start gap-4 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
               <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-foreground">{eventLocation}</div>
              {eventAddress && (
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{eventAddress}</div>
              )}
              {eventMapLink && (
                <a 
                  href={eventMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-2 uppercase tracking-wide transition-colors"
                >
                  Voir sur la carte
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Price */}
        {ticketPrice && (
          <div className="flex items-center gap-4 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <span className={`font-bold ${isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
              {ticketPrice}
            </span>
          </div>
        )}
        
        <Separator className="my-2 bg-border/50" />
        
        {/* Action Button */}
        {ticketLink ? (
          <Button asChild className="w-full shadow-md hover:shadow-lg transition-all" size="lg">
            <a href={ticketLink} target="_blank" rel="noopener noreferrer">
              <Ticket className="w-4 h-4 mr-2" />
              Réserver une place
            </a>
          </Button>
        ) : (
          <Button className="w-full opacity-80" size="lg" variant="secondary" disabled>
            <Calendar className="w-4 h-4 mr-2" />
            Entrée libre
          </Button>
        )}
      </div>
    </div>
  )
}
