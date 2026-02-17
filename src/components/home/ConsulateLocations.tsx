import { useTranslation } from 'react-i18next'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export function ConsulateLocations() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            {t('locations.badge', 'Localisation')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('locations.titlePart1', 'Nous')}{' '}
            <span className="text-gradient">
              {t('locations.titleHighlight', 'Trouver')}
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
          {/* Card Info — Main Consulate */}
          <div className="flex-1 max-w-md glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Consulat Général du Gabon</h3>
                <p className="text-muted-foreground">26 bis Avenue Raphaël</p>
                <p className="text-muted-foreground">75016 Paris, France</p>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="space-y-2 border-t border-border/50 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold w-20">Standard:</span>
                <a href="tel:+33751025292" className="text-foreground hover:text-primary transition-colors">07 51 02 52 92</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-destructive" />
                <span className="font-semibold w-20">Urgences:</span>
                <a href="tel:+33744239584" className="text-foreground hover:text-primary transition-colors">07 44 23 95 84</a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <span className="font-semibold w-24">Métro:</span>
                <span>Ranelagh (Ligne 9)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <span className="font-semibold w-24">Bus:</span>
                <span>Lignes 22, 52 (Arrêt Ranelagh)</span>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="w-full rounded-xl">
                <a href="https://www.google.com/maps/search/?api=1&query=26+bis+Avenue+Raphaël+75016+Paris" target="_blank" rel="noopener noreferrer">
                  Voir sur la carte
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card Info — DGDI Antenna */}
          <div className="flex-1 max-w-md glass-card rounded-2xl p-8 space-y-6 border-amber-500/20 dark:border-amber-500/15">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Antenne DGDI (Passeports/Visas)</h3>
                <p className="text-muted-foreground">26 bis Avenue Raphaël</p>
                <p className="text-muted-foreground">75016 Paris, France</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm italic text-muted-foreground">
                Pour les demandes de passeport et de visa exclusivement.
              </p>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <span className="font-semibold w-24">Métro:</span>
                <span>Ranelagh (Ligne 9)</span>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild variant="outline" className="w-full rounded-xl border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
                <a href="https://www.google.com/maps/search/?api=1&query=26+bis+Avenue+Raphaël+75016+Paris" target="_blank" rel="noopener noreferrer">
                  Voir sur la carte
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsulateLocations
