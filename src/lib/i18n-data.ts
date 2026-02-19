import i18n from 'i18next'
import type { GuideSection, SavoirVivreItem, ErreurItem, NumeroUtile } from '@/components/guides'

const t = (key: string, fallback: string) => i18n.t(key, fallback)

export function translateSections(prefix: string, sections: GuideSection[]): GuideSection[] {
  return sections.map((s, si) => ({
    ...s,
    title: t(`${prefix}.sections.${si}.title`, s.title),
    intro: t(`${prefix}.sections.${si}.intro`, s.intro),
    items: s.items.map((item, ii) => ({
      title: t(`${prefix}.sections.${si}.items.${ii}.title`, item.title),
      detail: t(`${prefix}.sections.${si}.items.${ii}.detail`, item.detail),
    })),
    tips: s.tips.map((tip, ti) => t(`${prefix}.sections.${si}.tips.${ti}`, tip)),
    links: s.links?.map((link) => ({
      ...link,
      description: t(`${prefix}.sections.${si}.links.${link.label}`, link.description),
    })),
  }))
}

export function translateSavoirVivre(prefix: string, items: SavoirVivreItem[]): SavoirVivreItem[] {
  return items.map((item, i) => ({
    ...item,
    title: t(`${prefix}.savoirVivre.${i}.title`, item.title),
    description: t(`${prefix}.savoirVivre.${i}.desc`, item.description),
  }))
}

export function translateErreurs(prefix: string, items: ErreurItem[]): ErreurItem[] {
  return items.map((item, i) => ({
    erreur: t(`${prefix}.erreurs.items.${i}.erreur`, item.erreur),
    conseil: t(`${prefix}.erreurs.items.${i}.conseil`, item.conseil),
  }))
}

export function translateNumeros(prefix: string, items: NumeroUtile[]): NumeroUtile[] {
  return items.map((item, i) => ({
    ...item,
    label: t(`${prefix}.numeros.items.${i}`, item.label),
  }))
}
