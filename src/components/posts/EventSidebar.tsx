import { Calendar, MapPin, Clock, Ticket, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="sticky top-24 overflow-hidden border-2 border-primary/20">
      {/* Date Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <div className="text-5xl font-bold">{dateInfo.day}</div>
        <div className="text-lg font-medium">{dateInfo.month}</div>
        <div className="text-sm opacity-75">{dateInfo.year}</div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        {/* Full Date */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {formatEventDate(eventDate)}
            </div>
            {eventEndDate && eventEndDate !== eventDate && (
              <div className="text-sm text-muted-foreground">
                au {formatEventDate(eventEndDate)}
              </div>
            )}
          </div>
        </div>
        
        {/* Time */}
        {eventTime && (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <span className="font-medium">{eventTime}</span>
          </div>
        )}
        
        {/* Location */}
        {eventLocation && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="font-medium">{eventLocation}</div>
              {eventAddress && (
                <div className="text-sm text-muted-foreground">{eventAddress}</div>
              )}
              {eventMapLink && (
                <a 
                  href={eventMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1"
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
          <div className="flex items-center gap-3">
            <Ticket className="w-5 h-5 text-primary shrink-0" />
            <span className={`font-medium ${isFree ? 'text-green-600' : ''}`}>
              {ticketPrice}
            </span>
          </div>
        )}
        
        <Separator className="my-4" />
        
        {/* Action Button */}
        {ticketLink ? (
          <Button asChild className="w-full" size="lg">
            <a href={ticketLink} target="_blank" rel="noopener noreferrer">
              <Ticket className="w-4 h-4 mr-2" />
              Réserver une place
            </a>
          </Button>
        ) : (
          <Button className="w-full" size="lg" variant="outline" disabled>
            <Calendar className="w-4 h-4 mr-2" />
            Entrée libre
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
