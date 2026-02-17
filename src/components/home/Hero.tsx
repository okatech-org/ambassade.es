import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import {
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  Globe,
  Shield,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

/* ───────── Stats counters ───────── */
const stats = [
  { value: 'IA', label: 'Assistant intelligent', icon: Bot },
  { value: '100%', label: 'Démarches en ligne', icon: Globe },
  { value: '< 2 min', label: 'Temps de réponse', icon: Zap },
  { value: '24h/24', label: 'Disponibilité', icon: Shield },
]

export function Hero() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-start pt-[calc(20vh-3cm)] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Consult_general.jpeg"
          alt="Consulat de l'ère IA"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay adapts to theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
        {/* Radial glow — brand blue */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.12),transparent_70%)]" />
      </div>

      {/* Main Content — Two columns */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-6 pt-0 pb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left — Title + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-8 tracking-tight whitespace-nowrap">
              {t('hero.title', 'Le Consulat passe à')}{' '}
              <span className="text-gradient">
                {t('hero.titleHighlight', 'l\'ère de l\'IA')}
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20 bg-gradient-to-r from-digitalium-blue to-digitalium-violet hover:opacity-90 transition-all"
              >
                <a href="https://www.consulat.ga" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('hero.cta', 'Découvrir Consulat.ga')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-xl text-base border-border/50 hover:bg-accent/10 backdrop-blur-sm"
              >
                <Link to="/services">
                  <Bot className="w-5 h-5 mr-2" />
                  {t('hero.services', 'Voir nos services')}
                </Link>
              </Button>
            </div>
          </div>


        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-10 mt-[7cm]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/40 backdrop-blur-lg border border-border/30 hover:border-primary/30 hover:bg-background/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
