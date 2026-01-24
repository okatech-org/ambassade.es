import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
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
  ExternalLink,
  Building2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { ConsulMessage } from '@/components/about/ConsulMessage'
import { TeamMemberCard } from '@/components/about/TeamMemberCard'

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
  
  // Fetch team members
  const teamMembers = useQuery(api.functions.teamMembers.list)
  const consulGeneral = useQuery(api.functions.teamMembers.getConsulGeneral)
  
  // Filter out the consul general from regular team members
  const otherMembers = teamMembers?.filter(m => !m.isConsulGeneral) || []

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Hero Section - Split Layout inspired by reference */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                  <Building2 className="w-3 h-3 mr-1" />
                  {t('leConsulat.badge', 'Institution Officielle')}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  {t('leConsulat.heroTitle', 'Notre mission est de vous')}{' '}
                  <span className="text-primary">{t('leConsulat.heroHighlight', 'accompagner')}</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  {t('leConsulat.heroDescription', 
                    "Conformément à la Convention de Vienne sur les relations consulaires, le Consulat Général du Gabon en France assure la protection et l'assistance des ressortissants gabonais, délivre les documents officiels et favorise le développement des relations entre les deux pays."
                  )}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-xl">
                    <a href="/services">
                      <FileText className="w-4 h-4 mr-2" />
                      {t('leConsulat.discoverServices', 'Découvrir nos services')}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <a href="/contact">
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('leConsulat.contactUs', 'Nous rendre visite')}
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Image collage / visual */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Main image placeholder with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden">
                    <img 
                      src="/hero-background.png" 
                      alt="Consulat du Gabon"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  
                  {/* Floating stats cards */}
                  <Card className="absolute -bottom-4 -left-4 shadow-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/20">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">60+</p>
                        <p className="text-xs text-muted-foreground">{t('leConsulat.yearsService', 'ans de service')}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="absolute -top-4 -right-4 shadow-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">1963</p>
                        <p className="text-xs text-muted-foreground">{t('leConsulat.convention', 'Convention de Vienne')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consul General Message Section */}
        {consulGeneral && (
          <ConsulMessage
            firstName={consulGeneral.firstName}
            lastName={consulGeneral.lastName}
            role={consulGeneral.role}
            description={consulGeneral.description}
            photoUrl={consulGeneral.photoUrl}
            email={consulGeneral.email}
            linkedIn={consulGeneral.linkedIn}
          />
        )}

        {/* Missions Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                {t('leConsulat.missionsBadge', 'Ce que nous faisons')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('leConsulat.missionsTitle', 'Nos Missions')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('leConsulat.missionsSubtitle', 'Les fonctions consulaires telles que définies par la Convention de Vienne de 1963')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission, index) => {
                const Icon = mission.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-transparent hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{mission.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {otherMembers.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">
                  {t('leConsulat.teamBadge', 'Notre équipe')}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t('leConsulat.teamTitle', 'Les membres de notre équipe')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('leConsulat.teamSubtitle', 'Des professionnels dévoués à votre service')}
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {otherMembers.map((member) => (
                  <TeamMemberCard
                    key={member._id}
                    firstName={member.firstName}
                    lastName={member.lastName}
                    role={member.role}
                    description={member.description}
                    photoUrl={member.photoUrl}
                    email={member.email}
                    linkedIn={member.linkedIn}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Dark background like reference */}
        <section className="py-16 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('leConsulat.ctaTitle', 'Besoin d\'assistance ?')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
              {t('leConsulat.ctaDescription', 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches consulaires.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-xl" asChild>
                <a href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  {t('leConsulat.ctaContact', 'Nous contacter')}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="tel:+33142996868">
                  <Phone className="w-4 h-4 mr-2" />
                  +33 1 42 99 68 68
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {t('leConsulat.contactTitle', 'Informations Pratiques')}
              </h2>
              <p className="text-muted-foreground">
                {t('leConsulat.contactSubtitle', 'Retrouvez toutes nos coordonnées')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Address and hours */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {t('leConsulat.addressTitle', 'Adresse & Horaires')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">Consulat Général du Gabon</p>
                    <p className="text-muted-foreground">26 bis Avenue Raphaël</p>
                    <p className="text-muted-foreground">75016 Paris, France</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Lundi - Vendredi : 9h00 - 16h00</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href="https://maps.google.com/?q=26+bis+Avenue+Raphaël+75016+Paris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('leConsulat.viewMap', 'Voir sur Google Maps')}
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    {t('leConsulat.contactInfo', 'Coordonnées')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone principal</p>
                        <a href="tel:+33142996868" className="font-medium text-foreground hover:text-primary transition-colors">
                          +33 1 42 99 68 68
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Consulat direct</p>
                        <a href="tel:+33142996857" className="font-medium text-foreground hover:text-primary transition-colors">
                          +33 1 42 99 68 57/58
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:consulatgeneral@ambagabon.org" className="font-medium text-foreground hover:text-primary transition-colors">
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
      </div>

      <Footer />
    </div>
  )
}
