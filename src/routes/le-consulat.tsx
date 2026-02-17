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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'

import { ConsulMessage } from '@/components/about/ConsulMessage'
import { TeamMemberCard } from '@/components/about/TeamMemberCard'

export const Route = createFileRoute('/le-consulat')({
  component: LeConsulatPage,
})

const missions = [
  {
    icon: Shield,
    title: "Protection des ressortissants",
    description: "Protection des intérêts de l'État gabonais et de ses ressortissants en France, conformément à la Convention de Vienne de 1963 (art. 5). Assistance aux détenus, victimes d'accidents, et accompagnement en cas de décès ou de rapatriement.",
  },
  {
    icon: Globe,
    title: "Relations internationales",
    description: "Développement des relations commerciales, économiques, culturelles et scientifiques entre le Gabon et la France. Promotion de la coopération bilatérale et de la diplomatie économique.",
  },
  {
    icon: FileText,
    title: "Documents officiels",
    description: "Délivrance de passeports, visas, titres de voyage et documents de circulation. Légalisation et certification de documents administratifs officiels pour les ressortissants et visiteurs.",
  },
  {
    icon: Users,
    title: "État Civil",
    description: "Fonctions d'Officier d'État Civil : enregistrement des naissances, célébration de mariages, déclaration de décès et transcription d'actes. Service de l'état civil pour la communauté gabonaise.",
  },
  {
    icon: Gavel,
    title: "Actes notariés & administratifs",
    description: "Fonctions notariales pour les actes authentiques, procurations, certificats de vie, légalisations de signatures et de documents. Rédaction et certification d'actes administratifs.",
  },
  {
    icon: Plane,
    title: "Assistance d'urgence",
    description: "Secours et assistance aux ressortissants gabonais en difficulté : aide aux détenus, victimes d'accidents ou de catastrophes, organisation de rapatriements et aide d'urgence.",
  },
  {
    icon: Gavel,
    title: "Fonctions judiciaires",
    description: "Transmission d'actes judiciaires et extrajudiciaires, exécution de commissions rogatoires selon les conventions internationales. Facilitation des démarches juridiques entre la France et le Gabon.",
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
        {/* Hero Section */}
        <PageHero image="/images/heroes/hero-consulat.png">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            {t('leConsulat.badge', 'Institution Officielle')}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {t('leConsulat.heroTitle', 'Notre mission est de vous')}{' '}
            <span className="text-gradient">{t('leConsulat.heroHighlight', 'accompagner')}</span>
          </h1>

          <p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {t('leConsulat.heroDescription',
              "Conformément à la Convention de Vienne sur les relations consulaires, le Consulat Général du Gabon en France assure la protection et l'assistance des ressortissants gabonais, délivre les documents officiels et favorise le développement des relations entre les deux pays."
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
              <a href="/services">
                <FileText className="w-4 h-4 mr-2" />
                {t('leConsulat.discoverServices', 'Découvrir nos services')}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-8 bg-background/50 hover:bg-accent/10">
              <a href="/contact">
                <MapPin className="w-4 h-4 mr-2" />
                {t('leConsulat.contactUs', 'Nous rendre visite')}
              </a>
            </Button>
          </div>
        </PageHero>

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
        <section className="py-12 md:py-24 px-4 md:px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
                {t('leConsulat.missionsBadge', 'Ce que nous faisons')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('leConsulat.missionsTitle', 'Nos Missions')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('leConsulat.missionsSubtitle', 'Les fonctions consulaires telles que définies par la Convention de Vienne de 1963')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {missions.map((mission, index) => {
                const Icon = mission.icon
                return (
                  <div key={index} className="group glass-card rounded-2xl p-5 md:p-8 hover:-translate-y-2 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{mission.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {otherMembers.length > 0 && (
          <section className="py-12 md:py-16 px-4 md:px-6">
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
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
          {/* Background gradient/image replacement for solid primary */}
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gabon-blue/20 rounded-full blur-[100px] animate-pulse-glow" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-green/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="glass-panel p-6 md:p-10 lg:p-16 rounded-3xl border-primary/20 shadow-2xl shadow-primary/5">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                {t('leConsulat.ctaTitle', 'Besoin d\'assistance ?')}
              </h2>
              <p className="text-muted-foreground mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {t('leConsulat.ctaDescription', 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches consulaires.')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
                  <a href="/contact">
                    <Mail className="w-5 h-5 mr-2" />
                    {t('leConsulat.ctaContact', 'Nous contacter')}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base bg-background/50 hover:bg-accent/10 border-foreground/10" asChild>
                  <a href="tel:+33751025292">
                    <Phone className="w-5 h-5 mr-2" />
                    07 51 02 52 92
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('leConsulat.contactTitle', 'Informations Pratiques')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('leConsulat.contactSubtitle', 'Retrouvez toutes nos coordonnées')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Address and hours */}
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary/5 p-6 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">
                      {t('leConsulat.addressTitle', 'Adresse & Horaires')}
                    </h3>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Consulat Général du Gabon</p>
                    <p className="text-muted-foreground">26 bis Avenue Raphaël</p>
                    <p className="text-muted-foreground">75016 Paris, France</p>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground p-4 rounded-xl bg-muted/40">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Lundi - Vendredi : 9h00 - 16h00</span>
                  </div>
                  <Button asChild variant="outline" className="w-full h-12 rounded-xl text-base hover:bg-primary/5 hover:border-primary/30">
                    <a
                      href="https://maps.google.com/?q=26+bis+Avenue+Raphaël+75016+Paris"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('leConsulat.viewMap', 'Voir sur Google Maps')}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact */}
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary/5 p-6 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">
                      {t('leConsulat.contactInfo', 'Coordonnées')}
                    </h3>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-0.5">Standard</p>
                        <div className="space-y-1">
                          <a href="tel:+33142996862" className="font-medium text-foreground hover:text-primary transition-colors text-lg block">
                            01 42 99 68 62
                          </a>
                          <a href="tel:+33751025292" className="font-medium text-foreground hover:text-primary transition-colors text-lg block">
                            07 51 02 52 92
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-0.5">État Civil</p>
                        <div className="space-y-1">
                          <a href="tel:+33759485895" className="font-medium text-foreground hover:text-primary transition-colors text-lg block">
                            07 59 48 58 95
                          </a>
                          <a href="tel:+33759302637" className="font-medium text-foreground hover:text-primary transition-colors text-lg block">
                            07 59 30 26 37
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors bg-red-500/5 border border-red-500/10">
                      <Phone className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <p className="text-sm text-red-500/80 mb-0.5">Urgences</p>
                        <a href="tel:+33744239584" className="font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-lg">
                          07 44 23 95 84
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-0.5">Email</p>
                        <a href="mailto:contact@consulatdugabon.fr" className="font-medium text-foreground hover:text-primary transition-colors">
                          contact@consulatdugabon.fr
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


    </div>
  )
}
