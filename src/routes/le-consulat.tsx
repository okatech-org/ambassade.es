import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { 
  Shield, 
  Globe, 
  FileText, 
  Users, 
  Gavel, 
  Plane,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/le-consulat')({
  component: LeConsulatPage,
})

const missions = [
  {
    icon: Shield,
    title: "Protection des ressortissants",
    description: "Protection des intérêts de l'État gabonais et assistance aux ressortissants gabonais en France.",
  },
  {
    icon: Globe,
    title: "Relations internationales",
    description: "Développement des relations commerciales, économiques, culturelles et scientifiques entre le Gabon et la France.",
  },
  {
    icon: FileText,
    title: "Documents officiels",
    description: "Délivrance de passeports, visas, titres de voyage et autres documents officiels aux ressortissants et visiteurs.",
  },
  {
    icon: Users,
    title: "État Civil",
    description: "Fonctions d'Officier d'État Civil : mariages, naissances, décès, transcriptions d'actes.",
  },
  {
    icon: Gavel,
    title: "Actes notariés",
    description: "Fonctions de notaire pour les actes authentiques et légalisations de documents.",
  },
  {
    icon: Plane,
    title: "Assistance d'urgence",
    description: "Secours et assistance aux ressortissants gabonais en difficulté sur le territoire français.",
  },
]

function LeConsulatPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {t('leConsulat.badge', 'Institution')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('leConsulat.title', 'Le Consulat Général')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('leConsulat.subtitle', 'Représentation officielle de la République Gabonaise en France, au service des citoyens gabonais et des relations bilatérales.')}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed">
                  {t('leConsulat.intro', 
                    "Conformément à la Convention de Vienne sur les relations consulaires de 1963, le Consulat Général du Gabon en France assure la protection et l'assistance des ressortissants gabonais, délivre les documents officiels, et favorise le développement des relations entre les deux pays."
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Missions */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {t('leConsulat.missionsTitle', 'Nos Missions')}
              </h2>
              <p className="text-muted-foreground">
                {t('leConsulat.missionsSubtitle', 'Les fonctions consulaires telles que définies par la Convention de Vienne')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission, index) => {
                const Icon = mission.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Coordonnées */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {t('leConsulat.contactTitle', 'Nous Contacter')}
              </h2>
              <p className="text-muted-foreground">
                {t('leConsulat.contactSubtitle', 'Informations pratiques et coordonnées du Consulat')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Adresse et horaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {t('leConsulat.addressTitle', 'Adresse & Horaires')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">Consulat Général du Gabon</p>
                    <p className="text-muted-foreground">26 bis Avenue Raphaël</p>
                    <p className="text-muted-foreground">75016 Paris, France</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Lundi - Vendredi : 9h00 - 16h00</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href="https://maps.google.com/?q=26+bis+Avenue+Raphaël+75016+Paris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('leConsulat.viewMap', 'Voir sur la carte')}
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    {t('leConsulat.contactInfo', 'Coordonnées')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone principal</p>
                        <a href="tel:+33142996868" className="font-medium text-foreground hover:text-primary">
                          +33 1 42 99 68 68
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Consulat direct</p>
                        <a href="tel:+33142996857" className="font-medium text-foreground hover:text-primary">
                          +33 1 42 99 68 57/58
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:consulatgeneral@ambagabon.org" className="font-medium text-foreground hover:text-primary">
                          consulatgeneral@ambagabon.org
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services rapides - CTA */}
        <section className="py-12 px-6 bg-primary/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {t('leConsulat.servicesTitle', 'Nos Services')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('leConsulat.servicesDesc', 'Découvrez l\'ensemble des démarches et services proposés par le Consulat.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/services">
                  <FileText className="w-4 h-4 mr-2" />
                  {t('leConsulat.viewServices', 'Voir tous les services')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  {t('leConsulat.contactUs', 'Nous contacter')}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
