import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  BookOpen,
  Building,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  HandHeart,
  Home,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ModeToggle } from './mode-toggle'

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const

export default function Header() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const navLinks = [
    { label: t('header.nav.home'), href: '/', icon: Home },
    { label: t('header.nav.services'), href: '/services', icon: FileText },
    { label: t('header.nav.vieFrance', 'Vie en France'), href: '/vie-en-france', icon: BookOpen },
    { label: t('header.nav.integration', 'Intégration'), href: '/integration', icon: HandHeart },
    { label: t('header.nav.news'), href: '/actualites', icon: Newspaper },
    { label: t('header.nav.consulat', 'Le Consulat'), href: '/le-consulat', icon: Building },
    { label: t('header.nav.contact'), href: '/contact', icon: MapPin },
  ]



  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+33751025292" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              07 51 02 52 92
            </a>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('header.hours')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle — Top bar */}
            <ModeToggle variant="header" />

            {/* Language Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 h-7 px-2">
                  <span className="mr-1">{currentLanguage.flag}</span>
                  {currentLanguage.code.toUpperCase()}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      {lang.label}
                    </span>
                    {i18n.language === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Header — Glass effect */}
      <header className="glass border-b border-border/40 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/sceau_gabon.png" 
              alt="Logo Consulat Gabon" 
              className="h-20 w-auto relative -my-5" 
            />
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-foreground leading-tight tracking-tight">Consulat Général</div>
              <div className="text-xs text-muted-foreground">Gabon en France</div>
            </div>
          </Link>

          {/* Right Side: Navigation + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  asChild
                  variant="ghost"
                  size="sm"
                  className="font-medium rounded-full"
                >
                  <Link
                    to={link.href}
                    activeProps={{
                      className: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
                    }}
                  >
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>

            {/* Mobile: Theme + Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <ModeToggle variant="header" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="rounded-xl bg-secondary/50 border border-border/50"
                aria-label={t('header.openMenu')}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-card z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img 
              src="/sceau_gabon.png" 
              alt="Logo Consulat Gabon" 
              className="h-20 w-auto" 
            />
            <div>
              <div className="font-bold text-foreground tracking-tight">Consulat.ga</div>
              <div className="text-xs text-muted-foreground">{t('header.country')}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="rounded-full"
            aria-label={t('header.closeMenu')}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Language Switcher */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={i18n.language === lang.code ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeLanguage(lang.code)}
                className="flex-1 rounded-full"
              >
                <span className="mr-1">{lang.flag}</span>
                {lang.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-full hover:bg-secondary transition-colors mb-1"
              activeProps={{
                className: 'flex items-center gap-3 p-3 rounded-full bg-primary text-primary-foreground mb-1',
              }}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          ))}


        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Consulat.ga
          </p>
          <ModeToggle />
        </div>
      </aside>
    </>
  )
}
