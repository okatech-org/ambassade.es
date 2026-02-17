import { createFileRoute } from '@tanstack/react-router'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PageHero } from '@/components/PageHero'


export const Route = createFileRoute('/faq')({
  component: FAQPage,
})

function FAQPage() {


  const faqItems = [
    {
      question: "Comment renouveler mon passeport ?",
      answer: "Pour renouveler votre passeport, vous devez prendre rendez-vous au consulat et présenter votre ancien passeport, votre acte de naissance, et 2 photos d'identité récentes. Le délai de traitement est d'environ 3 à 4 semaines."
    },
    {
      question: "Quels sont les documents nécessaires pour un visa ?",
      answer: "Les documents varient selon le type de visa (tourisme, affaires, etc.). En général, il faut un formulaire de demande rempli, un passeport valide au moins 6 mois, une photo d'identité, une réservation de vol et de logement, ainsi qu'une attestation d'assurance voyage."
    },
    {
      question: "Comment s'inscrire au registre consulaire ?",
      answer: "L'inscription consulaire se fait en ligne sur consulat.ga ou en personne au consulat. Vous aurez besoin de votre passeport gabonais valide, un justificatif de domicile en France de moins de 3 mois, et 2 photos d'identité. L'inscription est gratuite et donne accès à la protection consulaire."
    },
    {
      question: "Puis-je voter aux élections depuis l'étranger ?",
      answer: "Oui, si vous êtes inscrit sur le registre consulaire et sur la liste électorale consulaire. Lors des élections, le consulat met en place des bureaux de vote. Présentez-vous avec votre carte consulaire et une pièce d'identité valide le jour du scrutin."
    },
    {
      question: "Que faire en cas de perte de passeport ?",
      answer: "En cas de perte ou de vol, vous devez d'abord faire une déclaration auprès des autorités de police locales. Ensuite, contactez le consulat pour faire une déclaration de perte et demander un laissez-passer ou un passeport d'urgence."
    },
    {
      question: "Comment régulariser ma situation en France ?",
      answer: "Plusieurs voies de régularisation existent : admission exceptionnelle au séjour (circulaire Valls 2012) avec preuves de séjour et d'intégration, régularisation par le travail (contrat ou promesse d'embauche), motif familial (parent d'enfant français, conjoint de Français), raisons médicales. Le dossier se dépose en préfecture ou en ligne sur le portail ANEF. Consultez un avocat spécialisé pour maximiser vos chances."
    },
    {
      question: "Quels documents présenter à la frontière ?",
      answer: "Vous devez présenter : un passeport en cours de validité, un visa (court ou long séjour selon le motif), une attestation d'hébergement ou réservation d'hôtel, un billet d'avion retour (court séjour), une assurance voyage couvrant les frais médicaux (minimum 30 000 €). Justificatifs de ressources : minimum 120 €/jour (hôtel) ou 32,50 €/jour (hébergement particulier avec attestation d'accueil)."
    },
    {
      question: "Comment renouveler ma carte de séjour ?",
      answer: "Le renouvellement se fait 2 à 4 mois avant l'expiration de votre titre, en ligne sur administration-etrangers-en-france.interieur.gouv.fr (portail ANEF) ou en préfecture. Documents : passeport valide, titre de séjour en cours ou expiré, justificatifs de domicile, photos d'identité, justificatifs selon le motif (contrat de travail, certificat de scolarité, etc.). Un récépissé vous est remis en attendant le nouveau titre."
    },
    {
      question: "Qu'est-ce qu'une OQTF et que faire si j'en reçois une ?",
      answer: "L'Obligation de Quitter le Territoire Français (OQTF) est une décision administrative. Motifs : séjour irrégulier, refus de renouvellement, refus d'asile. NE JAMAIS ignorer une OQTF. Recours : gracieux auprès du préfet (30 jours), contentieux devant le tribunal administratif (30 jours, ou 48h si sans délai). Le recours est suspensif. L'aide juridictionnelle est accessible. Contactez immédiatement un avocat et le consulat."
    },
    {
      question: "J'ai perdu mon passeport/titre de séjour, que faire ?",
      answer: "Déclaration immédiate : déposez une déclaration de perte/vol au commissariat de police ou à la gendarmerie. Pour le passeport : contactez le consulat pour un laissez-passer ou passeport d'urgence. Pour le titre de séjour : déclarez la perte sur le portail ANEF et demandez un duplicata en préfecture. Conservez toujours des copies numériques de vos documents dans un cloud sécurisé."
    },
    {
      question: "Je suis étudiant, combien d'heures puis-je travailler ?",
      answer: "Les étudiants étrangers sont autorisés à travailler 964 heures par an, soit environ 20 heures par semaine (60% de la durée légale). Aucune autorisation de travail supplémentaire n'est nécessaire — votre titre de séjour étudiant vous y autorise. Ce volume horaire se calcule sur l'année civile couverte par votre titre de séjour."
    },
    {
      question: "Je suis binational (Franco-Gabonais), ai-je besoin d'un visa pour le Gabon ?",
      answer: "Non, si vous êtes titulaire d'un passeport gabonais en cours de validité, vous n'avez pas besoin de visa pour entrer au Gabon. Si vous ne possédez qu'un passeport français, un e-Visa est nécessaire (demande sur evisa.dgdi.ga). Le consulat peut vous accompagner pour l'obtention ou le renouvellement de votre passeport gabonais."
    },
    {
      question: "Que faire en cas d'arrestation ?",
      answer: "Restez calme et coopérez. Vous avez le droit de : connaître le motif de votre arrestation, garder le silence, bénéficier d'un avocat (commis d'office si nécessaire), prévenir un proche, et contacter le consulat (Convention de Vienne, art. 36). La garde à vue dure 24h maximum (renouvelable une fois). Ne signez aucun document sans avoir lu et compris. Appelez le consulat au 07 44 23 95 84."
    },
    {
      question: "Comment passer du statut étudiant au statut salarié ?",
      answer: "Conditions : emploi en lien avec votre diplôme, rémunération ≥ 1,5x le SMIC (1x SMIC pour les métiers en tension). Procédure : votre employeur dépose une demande d'autorisation de travail auprès de la DREETS, puis vous déposez votre demande de changement de statut en préfecture. Délai : 2 à 4 mois. Il est recommandé de lancer la procédure avant l'expiration de votre APS ou titre étudiant."
    },
    {
      question: "Qu'est-ce que l'APS et comment en bénéficier ?",
      answer: "L'Autorisation Provisoire de Séjour (APS) est un titre de 12 mois (non renouvelable) accordé aux diplômés d'un Master ou équivalent obtenu en France. Elle permet de rechercher un emploi ou créer une entreprise en lien avec votre diplôme, avec droit de travailler à temps plein. Demande à déposer avant l'expiration de votre titre étudiant, en préfecture ou en ligne sur le portail ANEF."
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero image="/images/heroes/hero-faq.png">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm mb-4">
                    Support
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                    Foire Aux <span className="text-gradient">Questions</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
                    Retrouvez les réponses aux questions les plus fréquentes concernant vos démarches consulaires.
                </p>
        </PageHero>

        <section className="px-6 pb-24">
            <div className="glass-panel max-w-3xl mx-auto p-8 rounded-3xl border-primary/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                 
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border/40 px-2 rounded-lg data-[state=open]:bg-muted/50 transition-colors">
                        <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">
                        {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
      </main>

    </div>
  )
}
