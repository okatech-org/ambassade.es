import {
  Info,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Compact sidebar version of the DGDI Passeports & Visas info panel.
 * Designed to sit alongside (and match the width of) the category filter panel.
 */
export function DGDIServiceBanner() {
  return (
    <div className="dgdi-banner rounded-2xl border border-orange-500/20 overflow-hidden" id="dgdi-service-banner">
      {/* Subtle gradient overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-transparent to-orange-900/20 pointer-events-none" />

        <div className="relative z-10 p-5">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 shrink-0">
              <Info className="w-4 h-4 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-white leading-tight">
              Service Passeports & Visas{' '}
              <span className="text-orange-400">(DGDI)</span>
            </h3>
          </div>

          {/* Contact Spécifique */}
          <div className="mb-5">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-orange-300/70 mb-3 flex items-center gap-1.5">
              <span className="w-0.5 h-3.5 rounded-full bg-orange-500 inline-block" />
              Contact Spécifique
            </h4>

            <div className="space-y-2.5">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/15 shrink-0">
                  <MapPin className="w-3 h-3 text-orange-400" />
                </div>
                <div>
                  <p className="text-white/90 text-xs font-medium leading-relaxed">
                    26 bis Avenue Raphaël
                  </p>
                  <p className="text-white/50 text-[11px]">
                    75016 Paris (Entrée dédiée)
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/15 shrink-0">
                  <Phone className="w-3 h-3 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <a
                    href="tel:+33608032029"
                    className="text-white/90 text-xs font-medium hover:text-orange-300 transition-colors"
                  >
                    +33 6 08 03 20 29
                  </a>
                  <p className="text-white/35 text-[10px]">(SMS uniquement)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/15 shrink-0">
                  <Mail className="w-3 h-3 text-orange-400" />
                </div>
                <a
                  href="mailto:aedgdi.fr@gmail.com"
                  className="text-orange-400 text-xs font-medium underline underline-offset-2 decoration-orange-400/30 hover:decoration-orange-400/80 transition-all truncate"
                >
                  aedgdi.fr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-orange-500/10 mb-5" />

          {/* Horaires Spécifiques */}
          <div className="mb-5">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-orange-300/70 mb-3 flex items-center gap-1.5">
              <span className="w-0.5 h-3.5 rounded-full bg-orange-500 inline-block" />
              Horaires Spécifiques
            </h4>

            <div className="space-y-2.5">
              {/* Dépôt Visa */}
              <div className="dgdi-schedule-card flex items-center justify-between rounded-xl border border-orange-500/15 bg-orange-500/5 px-3 py-2.5 hover:border-orange-500/30 transition-all duration-300">
                <div>
                  <p className="text-white/50 text-[10px] font-medium mb-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    Dépôt Visa (Lun-Jeu)
                  </p>
                  <p className="text-white text-sm font-bold tracking-tight">
                    9h00 – 11h30
                  </p>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                  Matin
                </span>
              </div>

              {/* Retrait Passeport */}
              <div className="dgdi-schedule-card flex items-center justify-between rounded-xl border border-orange-500/15 bg-orange-500/5 px-3 py-2.5 hover:border-orange-500/30 transition-all duration-300">
                <div>
                  <p className="text-white/50 text-[10px] font-medium mb-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    Retrait Passeport
                  </p>
                  <p className="text-white text-sm font-bold tracking-tight">
                    15h00 – 16h15
                  </p>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full border border-orange-500/20">
                  Après-midi
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="sm"
            className="w-full h-10 rounded-xl text-xs font-bold gap-1.5 bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/15 hover:shadow-orange-500/25 transition-all duration-300"
            asChild
          >
            <a
              href="https://www.rdv360.com/dgdi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre Rendez-vous DGDI
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
