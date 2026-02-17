import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/PageHero'


export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <PageHero image="/images/heroes/hero-contact.png">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
            Contact
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {t('contact.title', 'Nous')}{' '}
            <span className="text-gradient hover:animate-shimmer bg-[length:200%_auto]">{t('contact.titleHighlight', 'contacter')}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            {t('contact.subtitle', "Retrouvez toutes les informations pour nous joindre et vous rendre au Consulat.")}
          </p>
      </PageHero>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Column */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Consulat General */}
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-6 md:p-8 bg-primary/5 border-b border-border/40">
                        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground">
                            <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                <Info className="w-6 h-6" />
                            </span>
                            Consulat Général
                        </h2>
                    </div>
                    <div className="p-6 md:p-8 space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-semibold text-lg text-foreground border-l-4 border-primary pl-3">Coordonnées</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 group">
                                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-foreground font-medium">26 bis Avenue Raphaël</p>
                                            <p className="text-muted-foreground">75016 Paris, France</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 group">
                                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="space-y-3 w-full">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg hover:bg-muted/40 transition-colors -ml-2 border border-transparent hover:border-border/30">
                                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Standard</span>
                                                <div className="flex flex-col items-end gap-1">
                                                  <a href="tel:+33142996862" className="text-foreground font-medium hover:text-primary transition-colors">01 42 99 68 62</a>
                                                  <a href="tel:+33751025292" className="text-foreground font-medium hover:text-primary transition-colors">07 51 02 52 92</a>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg hover:bg-muted/40 transition-colors -ml-2 border border-transparent hover:border-border/30">
                                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">État Civil</span>
                                                <div className="flex flex-col items-end gap-1">
                                                  <a href="tel:+33759485895" className="text-foreground font-medium hover:text-primary transition-colors">07 59 48 58 95</a>
                                                  <a href="tel:+33759302637" className="text-foreground font-medium hover:text-primary transition-colors">07 59 30 26 37</a>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-red-500/5 border border-red-500/10 -ml-2">
                                                <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Urgences</span>
                                                <a href="tel:+33744239584" className="text-red-600 dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300 transition-colors">07 44 23 95 84</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <a href="mailto:contact@consulatdugabon.fr" className="text-foreground hover:text-primary transition-colors font-medium break-all underline decoration-border hover:decoration-primary underline-offset-4">contact@consulatdugabon.fr</a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-semibold text-lg text-foreground border-l-4 border-primary pl-3 flex items-center gap-2">
                                    Horaires d'ouverture
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-muted-foreground">Lundi - Vendredi</span>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Dépôt</Badge>
                                        </div>
                                        <p className="font-bold text-lg text-foreground">9h00 - 15h00</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-muted-foreground">Lundi - Vendredi</span>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Retrait</Badge>
                                        </div>
                                        <p className="font-bold text-lg text-foreground">15h00 - 16h30</p>
                                    </div>
                                    <div className="flex items-start gap-2 mt-4 text-xs text-muted-foreground bg-accent/5 p-3 rounded-lg border border-accent/10">
                                        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                        <span>Fermé les jours fériés chômés au Gabon et en France.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Transport & Map Column */}
            {/* Transport & Map Column */}
            <div className="space-y-8">
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <div className="p-6 border-b border-border/40 bg-muted/20">
                        <h2 className="text-xl font-bold text-foreground">Accès & Transport</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="aspect-square w-full rounded-2xl bg-muted overflow-hidden relative shadow-inner ring-1 ring-black/5 dark:ring-white/10">
                             <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.356238676231!2d2.266209376435383!3d48.85143397133145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67aaf7b7e2311%3A0x6b6e4e3e3e3e3e3e!2s26%20Bis%20Av.%20Rapha%C3%ABl%2C%2075016%20Paris!5e0!3m2!1sfr!2sfr!4v1706100000000!5m2!1sfr!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                                <div className="w-10 h-10 rounded-lg bg-[#62C462] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                    M9
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Métro Ligne 9</p>
                                    <p className="text-xs text-muted-foreground">Arrêt Ranelagh (5 min à pied)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                                <div className="w-10 h-10 rounded-lg bg-[#0088CE] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                    BUS
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Bus 22, 52</p>
                                    <p className="text-xs text-muted-foreground">Arrêt Ranelagh</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                                <div className="w-10 h-10 rounded-lg bg-gray-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                    P
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Stationnement</p>
                                    <p className="text-xs text-muted-foreground">Parking payant sur voie publique</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
