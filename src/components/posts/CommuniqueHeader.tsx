import { FileText, Download, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CommuniqueHeaderProps {
  referenceNumber?: string
  documentUrl?: string
  documentName?: string
}

export function CommuniqueHeader({
  referenceNumber,
  documentUrl,
  documentName,
}: CommuniqueHeaderProps) {
  return (
    <Alert className="mb-8 border-primary/30 bg-primary/5">
      <AlertCircle className="h-5 w-5 text-primary" />
      <AlertTitle className="text-primary font-semibold">
        Communiqué Officiel
        {referenceNumber && (
          <span className="ml-2 font-mono text-sm text-muted-foreground">
            N° {referenceNumber}
          </span>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-muted-foreground mb-3">
          Ce document est un communiqué officiel du Consulat Général du Gabon en France.
        </p>
        
        {documentUrl && (
          <Button asChild variant="outline" size="sm">
            <a href={documentUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="w-4 h-4 mr-2" />
              Télécharger le communiqué
              {documentName && (
                <span className="ml-1 text-muted-foreground">({documentName})</span>
              )}
            </a>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

interface CommuniqueFooterProps {
  documentUrl?: string
  documentName?: string
}

export function CommuniqueFooter({
  documentUrl,
  documentName,
}: CommuniqueFooterProps) {
  if (!documentUrl) return null

  return (
    <div className="mt-8 p-6 bg-muted/50 rounded-xl border">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Document officiel</h4>
          <p className="text-sm text-muted-foreground">
            {documentName || 'Communiqué officiel (PDF)'}
          </p>
        </div>
        <Button asChild>
          <a href={documentUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </a>
        </Button>
      </div>
    </div>
  )
}
