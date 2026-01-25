import { useTranslation } from 'react-i18next'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'




export function ConsulateLocations() {
  const { t } = useTranslation()

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary">
            {t('locations.badge', 'Localisation')}
          </Badge>
          <h2 className="text-3xl md:text-3xl font-bold text-foreground mb-3">
            {t('locations.title', 'Nous trouver')}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {/* Card Info */}
          <Card className="flex-1 max-w-md">
            <CardContent className="p-8 space-y-6">
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
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-semibold w-20">Standard:</span>
                  <a href="tel:+33189719298" className="text-foreground hover:text-primary transition-colors">+33 1 89 71 92 98</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="font-semibold w-20">Urgences:</span>
                  <a href="tel:+33189719299" className="text-foreground hover:text-primary transition-colors">+33 1 89 71 92 99</a>
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
                    <Button asChild className="w-full">
                        <a href="https://www.google.com/maps/search/?api=1&query=26+bis+Avenue+Raphaël+75016+Paris" target="_blank" rel="noopener noreferrer">
                            Voir sur la carte
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
               </div>
            </CardContent>
          </Card>

           {/* Card Info Visa (Antenne DGDI) - IMPORTANT */}
          <Card className="flex-1 max-w-md border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
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
                    <Button asChild variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-800 dark:text-orange-400">
                        <a href="https://www.google.com/maps/search/?api=1&query=26+bis+Avenue+Raphaël+75016+Paris" target="_blank" rel="noopener noreferrer">
                            Voir sur la carte
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ConsulateLocations
