import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/mentions-legales')({
  component: LegalPage,
})

function LegalPage() {


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 px-6 bg-primary/5">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Mentions Légales</h1>
            </div>
        </section>

        <section className="py-12 px-6">
            <div className="glass-panel max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border-primary/10 relative overflow-hidden">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Éditeur</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Le site consulat.ga est édité par le Ministère des Affaires Étrangères de la République Gabonaise.
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Hébergement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Ce site est hébergé sur les infrastructures de Vercel Inc.<br/>
                        Vercel Inc.<br/>
                        340 S Lemon Ave #4133<br/>
                        Walnut, CA 91789, USA
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Propriété Intellectuelle</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        L'ensemble de ce site relève de la législation gabonaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                    </section>
                </div>
            </div>
        </section>
      </main>

    </div>
  )
}
