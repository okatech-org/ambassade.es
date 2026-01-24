import { mutation } from "../_generated/server";

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear existing Data? (Safety: only if explicitly asked? No, just upsert or insert if empty)
    // For simplicity, I'll delete all services and recreate them.
    
    // Check if we already have services
    const existing = await ctx.db.query("services").take(1);
    if (existing.length > 0) {
      // return "Services already seeded"; // Uncomment to prevent overwrite
      // For dev: Clear all
      const all = await ctx.db.query("services").collect();
      for (const s of all) {
        await ctx.db.delete(s._id);
      }
    }

    const services = [
      {
        title: "Passeport Biométrique",
        slug: "passeport",
        description: "Renouvellement de passeport ordinaire pour les ressortissants gabonais.",
        category: "Identité",
        requirements: [
          "Formulaire NDP dûment rempli",
          "Ancien passeport (copie)",
          "Acte de naissance légalisé",
          "Carte consulaire",
          "Justificatif de domicile",
          "2 photos d'identité"
        ],
        actionLink: "https://ae.dgdifrance.fr/booking",
        isOnline: false,
        isActive: true,
        order: 1,
      },
      {
        title: "Visa",
        slug: "visa",
        description: "Demande de visa d'entrée au Gabon (Tourisme, Affaires, Visite familiale).",
        category: "Visa",
        requirements: [
          "Passeport en cours de validité (> 6 mois)",
          "Formulaire de demande",
          "Photo d'identité",
          "Réservation d'hôtel ou certificat d'hébergement",
          "Billet d'avion A/R",
          "Vaccin fièvre jaune"
        ],
        actionLink: "https://ae.dgdifrance.fr/booking",
        isOnline: false,
        isActive: true,
        order: 2,
      },
      {
        title: "Carte Consulaire",
        slug: "carte-consulaire",
        description: "Immatriculation consulaire obligatoire pour tout résident gabonais en France.",
        category: "Immatriculation",
        requirements: [
          "Formulaire en ligne",
          "Passeport valide",
          "Justificatif de domicile en France",
          "Photo d'identité",
          "Justificatif de statut (Titre de séjour, Etudiant...)"
        ],
        price: "Gratuit",
        actionLink: "https://www.consulatgabonfrance.com/demande-de-carte-consulaire/",
        isOnline: true,
        isActive: true,
        order: 3,
      },
      {
        title: "Mariage",
        slug: "mariage",
        description: "Célébration de mariage entre deux ressortissants gabonais (ou mixte selon cas).",
        category: "Etat Civil",
        requirements: [
          "Demande manuscrite",
          "Actes de naissance (< 3 mois)",
          "Certificats de célibat",
          "Certificats médicaux pré-nuptiaux",
          "Pièces d'identité"
        ],
        price: "250 €",
        delay: "10 jours (Publication des bans)",
        isOnline: false,
        isActive: true,
        order: 4,
      },
      {
        title: "Transcription Naissance",
        slug: "transcription-naissance",
        description: "Transcription de l'acte de naissance français dans les registres gabonais.",
        category: "Etat Civil",
        requirements: [
          "Formulaire de demande",
          "Copie intégrale de l'acte de naissance français",
          "Pièces d'identité des parents"
        ],
        delay: "Immédiat (si dossier complet)",
        isOnline: false, // Article says online since Jan 2024?
        actionLink: "https://app.consulatgabonfrance.com/dde-trans-acte-naissance",
        isActive: true,
        order: 5,
      },
      {
        title: "Laissez-passer / Tenant lieu",
        slug: "tenant-lieu-passeport",
        description: "Document de voyage provisoire en cas d'urgence ou de perte de passeport.",
        category: "Identité",
        requirements: [
          "Déclaration de perte (si applicable)",
          "Copie pièce d'identité ou acte de naissance",
          "2 photos",
          "Justificatif d'urgence (Billet avion...)"
        ],
        price: "55 €",
        delay: "48h - 72h",
        isOnline: false,
        isActive: true,
        order: 6,
      },
      {
        title: "Attestation Patronymique",
        slug: "attestation-patronymique",
        description: "Attestation pour le choix du nom de l'enfant (Code Civil Gabonais).",
        category: "Etat Civil",
        requirements: [
          "Pièces d'identité des parents"
        ],
        isOnline: false,
        isActive: true,
        order: 7,
      }
    ];

    for (const s of services) {
      await ctx.db.insert("services", s);
    }
    
    return `Seeded ${services.length} services`;
  },
});
