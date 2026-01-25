import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Clock, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Header */}
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('contact.title', 'Nous contacter')}</h1>
            <p className="text-primary-foreground/80 max-w-2xl text-lg">
              {t('contact.subtitle', "Retrouvez toutes les informations pour nous joindre et vous rendre au Consulat.")}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Column */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Consulat General */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Info className="w-6 h-6" />
                            </span>
                            Consulat Général
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Coordonnées</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                                        <div>
                                            <p className="text-foreground font-medium">26 bis Avenue Raphaël</p>
                                            <p>75016 Paris, France</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <Phone className="w-5 h-5 mt-0.5 text-primary" />
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-muted-foreground w-16">Cabinet:</span>
                                                <a href="tel:+33189718243" className="text-foreground hover:text-primary transition-colors">+33 1 89 71 82 43</a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-muted-foreground w-16">Standard:</span>
                                                <a href="tel:+33189719298" className="text-foreground hover:text-primary transition-colors">+33 1 89 71 92 98</a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-red-500 w-16">Urgences:</span>
                                                <a href="tel:+33189719299" className="text-foreground hover:text-primary transition-colors">+33 1 89 71 92 99</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Mail className="w-5 h-5 text-primary" />
                                        <a href="mailto:contact@consulatdugabon.fr" className="hover:text-primary transition-colors break-all">contact@consulatdugabon.fr</a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Horaires d'ouverture
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between py-1 border-b border-border/50">
                                        <span>Lundi - Vendredi</span>
                                        <span className="font-medium">9h00 - 15h00 (Dépôt)</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-border/50">
                                        <span>Lundi - Vendredi</span>
                                        <span className="font-medium">15h00 - 16h30 (Retrait)</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 italic">
                                        Fermé les jours fériés gabonais et français.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* DGDI */}
                <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/30 dark:bg-orange-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <span className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <Info className="w-6 h-6" />
                            </span>
                            Service Passeports & Visas (DGDI)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Contact Spécifique</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <MapPin className="w-5 h-5 mt-0.5 text-orange-500" />
                                        <div>
                                            <p className="text-foreground font-medium">26 bis Avenue Raphaël</p>
                                            <p>75016 Paris (Entrée dédiée)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Phone className="w-5 h-5 text-orange-500" />
                                        <a href="tel:+33608032029" className="hover:text-orange-600 transition-colors">+33 6 08 03 20 29 (SMS)</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Mail className="w-5 h-5 text-orange-500" />
                                        <a href="mailto:aedgdi.fr@gmail.com" className="hover:text-orange-600 transition-colors break-all">aedgdi.fr@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                             <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    Horaires Spécifiques
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between py-1 border-b border-orange-200/50 dark:border-orange-800/50">
                                        <span>Dépôt Visa (Lun-Jeu)</span>
                                        <span className="font-medium">9h00 - 11h30</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-orange-200/50 dark:border-orange-800/50">
                                        <span>Retrait Passeport</span>
                                        <span className="font-medium">15h00 - 16h15</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Button size="sm" asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                        <a href="https://ae.dgdifrance.fr/booking/" target="_blank" rel="noopener noreferrer">
                                            Prendre Rendez-vous
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Transport & Map Column */}
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Accès & Transport</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="aspect-square w-full rounded-xl bg-muted overflow-hidden relative">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.356238676231!2d2.266209376435383!3d48.85143397133145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67aaf7b7e2311%3A0x6b6e4e3e3e3e3e3e!2s26%20Bis%20Av.%20Rapha%C3%ABl%2C%2075016%20Paris!5e0!3m2!1sfr!2sfr!4v1706100000000!5m2!1sfr!2sfr" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs">
                                    M
                                </div>
                                <div>
                                    <p className="font-medium">Métro Ligne 9</p>
                                    <p className="text-sm text-muted-foreground">Arrêt Ranelagh (5 min à pied)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                                    BUS
                                </div>
                                <div>
                                    <p className="font-medium">Bus 22, 52</p>
                                    <p className="text-sm text-muted-foreground">Arrêt Ranelagh</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-xs">
                                    P
                                </div>
                                <div>
                                    <p className="font-medium">Stationnement</p>
                                    <p className="text-sm text-muted-foreground">Parking payant sur voie publique</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  )
}
