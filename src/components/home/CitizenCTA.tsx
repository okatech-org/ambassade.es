import { useTranslation } from 'react-i18next'
import {
  CheckCircle2,
  Shield,
  Bell,
  Vote,
  ExternalLink,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'

export function CitizenCTA() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t('citizenCta.benefits.protection.title', 'Protection consulaire'),
      description: t('citizenCta.benefits.protection.description', 'Bénéficiez de l\'assistance en cas de difficulté'),
    },
    {
      icon: CheckCircle2,
      title: t('citizenCta.benefits.documents.title', 'Renouvellement facilité'),
      description: t('citizenCta.benefits.documents.description', 'Simplifiez vos démarches de documents'),
    },
    {
      icon: Bell,
      title: t('citizenCta.benefits.info.title', 'Informations officielles'),
      description: t('citizenCta.benefits.info.description', 'Recevez les communications du consulat'),
    },
    {
      icon: Vote,
      title: t('citizenCta.benefits.vote.title', 'Participation électorale'),
      description: t('citizenCta.benefits.vote.description', 'Exercez votre droit de vote depuis la France'),
    },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
              {t('citizenCta.badge', 'Inscription Consulaire')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('citizenCta.title', 'Inscrivez-vous au Registre Consulaire')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('citizenCta.description', 'L\'inscription au registre des Gabonais de l\'étranger vous permet de bénéficier de la protection consulaire et facilite vos démarches administratives. Cette procédure s\'effectue en ligne sur le portail officiel.')}
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button asChild size="lg" className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20">
              <a href="https://www.consulat.ga/sign-up" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                {t('citizenCta.cta', 'S\'inscrire sur consulat.ga')}
              </a>
            </Button>
          </div>

          {/* Illustration Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <Card className="relative p-8 shadow-2xl rounded-3xl">
              <CardContent className="p-0 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t('citizenCta.cardTitle', 'Carte Consulaire')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('citizenCta.cardDescription', 'Document officiel attestant de votre immatriculation auprès du Consulat Général du Gabon en France.')}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('citizenCta.cardNote', 'Démarche gratuite')}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CitizenCTA
