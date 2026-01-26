import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ModeToggle } from './mode-toggle'
import { ServiceCategory } from '@convex/lib/constants'

// Custom TikTok icon since lucide-react doesn't have it
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const socialLinks = [
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@consulatdugabon.fr', label: 'TikTok' },
]

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const quickLinks = Object.values(ServiceCategory).slice(0, 6).map((category) => ({
    label: t(`services.categoriesMap.${category}`),
    href: `/services?category=${category}`,
  }))

  const resourceLinks = [
    { label: t('footer.links.faq', 'FAQ'), href: '/faq' },
    { label: t('footer.links.news', 'Actualités'), href: '/actualites' },
    { label: t('footer.links.contact', 'Contact'), href: '/contact' },
  ]

  const legalLinks = [
    { label: t('footer.links.legal'), href: '/mentions-legales' },
    { label: t('footer.links.privacy'), href: '/confidentialite' },
    { label: t('footer.links.accessibility'), href: '/accessibilite' },
    { label: t('footer.links.sitemap'), href: '/plan-du-site' },
  ]

  return (
    <footer className="bg-muted/30 border-t border-border/40">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* Gabonese Emblem Placeholder */}
              <img 
                src="/logo-gabon-consul.png" 
                alt="Logo Consulat Gabon" 
                className="h-10 w-auto rounded-sm bg-white" 
              />
              <div>
                <div className="font-bold text-lg text-foreground">{t('footer.brand.name')}</div>
                <div className="text-sm text-muted-foreground">{t('footer.brand.country')}</div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('footer.brand.description')}
            </p>

            {/* Social Links */}
             <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary text-muted-foreground w-8 h-8"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground pt-4">
               <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  26 bis Avenue Raphaël, 75016 Paris
               </p>
               <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+33189719298" className="hover:text-primary">+33 1 89 71 92 98</a>
               </p>
               <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contact@consulatdugabon.fr" className="hover:text-primary">contact@consulatdugabon.fr</a>
               </p>
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
               <h3 className="font-semibold text-foreground mb-4">{t('footer.services')}</h3>
               <ul className="space-y-2">
                 {quickLinks.map((link) => (
                   <li key={link.label}>
                     <Link
                       to={link.href}
                       className="text-muted-foreground hover:text-primary transition-colors text-sm"
                     >
                       {link.label}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>
            
            <div>
               <h3 className="font-semibold text-foreground mb-4">{t('footer.resources')}</h3>
               <ul className="space-y-2">
                 {resourceLinks.map((link) => (
                   <li key={link.label}>
                     <Link
                       to={link.href}
                       className="text-muted-foreground hover:text-primary transition-colors text-sm"
                     >
                       {link.label}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

             <div>
               <h3 className="font-semibold text-foreground mb-4">Légal</h3>
               <ul className="space-y-2">
                 {legalLinks.map((link) => (
                   <li key={link.label}>
                     <Link
                       to={link.href}
                       className="text-muted-foreground hover:text-primary transition-colors text-sm"
                     >
                       {link.label}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-border/40" />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/60 text-xs text-center md:text-left">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-4">
             <ModeToggle />
             <p className="text-muted-foreground/40 text-xs text-center md:text-left">
              v1.0.0
             </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
