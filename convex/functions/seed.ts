import { mutation } from "../_generated/server";
import { ServiceCategory } from "../lib/constants";

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // ==========================================
    // SERVICES
    // ==========================================
    const existingServices = await ctx.db.query("services").take(1);
    if (existingServices.length > 0) {
      const all = await ctx.db.query("services").collect();
      for (const s of all) {
        await ctx.db.delete(s._id);
      }
    }

    const services = [
      // ============================================
      // 1. IDENTITÉ & DOCUMENTS DE VOYAGE
      // ============================================
      {
        title: "Carte Consulaire",
        slug: "carte-consulaire",
        description: "Document d'identification des ressortissants gabonais résidant en France. Obligatoire pour tout Gabonais vivant sur le territoire français.",
        category: ServiceCategory.Identity,
        requirements: [
          "1 copie de l'acte de naissance (datant de moins de 6 mois)",
          "1 copie du passeport en cours de validité",
          "1 copie du titre de séjour en cours de validité",
          "1 justificatif de domicile récent",
          "2 photos d'identité (format officiel)",
        ],
        price: "Gratuit",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 1,
      },
      {
        title: "Tenant Lieu de Passeport",
        slug: "tenant-lieu",
        description: "Document provisoire délivré en remplacement d'un passeport perdu, volé ou expiré, permettant de voyager temporairement.",
        category: ServiceCategory.Identity,
        requirements: [
          "Déclaration de perte ou de vol (récépissé du commissariat)",
          "1 copie de l'ancien passeport (si disponible)",
          "1 copie de l'acte de naissance",
          "1 copie du titre de séjour",
          "1 justificatif de domicile",
          "2 photos d'identité",
        ],
        price: "55 €",
        delay: "24h à 72h",
        validity: "1 an",
        isOnline: false,
        isActive: true,
        order: 2,
      },
      {
        title: "Laissez-Passer",
        slug: "laissez-passer",
        description: "Document de voyage d'urgence délivré pour un trajet unique (aller simple), notamment en cas de rapatriement ou de voyage urgent sans passeport.",
        category: ServiceCategory.Identity,
        requirements: [
          "Déclaration de perte ou de vol du passeport",
          "1 copie de l'acte de naissance",
          "1 copie du titre de séjour (si applicable)",
          "1 justificatif de domicile",
          "2 photos d'identité",
          "Justificatif du motif du voyage (billet d'avion, certificat médical, etc.)",
        ],
        price: "55 €",
        delay: "24h à 72h",
        validity: "30 jours",
        isUrgent: true,
        isOnline: false,
        isActive: true,
        order: 3,
      },

      // ============================================
      // 2. ÉTAT CIVIL — NAISSANCES
      // ============================================
      {
        title: "Attestation Patronymique",
        slug: "attestation-patronymique",
        description: "Acte officiel permettant aux parents d'attribuer un nom et un (des) prénom(s) à un enfant à naître. Peut être établie avant la naissance.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie des pièces d'identité des deux parents (passeport ou carte d'identité)",
          "Copie de l'acte de mariage des parents (si mariés)",
          "Certificat de grossesse ou attestation médicale",
          "Copie du livret de famille (si existant)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Immédiat (dossier complet)",
        isOnline: false,
        isActive: true,
        order: 4,
      },
      {
        title: "Transcription de l'Acte de Naissance",
        slug: "transcription-naissance",
        description: "Enregistrement dans les registres consulaires d'un acte de naissance établi en France. Obligatoire pour que l'état civil gabonais reconnaisse la naissance.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de naissance français (délivrée par la mairie du lieu de naissance)",
          "Copie des pièces d'identité des deux parents",
          "Copie de l'acte de mariage des parents (si mariés)",
          "Copie du livret de famille",
          "Copie des titres de séjour des parents",
          "2 photos d'identité de l'enfant (si applicable)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Immédiat (dossier complet)",
        isOnline: true,
        isActive: true,
        order: 5,
      },
      {
        title: "Attestation de Filiation",
        slug: "attestation-filiation",
        description: "Établit officiellement le lien de filiation entre un enfant et ses parents. Nécessaire pour les démarches de regroupement familial, de succession ou d'état civil.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie de l'acte de naissance de l'enfant",
          "Copie des actes de naissance des parents",
          "Copie du livret de famille",
          "Copie des passeports des parents et de l'enfant",
          "Acte de reconnaissance (si applicable)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 6,
      },

      // ============================================
      // 3. ÉTAT CIVIL — MARIAGES
      // ============================================
      {
        title: "Certificat de Coutume et Certificat de Célibat",
        slug: "certificat-coutume-celibat",
        description: "Le certificat de coutume atteste des dispositions du droit gabonais en matière de mariage. Le certificat de célibat atteste que le ressortissant n'est pas engagé dans les liens du mariage au Gabon.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie de l'acte de naissance (moins de 6 mois)",
          "Copie du passeport",
          "Copie du titre de séjour",
          "Copie de la pièce d'identité du futur conjoint (certificat de coutume)",
          "Justificatif de domicile",
          "Attestation sur l'honneur de célibat (certificat de célibat)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 7,
      },
      {
        title: "Transcription de l'Acte de Mariage",
        slug: "transcription-mariage",
        description: "Enregistrement dans les registres consulaires d'un mariage célébré en France. Permet la reconnaissance du mariage par l'état civil gabonais.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de mariage français",
          "Copie des actes de naissance des deux époux",
          "Copie des passeports des deux époux",
          "Copie des titres de séjour",
          "Copie du livret de famille français (si délivré)",
          "Certificat de coutume (si le mariage a été célébré avec un certificat de coutume gabonais)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 8,
      },
      {
        title: "Célébration du Mariage au Consulat",
        slug: "celebration-mariage",
        description: "Le Consulat Général peut célébrer des mariages entre deux ressortissants gabonais, conformément au droit gabonais. La célébration a lieu exclusivement dans les locaux du Consulat.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Actes de naissance des deux époux (moins de 6 mois)",
          "Copie des passeports gabonais des deux époux",
          "Copie des titres de séjour",
          "Certificat de célibat pour chaque époux",
          "Certificat de coutume",
          "Certificat médical prénuptial",
          "Justificatifs de domicile",
          "Liste des témoins (2 minimum, 4 maximum) avec copies de leurs pièces d'identité",
          "Publication des bans (au moins 10 jours avant la date de célébration)",
        ],
        price: "250 €",
        delay: "Minimum 10 jours (publication des bans)",
        isOnline: false,
        isActive: true,
        order: 9,
      },

      // ============================================
      // 4. ÉTAT CIVIL — DÉCÈS
      // ============================================
      {
        title: "Transcription de l'Acte de Décès",
        slug: "transcription-deces",
        description: "Enregistrement dans les registres consulaires d'un décès survenu en France. Permet la reconnaissance du décès par l'état civil gabonais et est nécessaire pour les procédures de succession.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de décès français",
          "Copie de l'acte de naissance du défunt",
          "Copie du passeport du défunt",
          "Copie de la carte consulaire du défunt",
          "Copie de la pièce d'identité du déclarant",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 10,
      },
      {
        title: "Attestation de Rapatriement de Corps",
        slug: "rapatriement-corps",
        description: "Document administratif nécessaire pour le rapatriement de la dépouille d'un ressortissant gabonais décédé en France vers le Gabon.",
        category: ServiceCategory.Assistance,
        requirements: [
          "Copie de l'acte de décès (délivré par la mairie française)",
          "Copie du passeport du défunt",
          "Copie de la carte consulaire du défunt",
          "Certificat de non-contagion (délivré par un médecin)",
          "Certificat de mise en bière hermétique",
          "Autorisation de transport du corps (délivrée par la préfecture)",
          "Copie de la pièce d'identité de la personne prenant en charge les formalités",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Variable (procédure complexe)",
        isUrgent: true,
        notes: "Procédure complexe impliquant plusieurs administrations françaises et gabonaises. Le consulat accompagne les familles dans l'ensemble des démarches.",
        isOnline: false,
        isActive: true,
        order: 11,
      },

      // ============================================
      // 5. ATTESTATIONS & CERTIFICATS
      // ============================================
      {
        title: "Attestation de Concordance",
        slug: "attestation-concordance",
        description: "Certifie qu'une même personne est désignée sous des noms ou prénoms différents dans différents documents. Utile pour les démarches administratives où les documents présentent des incohérences.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie des documents présentant les divergences",
          "Copie de l'acte de naissance",
          "Copie du passeport",
          "Tout document prouvant qu'il s'agit de la même personne",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 12,
      },
      {
        title: "Fiche Familiale d'État Civil",
        slug: "fiche-familiale",
        description: "Document récapitulant la composition familiale d'un ressortissant gabonais (conjoint, enfants). Utilisée pour les démarches administratives, sociales et fiscales en France.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de mariage",
          "Copie des actes de naissance de tous les enfants",
          "Copie du passeport du demandeur",
          "Copie du titre de séjour",
          "Copie du livret de famille",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 13,
      },
      {
        title: "Certificat de Nationalité",
        slug: "certificat-nationalite",
        description: "Document officiel attestant que le titulaire possède la nationalité gabonaise. Peut être exigé pour certaines démarches administratives ou juridiques.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de naissance",
          "Copie du passeport gabonais",
          "Copie des actes de naissance des parents (pour prouver la filiation)",
          "Copie du certificat de nationalité des parents (si disponible)",
          "2 photos d'identité",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 14,
      },
      {
        title: "Attestation de Revenus",
        slug: "attestation-revenus",
        description: "Atteste des revenus perçus par un ressortissant gabonais. Peut être requise pour des démarches au Gabon (succession, demande de prêt, etc.).",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du passeport",
          "Copie du titre de séjour",
          "Justificatifs de revenus (bulletins de salaire, avis d'imposition, attestation employeur)",
          "Justificatif de domicile",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 15,
      },
      {
        title: "Attestation de Validité du Permis de Conduire",
        slug: "attestation-permis",
        description: "Atteste de la validité d'un permis de conduire gabonais pour les démarches d'échange de permis en France ou pour toute utilisation administrative.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du permis de conduire gabonais",
          "Copie du passeport",
          "Copie du titre de séjour",
          "Justificatif de domicile",
          "Traduction assermentée du permis de conduire (si nécessaire)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 16,
      },
      {
        title: "Attestation de Capacité Juridique",
        slug: "attestation-capacite-juridique",
        description: "Certifie qu'une personne jouit de sa pleine capacité juridique (n'est pas sous tutelle, curatelle ou interdiction). Utile pour les transactions immobilières, les procurations, les actes notariés.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de naissance",
          "Copie du passeport",
          "Copie du titre de séjour",
          "Attestation sur l'honneur de capacité juridique",
          "Justificatif de domicile",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 17,
      },
      {
        title: "Certificat de Vie et d'Entretien",
        slug: "certificat-vie-entretien",
        description: "Atteste qu'une personne est en vie et, le cas échéant, qu'elle est prise en charge par un tiers. Requis par les caisses de retraite, les organismes sociaux ou pour des démarches de succession.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du passeport",
          "Copie du titre de séjour",
          "Justificatif de domicile",
          "Formulaire de l'organisme demandeur (le cas échéant)",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "Immédiat",
        notes: "La présence physique du demandeur au consulat est généralement requise.",
        isOnline: false,
        isActive: true,
        order: 18,
      },

      // ============================================
      // 6. AUTRES SERVICES
      // ============================================
      {
        title: "Légalisation de Documents",
        slug: "legalisation",
        description: "Authentification de la signature apposée sur un document d'origine gabonaise pour qu'il soit reconnu valide en France, ou inversement. La légalisation confirme que le signataire avait qualité pour signer.",
        category: ServiceCategory.Other,
        requirements: [
          "Original du document à légaliser",
          "Copie du passeport du demandeur",
          "Copie du titre de séjour",
        ],
        price: "Selon grille tarifaire consulaire",
        delay: "24h à 48h",
        isOnline: false,
        isActive: true,
        order: 19,
      },
      {
        title: "Demande d'Audience",
        slug: "demande-audience",
        description: "Sollicitation d'un rendez-vous avec le Consul Général pour toute question consulaire ou administrative.",
        category: ServiceCategory.Other,
        requirements: [
          "Demande manuscrite ou email motivé",
          "Pièce d'identité",
          "Objet détaillé de la demande",
        ],
        price: "Gratuit",
        delay: "Sur rendez-vous",
        isOnline: false,
        isActive: true,
        order: 20,
      },
    ];

    for (const s of services) {
      await ctx.db.insert("services", s);
    }

    // ==========================================
    // POSTS (Actualités)
    // ==========================================
    const existingPosts = await ctx.db.query("posts").take(1);
    if (existingPosts.length > 0) {
      const all = await ctx.db.query("posts").collect();
      for (const p of all) {
        await ctx.db.delete(p._id);
      }
    }

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const posts = [
      {
        title: "Fermeture exceptionnelle du Consulat le 17 Août 2025",
        slug: "fermeture-17-aout-2025",
        excerpt: "À l'occasion de la Fête Nationale du Gabon, le Consulat Général sera fermé le vendredi 17 août 2025.",
        content: `# Fermeture Fête Nationale

À l'occasion de la célébration de la **Fête Nationale du Gabon** (Jour de l'Indépendance), le Consulat Général du Gabon en France sera exceptionnellement fermé le **vendredi 17 août 2025**.

## Réouverture
Le Consulat reprendra ses activités normales le **lundi 20 août 2025** à partir de 9h00.

## Urgences consulaires
En cas d'urgence consulaire absolue (décès, hospitalisation grave, rapatriement), vous pouvez contacter le numéro d'urgence :
**+33 1 42 99 68 57**

Nous vous souhaitons une excellente Fête Nationale.`,
        category: "communique" as const,
        publishedAt: now - (2 * day),
        status: "published" as const,
      },
      {
        title: "Nouvelle procédure de demande de passeport en ligne",
        slug: "nouvelle-procedure-passeport-ligne",
        excerpt: "Le Consulat modernise ses démarches : la prise de rendez-vous pour les passeports est désormais disponible en ligne.",
        content: `# Procédure modernisée de demande de passeport

Le Consulat Général du Gabon en France a le plaisir d'annoncer la mise en place d'un nouveau système de **prise de rendez-vous en ligne** pour les demandes de passeport biométrique.

## Comment ça marche ?

1. **Rendez-vous sur** [ae.dgdifrance.fr/booking](https://ae.dgdifrance.fr/booking)
2. Sélectionnez "Passeport Biométrique"
3. Choisissez un créneau disponible
4. Recevez votre confirmation par email

## Avantages
- Plus d'attente au Consulat
- Choix du créneau selon vos disponibilités
- Rappel automatique avant le rendez-vous

## Pièces à fournir
N'oubliez pas de vous munir de l'ensemble des documents requis le jour de votre rendez-vous.

Pour toute question, contactez-nous au 01 42 99 68 68.`,
        category: "actualite" as const,
        publishedAt: now - (5 * day),
        status: "published" as const,
      },
      {
        title: "Cérémonie de vœux 2025 de la communauté gabonaise",
        slug: "ceremonie-voeux-2025",
        excerpt: "Le Consul Général invite tous les ressortissants gabonais à la traditionnelle cérémonie des vœux le samedi 25 janvier 2025.",
        content: `# Cérémonie de Vœux 2025

Madame l'Ambassadeur du Gabon en France et Monsieur le Consul Général ont le plaisir de convier l'ensemble de la communauté gabonaise de France à la **traditionnelle cérémonie de présentation des vœux**.

## Informations pratiques

- **Date** : Samedi 25 janvier 2025
- **Heure** : 15h00 - 18h00
- **Lieu** : Consulat Général du Gabon, 29 rue Galilée, 75116 Paris

## Programme
- 15h00 : Accueil
- 15h30 : Discours de Madame l'Ambassadeur
- 16h00 : Mot du Consul Général
- 16h30 : Cocktail et échanges

## Inscription
Pour des raisons d'organisation, merci de confirmer votre présence avant le 20 janvier 2025.

Au plaisir de vous retrouver !`,
        category: "evenement" as const,
        publishedAt: now - (10 * day),
        status: "published" as const,
      },
      {
        title: "Élections présidentielles 2025 : Inscription sur les listes électorales",
        slug: "inscription-listes-electorales-2025",
        excerpt: "Les Gabonais de France peuvent s'inscrire sur les listes électorales consulaires jusqu'au 31 mars 2025.",
        content: `# Inscription sur les listes électorales

En prévision des prochaines **élections présidentielles**, le Consulat Général invite tous les citoyens gabonais résidant en France à vérifier leur inscription sur les listes électorales.

## Délai d'inscription
La date limite d'inscription est fixée au **31 mars 2025**.

## Conditions
- Être de nationalité gabonaise
- Être majeur (18 ans révolus)
- Jouir de ses droits civiques et politiques
- Être immatriculé au Consulat (carte consulaire)

## Documents requis
- Passeport gabonais en cours de validité
- Carte consulaire
- Justificatif de domicile en France

## Comment s'inscrire ?
Présentez-vous au Consulat avec vos documents ou envoyez un dossier complet par courrier recommandé.

**Exercez votre droit de vote !**`,
        category: "actualite" as const,
        publishedAt: now - (15 * day),
        status: "published" as const,
      },
      {
        title: "Atelier d'information sur le Code de la Nationalité",
        slug: "atelier-code-nationalite",
        excerpt: "Le Consulat organise un atelier d'information sur le Code de la Nationalité Gabonaise le 15 février 2025.",
        content: `# Atelier sur le Code de la Nationalité

Le Consulat Général organise un **atelier d'information** destiné aux couples mixtes et aux parents d'enfants binationaux.

## Thèmes abordés
- Acquisition de la nationalité gabonaise
- Transmission de la nationalité aux enfants
- Double nationalité : droits et obligations
- Questions / Réponses avec un juriste

## Informations pratiques
- **Date** : Samedi 15 février 2025
- **Heure** : 10h00 - 12h30
- **Lieu** : Salle de conférence du Consulat

## Inscription
Atelier gratuit, sur inscription préalable.
Contactez-nous par email : contact@consulatgabonfrance.com

Places limitées à 30 personnes.`,
        category: "evenement" as const,
        publishedAt: now - (20 * day),
        status: "published" as const,
      }
    ];

    for (const p of posts) {
      await ctx.db.insert("posts", p);
    }

    // ==========================================
    // ANNOUNCEMENTS (Banner)
    // ==========================================
    const existingAnnouncements = await ctx.db.query("announcements").take(1);
    if (existingAnnouncements.length > 0) {
      const all = await ctx.db.query("announcements").collect();
      for (const a of all) {
        await ctx.db.delete(a._id);
      }
    }

    const announcements = [
      {
        message: "Le Consulat est ouvert du lundi au vendredi de 9h00 à 16h00. Rendez-vous obligatoire pour les passeports.",
        type: "info" as const,
        isActive: true,
        link: "/services/passeport",
      }
    ];

    for (const a of announcements) {
      await ctx.db.insert("announcements", a);
    }

    return `Seeded ${services.length} services, ${posts.length} posts, ${announcements.length} announcements`;
  },
});
