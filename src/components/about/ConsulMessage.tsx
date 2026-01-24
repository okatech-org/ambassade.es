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
    <section className="py-16 px-6 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[300px,1fr] gap-8 lg:gap-12 items-center">
          {/* Photo side */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <Avatar className="w-56 h-56 ring-4 ring-primary/20 shadow-xl">
                <AvatarImage src={photoUrl || undefined} alt={fullName} className="object-cover" />
                <AvatarFallback className="text-5xl font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Decorative accent */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent/20 rounded-full -z-10" />
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary/10 rounded-full -z-10" />
            </div>
            
            {/* Name and role below photo on mobile, beside on desktop */}
            <div className="mt-6 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">{fullName}</h3>
              <p className="text-primary font-semibold">{role}</p>
              
              {/* Social links */}
              <div className="flex gap-2 mt-3 justify-center md:justify-start">
                {email && (
                  <Button size="sm" variant="outline" className="gap-2" asChild>
                    <a href={`mailto:${email}`}>
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </Button>
                )}
                {linkedIn && (
                  <Button size="sm" variant="outline" className="gap-2" asChild>
                    <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
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
            <Quote className="absolute -top-4 -left-2 w-12 h-12 text-primary/20 rotate-180" />
            
            <div className="space-y-4 pl-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('leConsulat.consulMessageTitle', 'Mot du Consul Général')}
              </h2>
              
              <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                "{message || defaultMessage}"
              </blockquote>
              
              {description && (
                <p className="text-sm text-muted-foreground pt-4 border-t border-border/50">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
