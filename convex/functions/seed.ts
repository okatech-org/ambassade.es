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
      {
        title: "Passeport Biométrique",
        slug: "passeport",
        description: "Demande ou renouvellement de passeport ordinaire pour les ressortissants gabonais.",
        category: ServiceCategory.Identity,
        requirements: [
          "Formulaire NDP dûment rempli",
          "Ancien passeport (original + copie)",
          "Acte de naissance légalisé (< 3 mois)",
          "Carte consulaire en cours de validité",
          "Justificatif de domicile (< 3 mois)",
          "2 photos d'identité (norme OACI)"
        ],
        price: "130 €",
        delay: "6 à 8 semaines",
        actionLink: "https://ae.dgdifrance.fr/booking",
        isOnline: false,
        isActive: true,
        order: 1,
      },
      {
        title: "Visa d'entrée au Gabon",
        slug: "visa",
        description: "Demande de visa d'entrée au Gabon pour les ressortissants étrangers (Tourisme, Affaires, Visite familiale).",
        category: ServiceCategory.Visa,
        requirements: [
          "Passeport en cours de validité (> 6 mois)",
          "Formulaire de demande de visa complété",
          "2 photos d'identité récentes",
          "Réservation d'hôtel ou attestation d'hébergement",
          "Billet d'avion aller-retour",
          "Certificat de vaccination fièvre jaune",
          "Justificatif de ressources financières"
        ],
        price: "70 € (court séjour) / 100 € (long séjour)",
        delay: "72h (dossier complet)",
        actionLink: "https://ae.dgdifrance.fr/booking",
        isOnline: false,
        isActive: true,
        order: 2,
      },
      {
        title: "Carte Consulaire",
        slug: "carte-consulaire",
        description: "Immatriculation consulaire obligatoire pour tout ressortissant gabonais résidant en France.",
        category: ServiceCategory.Registration,
        requirements: [
          "Passeport gabonais valide",
          "Justificatif de domicile en France (< 3 mois)",
          "Photo d'identité récente",
          "Justificatif de statut en France (titre de séjour, carte étudiant...)"
        ],
        price: "Gratuit",
        delay: "Immédiat",
        actionLink: "https://www.consulatgabonfrance.com/demande-de-carte-consulaire/",
        isOnline: true,
        isActive: true,
        order: 3,
      },
      {
        title: "Célébration de Mariage",
        slug: "mariage",
        description: "Célébration de mariage entre ressortissants gabonais ou mariage mixte au Consulat.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Demande manuscrite adressée au Consul Général",
          "Actes de naissance des époux (< 3 mois, légalisés)",
          "Certificats de célibat ou de non-remariage",
          "Certificats médicaux prénuptiaux (< 2 mois)",
          "Copies des pièces d'identité",
          "Justificatifs de domicile",
          "4 témoins majeurs avec pièces d'identité"
        ],
        price: "250 €",
        delay: "Minimum 10 jours (publication des bans)",
        isOnline: false,
        isActive: true,
        order: 4,
      },
      {
        title: "Transcription de Naissance",
        slug: "transcription-naissance",
        description: "Transcription d'un acte de naissance établi en France dans les registres d'état civil gabonais.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Formulaire de demande complété",
          "Copie intégrale de l'acte de naissance français (< 3 mois)",
          "Copies des passeports des deux parents",
          "Carte consulaire du parent gabonais"
        ],
        price: "Gratuit",
        delay: "Immédiat (dossier complet)",
        actionLink: "https://app.consulatgabonfrance.com/dde-trans-acte-naissance",
        isOnline: true,
        isActive: true,
        order: 5,
      },
      {
        title: "Laissez-passer / Tenant Lieu",
        slug: "laissez-passer",
        description: "Document de voyage provisoire en cas d'urgence ou de perte/vol de passeport.",
        category: ServiceCategory.Identity,
        requirements: [
          "Déclaration de perte ou de vol (commissariat)",
          "Copie pièce d'identité ou acte de naissance",
          "2 photos d'identité",
          "Justificatif d'urgence (billet d'avion, convocation...)"
        ],
        price: "55 €",
        delay: "24h à 72h",
        isOnline: false,
        isActive: true,
        order: 6,
      },
      {
        title: "Légalisation de Documents",
        slug: "legalisation",
        description: "Authentification de documents gabonais ou étrangers pour usage au Gabon.",
        category: ServiceCategory.Other, // Documents -> Other
        requirements: [
          "Document original à légaliser",
          "Copie du document",
          "Pièce d'identité du demandeur"
        ],
        price: "25 € par document",
        delay: "24h à 48h",
        isOnline: false,
        isActive: true,
        order: 7,
      },
      {
        title: "Attestation Patronymique",
        slug: "attestation-patronymique",
        description: "Attestation officielle pour le choix du nom de famille de l'enfant conformément au Code Civil Gabonais.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Pièces d'identité des deux parents",
          "Acte de mariage (si applicable)",
          "Acte de naissance de l'enfant"
        ],
        price: "15 €",
        delay: "Immédiat",
        isOnline: false,
        isActive: true,
        order: 8,
      },
      {
        title: "Certificat de Vie",
        slug: "certificat-vie",
        description: "Attestation de vie pour les pensionnés et retraités gabonais résidant en France.",
        category: ServiceCategory.Certification,

        requirements: [
          "Pièce d'identité valide",
          "Carte consulaire",
          "Formulaire de l'organisme de retraite (si requis)"
        ],
        price: "Gratuit",
        delay: "Immédiat",
        isOnline: false,
        isActive: true,
        order: 9,
      },
      {
        title: "Procuration",
        slug: "procuration",
        description: "Établissement de procurations pour diverses démarches au Gabon.",
        category: ServiceCategory.Certification,
        requirements: [
          "Pièce d'identité du mandant",
          "Informations complètes du mandataire",
          "Objet précis de la procuration"
        ],
        price: "30 €",
        delay: "24h",
        isOnline: false,
        isActive: true,
        order: 10,
      }
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
