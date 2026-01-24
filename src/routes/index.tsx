import { createFileRoute } from '@tanstack/react-router'

import { AlertBanner } from '../components/home/AlertBanner'
import { Hero } from '../components/home/Hero'
import { NewsSection } from '../components/home/NewsSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { CitizenCTA } from '../components/home/CitizenCTA'
import { ConsulateLocations } from '../components/home/ConsulateLocations'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Alert Banner */}
      <AlertBanner />

      {/* Hero Section */}
      <Hero />

      {/* Spacer for Quick Access Cards overlap */}
      <div className="h-32 md:h-24" />

      {/* Latest News */}
      <NewsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Inscription Consulaire CTA */}
      <CitizenCTA />

      {/* Consulate Locations */}
      <ConsulateLocations />
    </div>
  )
}
