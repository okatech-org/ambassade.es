import { useTranslation } from 'react-i18next'
import { Quote, Linkedin, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface ConsulMessageProps {
  firstName: string
  lastName: string
  role: string
  description?: string | null
  photoUrl?: string | null
  email?: string | null
  linkedIn?: string | null
  message?: string
}

export function ConsulMessage({
  firstName,
  lastName,
  role,
  description,
  photoUrl,
  email,
  linkedIn,
  message,
}: ConsulMessageProps) {
  const { t } = useTranslation()
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
  const fullName = `${firstName} ${lastName}`

  const defaultMessage = t('leConsulat.consulMessage', 
    "Au nom de l'ensemble de l'équipe consulaire, je vous souhaite la bienvenue sur le site officiel du Consulat Général du Gabon en France. Notre mission est de vous accompagner dans toutes vos démarches administratives et de renforcer les liens entre notre communauté et notre pays. Nous sommes à votre écoute et à votre service."
  )

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 via-background to-accent/5 blur-3xl -z-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border-primary/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="grid md:grid-cols-[280px,1fr] gap-10 lg:gap-16 items-start md:items-center">
            {/* Photo side */}
            <div className="flex flex-col items-center">
                <div className="relative group">
                <Avatar className="w-56 h-56 ring-4 ring-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <AvatarImage src={photoUrl || undefined} alt={fullName} className="object-cover" />
                    <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                    {initials}
                    </AvatarFallback>
                </Avatar>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full -z-10 blur-xl group-hover:bg-accent/30 transition-colors" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-full -z-10 blur-xl group-hover:bg-primary/30 transition-colors" />
                </div>
                
                {/* Name and role below photo on mobile, beside on desktop */}
                <div className="mt-8 text-center w-full">
                <h3 className="text-2xl font-bold text-foreground mb-1">{fullName}</h3>
                <p className="text-primary font-medium opacity-90 uppercase tracking-wide text-sm mb-4">{role}</p>
                
                {/* Social links */}
                <div className="flex gap-3 justify-center">
                    {email && (
                    <Button size="sm" variant="outline" className="gap-2 rounded-full border-primary/20 hover:bg-primary hover:text-white transition-all hover:border-primary" asChild>
                        <a href={`mailto:${email}`}>
                        <Mail className="h-3.5 w-3.5" />
                        Email
                        </a>
                    </Button>
                    )}
                    {linkedIn && (
                    <Button size="sm" variant="outline" className="gap-2 rounded-full border-primary/20 hover:bg-[#0077B5] hover:text-white transition-all hover:border-[#0077B5]" asChild>
                        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-3.5 w-3.5" />
                        LinkedIn
                        </a>
                    </Button>
                    )}
                </div>
                </div>
            </div>

            {/* Message side */}
            <div className="relative">
                {/* Quote icon */}
                <Quote className="absolute -top-8 -left-4 w-16 h-16 text-primary/10 rotate-180" />
                
                <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {t('leConsulat.consulMessageTitle', 'Mot du Consul Général')}
                </h2>
                
                <blockquote className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic font-light">
                    "{message || defaultMessage}"
                </blockquote>
                
                {description && (
                    <p className="text-base text-muted-foreground/80 pt-6 border-t border-border/40 leading-relaxed">
                    {description}
                    </p>
                )}
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}
