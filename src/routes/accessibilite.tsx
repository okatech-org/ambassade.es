import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/accessibilite')({
  component: AccessibilityPage,
})

function AccessibilityPage() {


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 px-6 bg-primary/5">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Accessibilité</h1>
            </div>
        </section>

        <section className="py-12 px-6">
            <div className="glass-panel max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border-primary/10 relative overflow-hidden">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                    Le service consulaire s'engage à rendre ses services numériques accessibles à tous, y compris aux personnes en situation de handicap.
                    </p>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">État de conformité</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Le site consulat.ga est en cours d'audit pour déterminer son niveau de conformité avec les normes internationales d'accessibilité (WCAG 2.1).
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Fonctionnalités d'assistance</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                        <li>Contraste des couleurs optimisé</li>
                        <li>Navigation au clavier possible sur l'ensemble du site</li>
                        <li>Compatibilité avec les lecteurs d'écran</li>
                        <li>Textes alternatifs pour les images</li>
                    </ul>
                    </section>
                    
                    <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Signaler un problème</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Si vous rencontrez des difficultés pour accéder à un contenu ou à une fonctionnalité de ce site, n'hésitez pas à nous contacter pour que nous puissions vous orienter vers une alternative accessible ou vous fournir le contenu sous une autre forme.
                    </p>
                    </section>
                </div>
            </div>
        </section>
      </main>

    </div>
  )
}
