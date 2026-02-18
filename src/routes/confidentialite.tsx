import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'



export const Route = createFileRoute('/confidentialite')({
  component: PrivacyPage,
})

function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 px-6 bg-primary/5">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{t('privacy.title', 'Politique de Confidentialité')}</h1>
            </div>
        </section>

        <section className="py-12 px-6">
            <div className="glass-panel max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border-primary/10 relative overflow-hidden">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                    {t('privacy.intro', "La République Gabonaise s'engage à protéger la vie privée des utilisateurs de ses services consulaires en ligne.")}
                    </p>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.collection.title', 'Collecte des Données')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('privacy.collection.description', "Nous collectons uniquement les données nécessaires au traitement de vos démarches administratives (demandes de passeport, visa, inscription consulaire, etc.). Ces données incluent vos informations d'identité, coordonnées et justificatifs.")}
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.usage.title', 'Utilisation des Données')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('privacy.usage.description', "Vos données sont utilisées exclusivement par les services consulaires pour l'instruction de vos dossiers. Elles ne sont jamais commercialisées ni cédées à des tiers non autorisés.")}
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.rights.title', 'Vos Droits')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('privacy.rights.description', "Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, veuillez contacter notre délégué à la protection des données.")}
                    </p>
                    </section>
                </div>
            </div>
        </section>
      </main>

    </div>
  )
}
