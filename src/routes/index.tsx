import { createFileRoute } from '@tanstack/react-router'


import { Hero } from '../components/home/Hero'
import { NewsSection } from '../components/home/NewsSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { GuidePratiqueSection } from '../components/home/GuidePratiqueSection'
import { CitizenCTA } from '../components/home/CitizenCTA'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section — Stats integrated */}
      <Hero />

      {/* Services Section — Priority content */}
      <ServicesSection />

      {/* Guide Pratique — Vie en France */}
      <GuidePratiqueSection />

      {/* Latest News */}
      <NewsSection />

      {/* Inscription Consulaire CTA */}
      <CitizenCTA />
    </div>
  )
}
