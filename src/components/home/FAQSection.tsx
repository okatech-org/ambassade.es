import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface FAQItem {
  questionKey: string
  answerKey: string
  defaultQuestion: string
  defaultAnswer: string
}

const faqItems: FAQItem[] = [
  {
    questionKey: 'faq.items.inscription.question',
    answerKey: 'faq.items.inscription.answer',
    defaultQuestion: 'Comment m\'inscrire au registre consulaire ?',
    defaultAnswer: 'L\'inscription se fait en ligne sur consulat.ga ou en personne au consulat. Munissez-vous de votre passeport valide, d\'un justificatif de domicile en France de moins de 3 mois, et de 2 photos d\'identité. La procédure est gratuite et vous donne accès à la protection consulaire.',
  },
  {
    questionKey: 'faq.items.passeport.question',
    answerKey: 'faq.items.passeport.answer',
    defaultQuestion: 'Quels documents pour renouveler mon passeport ?',
    defaultAnswer: 'Pour le renouvellement de passeport, vous devez fournir : l\'ancien passeport (même expiré), une copie de votre acte de naissance, 2 photos d\'identité conformes, un justificatif de domicile récent, et le formulaire de demande rempli. Un rendez-vous à l\'antenne DGDI est nécessaire pour la prise d\'empreintes.',
  },
  {
    questionKey: 'faq.items.etatCivil.question',
    answerKey: 'faq.items.etatCivil.answer',
    defaultQuestion: 'Comment transcrire un acte de naissance français au Gabon ?',
    defaultAnswer: 'La transcription d\'un acte de naissance permet de le faire reconnaître au Gabon. Présentez au consulat : la copie intégrale de l\'acte de naissance français, les pièces d\'identité des parents, le livret de famille le cas échéant. Le délai moyen est de 2 à 4 semaines.',
  },
  {
    questionKey: 'faq.items.urgence.question',
    answerKey: 'faq.items.urgence.answer',
    defaultQuestion: 'Que faire en cas d\'urgence consulaire ?',
    defaultAnswer: 'En cas d\'urgence (accident grave, décès, arrestation, catastrophe naturelle), contactez immédiatement le numéro d\'urgence consulaire au 07 44 23 95 84, disponible 24h/24. Le consulat peut intervenir pour vous assister, rapatrier un corps, ou faciliter les contacts avec les autorités françaises.',
  },
  {
    questionKey: 'faq.items.rdv.question',
    answerKey: 'faq.items.rdv.answer',
    defaultQuestion: 'Faut-il prendre rendez-vous pour venir au consulat ?',
    defaultAnswer: 'Un rendez-vous est fortement recommandé pour les démarches de passeport et visa. Pour les autres services (légalisation, état civil, inscription consulaire), vous pouvez vous présenter aux heures d\'ouverture du lundi au vendredi de 9h à 16h. Prenez rendez-vous en ligne sur consulat.ga pour un service plus rapide.',
  },
  {
    questionKey: 'faq.items.vote.question',
    answerKey: 'faq.items.vote.answer',
    defaultQuestion: 'Comment voter depuis la France ?',
    defaultAnswer: 'Pour participer aux élections gabonaises depuis la France, vous devez être inscrit au registre consulaire et sur la liste électorale consulaire. Lors des élections, le consulat organise des bureaux de vote. Présentez-vous avec votre carte consulaire et une pièce d\'identité valide le jour du scrutin.',
  },
]

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-5 px-1 text-left hover:text-primary transition-colors group"
      >
        <span className="font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {t(item.questionKey, item.defaultQuestion)}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed px-1">
          {t(item.answerKey, item.defaultAnswer)}
        </p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6 glass-section">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            {t('faq.badge', 'Questions fréquentes')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('faq.titlePart1', 'Questions les plus')}{' '}
            <span className="text-gradient">
              {t('faq.titleHighlight', 'Posées')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('faq.description', 'Trouvez rapidement les réponses à vos questions sur les démarches consulaires.')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="glass-card rounded-xl p-6 md:p-8">
          {faqItems.map((item) => (
            <FAQAccordionItem key={item.questionKey} item={item} />
          ))}
        </div>

        {/* Link to full FAQ */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/faq">
              {t('faq.viewAll', 'Voir toutes les questions')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
