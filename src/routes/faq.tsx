import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'
import { Building2, Landmark, Globe, AlertTriangle, Mail, MapPin } from 'lucide-react'


export const Route = createFileRoute('/faq')({
  component: FAQPage,
})

type FaqCategory = 'consulat' | 'prefecture' | 'enligne' | 'urgent'

function FAQPage() {
  const { t } = useTranslation()

  const categoryConfig: Record<FaqCategory, { label: string; icon: typeof Building2; color: string }> = {
    consulat: { label: t('faq.categories.consulat', 'Consulat'), icon: Building2, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800' },
    prefecture: { label: t('faq.categories.prefecture', 'Préfecture'), icon: Landmark, color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800' },
    enligne: { label: t('faq.categories.enligne', 'En ligne'), icon: Globe, color: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800' },
    urgent: { label: t('faq.categories.urgent', 'Urgent'), icon: AlertTriangle, color: 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-800' },
  }

  const faqItems: { question: string; answer: string; category: FaqCategory }[] = [
    { question: t('faq.items.0.question', 'Comment renouveler mon passeport ?'), answer: t('faq.items.0.answer', "Pour renouveler votre passeport, vous devez prendre rendez-vous au consulat et présenter votre ancien passeport, votre acte de naissance, et 2 photos d'identité récentes. Le délai de traitement est d'environ 3 à 4 semaines."), category: 'consulat' },
    { question: t('faq.items.1.question', 'Quels sont les documents nécessaires pour un visa ?'), answer: t('faq.items.1.answer', "Les documents varient selon le type de visa (tourisme, affaires, etc.). En général, il faut un formulaire de demande rempli, un passeport valide au moins 6 mois, une photo d'identité, une réservation de vol et de logement, ainsi qu'une attestation d'assurance voyage."), category: 'consulat' },
    { question: t('faq.items.2.question', "Comment s'inscrire au registre consulaire ?"), answer: t('faq.items.2.answer', "L'inscription consulaire se fait en ligne sur consulat.ga ou en personne au consulat. Vous aurez besoin de votre passeport gabonais valide, un justificatif de domicile en France de moins de 3 mois, et 2 photos d'identité. L'inscription est gratuite et donne accès à la protection consulaire."), category: 'consulat' },
    { question: t('faq.items.3.question', "Puis-je voter aux élections depuis l'étranger ?"), answer: t('faq.items.3.answer', "Oui, si vous êtes inscrit sur le registre consulaire et sur la liste électorale consulaire. Lors des élections, le consulat met en place des bureaux de vote. Présentez-vous avec votre carte consulaire et une pièce d'identité valide le jour du scrutin."), category: 'consulat' },
    { question: t('faq.items.4.question', 'Que faire en cas de perte de passeport ?'), answer: t('faq.items.4.answer', "En cas de perte ou de vol, vous devez d'abord faire une déclaration auprès des autorités de police locales. Ensuite, contactez le consulat pour faire une déclaration de perte et demander un laissez-passer ou un passeport d'urgence."), category: 'consulat' },
    { question: t('faq.items.5.question', 'Comment régulariser ma situation en France ?'), answer: t('faq.items.5.answer', "Plusieurs voies de régularisation existent : admission exceptionnelle au séjour (circulaire Valls 2012) avec preuves de séjour et d'intégration, régularisation par le travail (contrat ou promesse d'embauche), motif familial (parent d'enfant français, conjoint de Français), raisons médicales (pathologie grave nécessitant un traitement indisponible au Gabon), ou protection internationale via l'OFPRA. Le dossier se dépose en préfecture ou en ligne sur le portail ANEF."), category: 'prefecture' },
    { question: t('faq.items.6.question', 'Quels documents présenter à la frontière à Roissy ou Orly ?'), answer: t('faq.items.6.answer', "Vous devez présenter : un passeport en cours de validité, un visa (court ou long séjour selon le motif), une attestation d'hébergement ou réservation d'hôtel, un billet d'avion retour (court séjour), une assurance voyage couvrant les frais médicaux (minimum 30 000 €). Justificatifs de ressources : minimum 120 €/jour (hôtel) ou 32,50 €/jour (hébergement particulier avec attestation d'accueil). Le visa ne garantit pas l'entrée — c'est la PAF qui décide."), category: 'enligne' },
    { question: t('faq.items.7.question', 'Comment renouveler ma carte de séjour et quand faire la demande ?'), answer: t('faq.items.7.answer', "Le renouvellement se fait 2 mois avant l'expiration de votre titre, en ligne sur le portail ANEF ou en préfecture. Documents : passeport valide, titre de séjour en cours ou expiré, justificatifs de domicile, photos d'identité, justificatifs selon le motif (contrat de travail, certificat de scolarité, etc.). Un récépissé de renouvellement (valable 3 mois) vous est remis en attendant le nouveau titre."), category: 'prefecture' },
    { question: t('faq.items.8.question', "Qu'est-ce qu'une OQTF et quels sont mes recours ?"), answer: t('faq.items.8.answer', "L'OQTF est une décision administrative enjoignant un étranger à quitter la France. Trois recours existent : 1) Recours gracieux auprès du Préfet (2 mois, NE suspend PAS l'OQTF). 2) Recours hiérarchique auprès du Ministre de l'Intérieur (2 mois, NE suspend PAS l'OQTF). 3) Recours contentieux devant le Tribunal Administratif (30 jours, ou 48h si sans délai) — c'est le SEUL recours qui SUSPEND l'exécution de l'OQTF. L'aide juridictionnelle est accessible. Contactez immédiatement un avocat spécialisé et le consulat."), category: 'urgent' },
    { question: t('faq.items.9.question', "J'ai perdu mon passeport/titre de séjour, que faire ?"), answer: t('faq.items.9.answer', "Déclaration immédiate : déposez une déclaration de perte/vol au commissariat de police ou à la gendarmerie (obtenez un récépissé). Pour le passeport : contactez le consulat pour une attestation de perte et un nouveau passeport. Pour le titre de séjour : déclarez la perte sur le portail ANEF et demandez un duplicata en préfecture. Conservez toujours des copies numériques dans un cloud sécurisé."), category: 'consulat' },
    { question: t('faq.items.10.question', "Je suis étudiant gabonais, combien d'heures puis-je travailler ?"), answer: t('faq.items.10.answer', "Les étudiants étrangers sont autorisés à travailler 964 heures par an, soit environ 20 heures par semaine (60% de la durée légale). Aucune autorisation de travail supplémentaire n'est nécessaire — votre titre de séjour étudiant vous y autorise. Ressources minimum pour la carte pluriannuelle : 615 €/mois."), category: 'enligne' },
    { question: t('faq.items.11.question', "Je suis binational (Franco-Gabonais), ai-je besoin d'un visa pour le Gabon ?"), answer: t('faq.items.11.answer', "Oui, un visa est obligatoire pour entrer au Gabon avec un passeport français. Il s'obtient uniquement au Consulat Général du Gabon à Paris (26 bis avenue Raphaël, 75016). Délai : 3 jours ouvrés. La présence physique est requise, pas de visa express. Documents : passeport français, acte de naissance gabonais, photos, formulaire de visa. Conseil : entrez en France avec le passeport français, au Gabon avec le passeport gabonais."), category: 'consulat' },
    { question: t('faq.items.12.question', "Que faire en cas d'arrestation par la police ?"), answer: t('faq.items.12.answer', "Restez calme et coopérez. Vous avez le droit de : connaître le motif de votre arrestation, garder le silence, bénéficier d'un avocat (commis d'office si nécessaire), prévenir un proche, et demander que le consulat soit informé (Convention de Vienne, art. 36). La garde à vue dure 24h maximum (renouvelable une fois). Ne signez aucun document sans avoir lu et compris. Demandez un interprète si besoin."), category: 'urgent' },
    { question: t('faq.items.13.question', 'Comment passer du statut étudiant au statut salarié ?'), answer: t('faq.items.13.answer', "Conditions : emploi en lien avec votre diplôme, rémunération ≥ 1,5x le SMIC (1x SMIC pour les métiers en tension). Procédure : votre employeur dépose une demande d'autorisation de travail auprès de la DREETS, puis vous déposez votre demande de changement de statut en préfecture (cerfa n°15187). Délai : 2 à 4 mois."), category: 'prefecture' },
    { question: t('faq.items.14.question', "Qu'est-ce que l'APS et combien de temps dure-t-elle ?"), answer: t('faq.items.14.answer', "L'Autorisation Provisoire de Séjour est un titre accordé aux diplômés d'un Master ou équivalent obtenu en France. Base juridique : accord franco-gabonais du 5 juillet 2007. Durée : 9 mois, renouvelable une fois (18 mois maximum). Elle permet de rechercher un emploi ou créer une entreprise en lien avec votre diplôme, avec droit de travailler à temps plein. Demande à déposer 2 à 4 mois avant l'expiration de votre titre étudiant."), category: 'prefecture' },
    { question: t('faq.items.15.question', 'Mon enfant a 18 ans, que doit-il faire pour son titre de séjour ?'), answer: t('faq.items.15.answer', "À 18 ans, le jeune doit obligatoirement demander un titre de séjour propre. Selon sa situation : mention 'étudiant' s'il poursuit des études, ou 'vie privée et familiale' s'il peut justifier d'attaches personnelles et familiales en France. Le Document de Circulation pour Mineur (DCM) cesse d'être valable. La demande doit être faite en préfecture ou sur le portail ANEF dans les mois précédant les 18 ans."), category: 'prefecture' },
    { question: t('faq.items.16.question', 'Puis-je voyager avec un récépissé de carte de séjour ?'), answer: t('faq.items.16.answer', "⚠️ Attention : le récépissé de PREMIÈRE DEMANDE de carte de séjour ne permet PAS de quitter la France et d'y revenir. Seul le titre de séjour définitif ou le VLS-TS validé le permet. En revanche, le récépissé de RENOUVELLEMENT fait office de titre de séjour provisoire et permet de voyager, sous réserve de disposer d'un passeport valide et d'un visa de retour si nécessaire."), category: 'urgent' },
    { question: t('faq.items.17.question', "Comment saisir le Consul Général en cas d'insatisfaction ?"), answer: t('faq.items.17.answer', "En cas d'insatisfaction concernant un service rendu par le consulat, vous pouvez adresser une réclamation écrite au Consul Général. Par courrier : 26 bis, avenue Raphaël — 75016 Paris. Par email : contact@consulatdugabon.fr. Votre réclamation sera examinée et vous recevrez une réponse dans les meilleurs délais."), category: 'consulat' },
    { question: t('faq.items.18.question', 'Comment obtenir ma carte consulaire ?'), answer: t('faq.items.18.answer', "La carte consulaire est gratuite et nécessite : 1 copie de l'acte de naissance (< 6 mois), 1 copie du passeport en cours de validité, 1 copie du titre de séjour, 1 justificatif de domicile récent et 2 photos d'identité. Rendez-vous au Consulat Général du Gabon, 26 bis avenue Raphaël, 75016 Paris."), category: 'consulat' },
    { question: t('faq.items.19.question', 'Comment faire transcrire un acte de naissance ?'), answer: t('faq.items.19.answer', "La transcription d'un acte de naissance établi en France se fait au consulat. Fournissez : la copie intégrale de l'acte de naissance français (délivrée par la mairie), les copies des pièces d'identité des deux parents, l'acte de mariage (si mariés), le livret de famille, et les titres de séjour. Le traitement est immédiat si le dossier est complet."), category: 'consulat' },
    { question: t('faq.items.20.question', "Qu'est-ce qu'une attestation patronymique ?"), answer: t('faq.items.20.answer', "L'attestation patronymique est un acte officiel permettant aux parents d'attribuer un nom et un (des) prénom(s) à un enfant à naître. Elle peut être établie avant la naissance sur présentation des pièces d'identité des parents, de l'acte de mariage, du certificat de grossesse et du livret de famille."), category: 'consulat' },
    { question: t('faq.items.21.question', 'Peut-on se marier au consulat ? Quel est le tarif ?'), answer: t('faq.items.21.answer', "Oui, le Consulat Général peut célébrer des mariages entre deux ressortissants gabonais, conformément au droit gabonais. Le tarif est de 250 €. La célébration a lieu exclusivement dans les locaux du Consulat. La publication des bans doit être faite au moins 10 jours avant la cérémonie."), category: 'consulat' },
    { question: t('faq.items.22.question', "Quelle est la différence entre un tenant lieu de passeport et un laissez-passer ?"), answer: t('faq.items.22.answer', "Le tenant lieu de passeport (55 €) est un document provisoire valable 1 an délivré en cas de perte, vol ou expiration du passeport. Le laissez-passer (55 €) est un document d'urgence valable 30 jours pour un trajet unique (aller simple), notamment pour un rapatriement urgent. Les deux nécessitent la déclaration de perte/vol du passeport."), category: 'consulat' },
    { question: t('faq.items.23.question', 'Comment faire légaliser un document au consulat ?'), answer: t('faq.items.23.answer', "La légalisation authentifie la signature d'un document d'origine gabonaise pour qu'il soit reconnu en France, ou inversement. Présentez-vous avec l'original du document, une copie du passeport et du titre de séjour. Le délai est de 24h à 48h."), category: 'consulat' },
    { question: t('faq.items.24.question', 'Comment obtenir un certificat de nationalité gabonaise ?'), answer: t('faq.items.24.answer', "Le certificat de nationalité atteste que vous possédez la nationalité gabonaise. Documents requis : copie de l'acte de naissance, copie du passeport gabonais, copie des actes de naissance des parents, certificat de nationalité des parents (si disponible) et 2 photos d'identité."), category: 'consulat' },
    { question: t('faq.items.25.question', 'Quelles sont les démarches pour un rapatriement de corps ?'), answer: t('faq.items.25.answer', "Le rapatriement d'un corps vers le Gabon est une procédure complexe impliquant plusieurs administrations. Documents requis : acte de décès français, passeport et carte consulaire du défunt, certificat de non-contagion, certificat de mise en bière hermétique, et autorisation de transport de la préfecture. Le consulat accompagne les familles dans toutes les démarches."), category: 'urgent' },
    { question: t('faq.items.26.question', "Comment obtenir une attestation de filiation ?"), answer: t('faq.items.26.answer', "L'attestation de filiation établit officiellement le lien entre un enfant et ses parents. Présentez : les actes de naissance de l'enfant et des parents, le livret de famille, les copies des passeports et l'acte de reconnaissance si applicable. Elle est souvent requise pour le regroupement familial ou les successions."), category: 'consulat' },
    { question: t('faq.items.27.question', "Qu'est-ce qu'une attestation de capacité juridique ?"), answer: t('faq.items.27.answer', "L'attestation de capacité juridique certifie qu'une personne n'est pas sous tutelle, curatelle ou interdiction et jouit de sa pleine capacité. Ce document est utile pour les transactions immobilières, les procurations et les actes notariés. Il faut présenter l'acte de naissance, le passeport, le titre de séjour et une attestation sur l'honneur."), category: 'consulat' },
    { question: t('faq.items.28.question', "À quoi sert le certificat de vie et d'entretien ?"), answer: t('faq.items.28.answer', "Le certificat de vie et d'entretien atteste qu'une personne est en vie et, le cas échéant, prise en charge par un tiers. Il est requis par les caisses de retraite et les organismes sociaux. La présence physique au consulat est généralement requise. Le traitement est immédiat."), category: 'consulat' },
    { question: t('faq.items.29.question', 'Comment obtenir un certificat de coutume ou de célibat ?'), answer: t('faq.items.29.answer', "Le certificat de coutume atteste des dispositions du droit gabonais en matière de mariage. Le certificat de célibat atteste que vous n'êtes pas marié(e) au Gabon. Documents : acte de naissance (< 6 mois), passeport, titre de séjour, pièce d'identité du futur conjoint (pour le certificat de coutume), justificatif de domicile et attestation sur l'honneur de célibat."), category: 'consulat' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero image="/images/heroes/hero-faq.png">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm mb-4">
                    {t('faq.badge', 'Support')}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                    {t('faq.title', 'Foire Aux')} <span className="text-gradient">{t('faq.titleHighlight', 'Questions')}</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto">
                    {t('faq.subtitle', 'Retrouvez les réponses aux questions les plus fréquentes concernant vos démarches consulaires.')}
                </p>
        </PageHero>

        <section className="px-6 pb-24">
            <div className="glass-panel max-w-3xl mx-auto p-8 rounded-3xl border-primary/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                 
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => {
                      const catConfig = categoryConfig[item.category]
                      const CatIcon = catConfig.icon
                      return (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border/40 px-2 rounded-lg data-[state=open]:bg-muted/50 transition-colors">
                        <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">
                          <div className="flex items-start gap-3 flex-1 mr-2">
                            <Badge variant="outline" className={`shrink-0 mt-0.5 text-xs gap-1 ${catConfig.color}`}>
                              <CatIcon className="w-3 h-3" />
                              {catConfig.label}
                            </Badge>
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                    )})
                    }
                </Accordion>

                {/* Contact consulat */}
                <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    {t('faq.notFound.title', "Vous n'avez pas trouvé votre réponse ?")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('faq.notFound.description', "Contactez le Consulat Général du Gabon pour toute demande d'information.")}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>26 bis, avenue Raphaël — 75016 Paris</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href="mailto:contact@consulatdugabon.fr" className="hover:text-primary transition-colors">
                        contact@consulatdugabon.fr
                      </a>
                    </div>
                  </div>
                </div>
            </div>
        </section>
      </main>

      <CitizenCTA />
    </div>
  )
}
