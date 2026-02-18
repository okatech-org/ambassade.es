import { createFileRoute } from '@tanstack/react-router'
import { CitizenCTA } from '../components/home/CitizenCTA'
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
  MapPin,
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
        <PageHero image="/images/Consult_general.jpeg">
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
        <ConsulMessage
          firstName={consulGeneral?.firstName ?? "Le Consul"}
          lastName={consulGeneral?.lastName ?? "Général"}
          role={consulGeneral?.role ?? "Consul Général du Gabon en France"}
          description={consulGeneral?.description ?? "Diplomate de carrière, le Consul Général assure la protection et l'assistance des ressortissants gabonais en France. Il veille au renforcement des relations bilatérales entre le Gabon et la France et à la modernisation des services consulaires."}
          photoUrl={consulGeneral?.photoUrl ?? "/images/consul-general.png"}
          email={consulGeneral?.email ?? "contact@consulatdugabon.fr"}
          linkedIn={consulGeneral?.linkedIn}
        />

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




        <CitizenCTA />

      </div>


    </div>
  )
}
