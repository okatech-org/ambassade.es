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
        {/* Radial glow — Google Blue */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-6 pt-0 pb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left — Title + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 md:mb-8 tracking-tight">
              {t('hero.title', 'Le Consulat passe à')}{' '}
              <span className="text-gradient">
                {t('hero.titleHighlight', "l'ère de l'IA")}
              </span>
            </h1>

            {/* CTA Buttons — Google Style */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-full text-base shadow-lg shadow-[#1a5dab]/20 bg-[#1a5dab] hover:bg-[#174ea6] text-white transition-all font-semibold"
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
                className="h-14 px-8 rounded-full text-base border-[#1a5dab]/30 text-[#1a5dab] dark:text-[#8ab4f8] dark:border-[#8ab4f8]/30 hover:bg-[#1a5dab]/5 backdrop-blur-sm font-semibold"
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

      {/* Stats Cards — Google Bento blocks */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 pb-10 mt-24 md:mt-32 lg:mt-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => {
            /* Alternate pastel backgrounds like Google Chrome Installer */
            const bgColors = [
              'bg-[#1a5dab] text-white',        /* Blue block */
              'bg-[#f5d98e] text-[#3c4043]',    /* Yellow block */
              'bg-[#b8d8b0] text-[#3c4043]',    /* Green block */
              'bg-[#1a5dab] text-white',         /* Blue block */
            ]
            const iconBgs = [
              'bg-white/20',
              'bg-white/40',
              'bg-white/40',
              'bg-white/20',
            ]
            return (
              <div
                key={stat.label}
                className={`group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl md:rounded-3xl ${bgColors[i]} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`p-3 rounded-2xl ${iconBgs[i]} transition-colors`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Hero
