import { Linkedin, Mail } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface TeamMemberCardProps {
  firstName: string
  lastName: string
  role: string
  description?: string | null
  photoUrl?: string | null
  email?: string | null
  linkedIn?: string | null
}

export function TeamMemberCard({
  firstName,
  lastName,
  role,
  description,
  photoUrl,
  email,
  linkedIn,
}: TeamMemberCardProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
  const fullName = `${firstName} ${lastName}`

  return (
    <div className="glass-card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl">
      <div className="p-6 text-center">
        {/* Avatar */}
        <div className="relative mb-4 mx-auto">
          <Avatar className="w-28 h-28 mx-auto ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all shadow-md">
            <AvatarImage src={photoUrl || undefined} alt={fullName} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Social links overlay */}
          {(email || linkedIn) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2 bg-background/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-border/20">
                {email && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a href={`mailto:${email}`} title={`Email ${fullName}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {linkedIn && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-[#0077B5] hover:text-white transition-colors"
                    asChild
                  >
                    <a href={linkedIn} target="_blank" rel="noopener noreferrer" title={`LinkedIn ${fullName}`}>
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="font-bold text-lg text-foreground mb-1">{fullName}</h3>
        <p className="text-sm text-primary font-medium mb-3 uppercase tracking-wide opacity-90">{role}</p>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}
