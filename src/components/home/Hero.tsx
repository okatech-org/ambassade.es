import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import {
  Sparkles,
  ArrowRight,
  Bot,
} from 'lucide-react'
import { Button } from '../ui/button'



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
          src="/images/IMG_2415.PNG"
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


    </section>
  )
}

export default Hero
