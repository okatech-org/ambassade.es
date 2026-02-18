import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Info, Clock, Train } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Badge } from './ui/badge'

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="p-2 rounded-xl bg-primary/10">
              <Phone className="w-5 h-5 text-primary" />
            </span>
            {t('contactModal.title', 'Contactez le Consulat')}
          </DialogTitle>
          <DialogDescription>
            {t('contactModal.description', 'Consulat Général du Gabon en France — Toutes les coordonnées')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Address */}
          <div className="flex items-start gap-3 group">
            <div className="p-2 rounded-lg bg-muted/50 shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">26 bis Avenue Raphaël</p>
              <p className="text-sm text-muted-foreground">75016 Paris, France</p>
            </div>
          </div>

          {/* Phone numbers */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{t('contactModal.phones', 'Téléphones')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">Standard</span>
                <a href="tel:+33142996862" className="text-sm font-medium text-foreground hover:text-primary transition-colors block">01 42 99 68 62</a>
                <a href="tel:+33751025292" className="text-sm font-medium text-foreground hover:text-primary transition-colors block">07 51 02 52 92</a>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-0.5">{t('contactModal.civilStatus', 'État Civil')}</span>
                <a href="tel:+33759485895" className="text-sm font-medium text-foreground hover:text-primary transition-colors block">07 59 48 58 95</a>
                <a href="tel:+33759302637" className="text-sm font-medium text-foreground hover:text-primary transition-colors block">07 59 30 26 37</a>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide block mb-0.5">{t('contactModal.emergencies24', 'Urgences 24h/24')}</span>
              <a href="tel:+33744239584" className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">07 44 23 95 84</a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <a href="mailto:contact@consulatdugabon.fr" className="text-sm font-medium text-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary underline-offset-4">
              contact@consulatdugabon.fr
            </a>
          </div>

          {/* Hours */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{t('contactModal.openingHours', "Horaires d'ouverture")}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-muted-foreground">{t('contactModal.monFri', 'Lun - Ven')}</span>
                  <Badge variant="outline" className="text-[9px] h-4 bg-primary/5 text-primary border-primary/20">{t('contactModal.deposit', 'Dépôt')}</Badge>
                </div>
                <p className="font-bold text-foreground">{t('contactModal.depositHours', '9h00 - 15h00')}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-muted-foreground">{t('contactModal.monFri', 'Lun - Ven')}</span>
                  <Badge variant="outline" className="text-[9px] h-4 bg-primary/5 text-primary border-primary/20">{t('contactModal.pickup', 'Retrait')}</Badge>
                </div>
                <p className="font-bold text-foreground">{t('contactModal.pickupHours', '15h00 - 16h30')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-accent/5 p-2 rounded-lg border border-accent/10">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>{t('contactModal.closedHolidays', 'Fermé les jours fériés chômés au Gabon et en France.')}</span>
            </div>
          </div>

          {/* Transport */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Train className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{t('contactModal.access', 'Accès')}</span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40 flex-1">
                <div className="w-7 h-7 rounded-md bg-[#62C462] text-white flex items-center justify-center font-bold text-[10px] shrink-0">M9</div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">Ranelagh</p>
                  <p className="text-muted-foreground">{t('contactModal.walkTime', '5 min à pied')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40 flex-1">
                <div className="w-7 h-7 rounded-md bg-[#0088CE] text-white flex items-center justify-center font-bold text-[10px] shrink-0">BUS</div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">{t('contactModal.busLines', 'Lignes 22, 52')}</p>
                  <p className="text-muted-foreground">{t('contactModal.busStop', 'Arrêt Ranelagh')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border/40 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.356238676231!2d2.266209376435383!3d48.85143397133145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67aaf7b7e2311%3A0x6b6e4e3e3e3e3e3e!2s26%20Bis%20Av.%20Rapha%C3%ABl%2C%2075016%20Paris!5e0!3m2!1sfr!2sfr!4v1706100000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
