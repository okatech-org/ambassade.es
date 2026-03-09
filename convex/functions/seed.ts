import { mutation } from "../_generated/server";
import { ServiceCategory } from "../lib/constants";

/**
 * ⚠️  SEED GUARD — This mutation is disabled in production.
 *     It deletes ALL existing data before re-seeding.
 *     Only run in development via the Convex dashboard.
 */
export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // ── Production guard ──────────────────────────────────
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      throw new Error(
        "🚫 Seed mutation is disabled in production. " +
        "Set NODE_ENV to something other than 'production' to run this."
      );
    }

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
        description: "Document d'identification des ressortissants gabonais résidant en Espagne. Gratuit et fortement recommandé pour tout Gabonais vivant sur le territoire du Royaume d'Espagne.",
        category: ServiceCategory.Identity,
        requirements: [
          "1 copie de l'acte de naissance (datant de moins de 6 mois)",
          "1 copie du passeport en cours de validité",
          "1 copie du permis de séjour en cours de validité (NIE)",
          "1 justificatif de domicile récent",
          "2 photos d'identité (format officiel)",
        ],
        delay: "Selon disponibilité",
        validity: "3 ans",
        isOnline: false,
        isActive: true,
        order: 1,
      },
      {
        title: "Tenant Lieu de Passeport",
        slug: "tenant-lieu-passeport",
        description: "Document provisoire de voyage délivré par l'Ambassade en remplacement d'un passeport perdu, volé ou expiré. Valide 1 an, délivré en attendant un nouveau passeport.",
        category: ServiceCategory.Identity,
        requirements: [
          "Déclaration de perte ou de vol (récépissé de la police — denuncia)",
          "1 copie de l'ancien passeport (si disponible)",
          "1 copie de l'acte de naissance",
          "1 copie du permis de séjour (TIE)",
          "1 justificatif de domicile",
          "2 photos d'identité",
        ],
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
          "Déclaration de perte ou de vol du passeport (denuncia)",
          "1 copie de l'acte de naissance",
          "1 copie du permis de séjour (si applicable)",
          "1 justificatif de domicile",
          "2 photos d'identité",
          "Justificatif du motif du voyage (billet d'avion, certificat médical, etc.)",
        ],
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
        delay: "Immédiat (dossier complet)",
        isOnline: false,
        isActive: true,
        order: 4,
      },
      {
        title: "Transcription de l'Acte de Naissance",
        slug: "transcription-naissance",
        description: "Enregistrement dans les registres consulaires d'un acte de naissance établi en Espagne. Obligatoire pour que l'état civil gabonais reconnaisse la naissance.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de naissance espagnol (délivrée par le Registro Civil)",
          "Copie des pièces d'identité des deux parents",
          "Copie de l'acte de mariage des parents (si mariés)",
          "Copie du livret de famille",
          "Copie des permis de séjour des parents",
          "2 photos d'identité de l'enfant (si applicable)",
        ],
        delay: "Immédiat (dossier complet)",
        isOnline: true,
        isActive: true,
        order: 5,
      },
      {
        title: "Attestation de Filiation",
        slug: "attestation-filiation",
        description: "Établit officiellement le lien de filiation entre un enfant et ses parents. Nécessaire pour les démarches de regroupement familial (reagrupación familiar), de succession ou d'état civil.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie de l'acte de naissance de l'enfant",
          "Copie des actes de naissance des parents",
          "Copie du livret de famille",
          "Copie des passeports des parents et de l'enfant",
          "Acte de reconnaissance (si applicable)",
        ],
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
        description: "Le certificat de coutume atteste des dispositions du droit gabonais en matière de mariage. Le certificat de célibat atteste que le ressortissant n'est pas engagé dans les liens du mariage au Gabon. Requis pour un mariage au Registro Civil espagnol.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie de l'acte de naissance (moins de 6 mois)",
          "Copie du passeport",
          "Copie du permis de séjour (TIE)",
          "Copie de la pièce d'identité du futur conjoint (certificat de coutume)",
          "Justificatif de domicile (empadronamiento)",
          "Attestation sur l'honneur de célibat (certificat de célibat)",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 7,
      },
      {
        title: "Transcription de l'Acte de Mariage",
        slug: "transcription-mariage",
        description: "Enregistrement dans les registres consulaires d'un mariage célébré en Espagne. Permet la reconnaissance du mariage par l'état civil gabonais.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de mariage espagnol (Registro Civil)",
          "Copie des actes de naissance des deux époux",
          "Copie des passeports des deux époux",
          "Copie des permis de séjour",
          "Copie du livret de famille espagnol (si délivré)",
          "Certificat de coutume (si le mariage a été célébré avec un certificat de coutume gabonais)",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 8,
      },
      {
        title: "Mariage",
        slug: "mariage",
        description: "Formalités pour les mariages célébrés à l'Ambassade ou en mairie espagnole (Registro Civil).",
        category: ServiceCategory.CivilStatus,
        requirements: [],
        delay: "Sur rendez-vous",
        isOnline: false,
        isActive: true,
        order: 9,
      },
      {
        title: "Célébration du Mariage à l'Ambassade",
        slug: "celebration-mariage",
        description: "L'Ambassade peut célébrer des mariages entre deux ressortissants gabonais, conformément au droit gabonais. La célébration a lieu exclusivement dans les locaux de l'Ambassade.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Actes de naissance des deux époux (moins de 6 mois)",
          "Copie des passeports gabonais des deux époux",
          "Copie des permis de séjour",
          "Certificat de célibat pour chaque époux",
          "Certificat de coutume",
          "Certificat médical prénuptial",
          "Justificatifs de domicile (empadronamiento)",
          "Liste des témoins (2 minimum, 4 maximum) avec copies de leurs pièces d'identité",
          "Publication des bans (au moins 10 jours avant la date de célébration)",
        ],
        delay: "Minimum 10 jours (publication des bans)",
        isOnline: false,
        isActive: true,
        order: 10,
      },

      // ============================================
      // 4. ÉTAT CIVIL — DÉCÈS
      // ============================================
      {
        title: "Transcription de l'Acte de Décès",
        slug: "transcription-deces",
        description: "Enregistrement dans les registres consulaires d'un décès survenu en Espagne. Permet la reconnaissance du décès par l'état civil gabonais et est nécessaire pour les procédures de succession.",
        category: ServiceCategory.CivilStatus,
        requirements: [
          "Copie intégrale de l'acte de décès espagnol (Registro Civil)",
          "Copie de l'acte de naissance du défunt",
          "Copie du passeport du défunt",
          "Copie de la carte consulaire du défunt",
          "Copie de la pièce d'identité du déclarant",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 11,
      },
      {
        title: "Attestation de Rapatriement de Corps",
        slug: "rapatriement-corps",
        description: "Document administratif nécessaire pour le rapatriement de la dépouille d'un ressortissant gabonais décédé en Espagne vers le Gabon.",
        category: ServiceCategory.Assistance,
        requirements: [
          "Copie de l'acte de décès (délivré par le Registro Civil espagnol)",
          "Copie du passeport du défunt",
          "Copie de la carte consulaire du défunt",
          "Certificat de non-contagion (délivré par un médecin)",
          "Certificat de mise en bière hermétique",
          "Autorisation de transport du corps (délivrée par les autorités espagnoles)",
          "Copie de la pièce d'identité de la personne prenant en charge les formalités",
        ],
        delay: "Variable (procédure complexe)",
        isUrgent: true,
        notes: "Procédure complexe impliquant plusieurs administrations espagnoles et gabonaises. L'Ambassade accompagne les familles dans l'ensemble des démarches.",
        isOnline: false,
        isActive: true,
        order: 12,
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
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 13,
      },
      {
        title: "Fiche Familiale d'État Civil",
        slug: "fiche-familiale",
        description: "Document récapitulant la composition familiale d'un ressortissant gabonais (conjoint, enfants). Utilisée pour les démarches administratives, sociales et fiscales en Espagne.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de mariage",
          "Copie des actes de naissance de tous les enfants",
          "Copie du passeport du demandeur",
          "Copie du permis de séjour (TIE)",
          "Copie du livret de famille",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 14,
      },
      {
        title: "Certificat de Nationalité",
        slug: "certificat-nationalite",
        description: "Document officiel attestant que le titulaire possède la nationalité gabonaise. Peut être exigé pour certaines démarches administratives ou juridiques en Espagne.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de naissance",
          "Copie du passeport gabonais",
          "Copie des actes de naissance des parents (pour prouver la filiation)",
          "Copie du certificat de nationalité des parents (si disponible)",
          "2 photos d'identité",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 15,
      },
      {
        title: "Attestation de Revenus",
        slug: "attestation-revenus",
        description: "Atteste des revenus perçus par un ressortissant gabonais. Peut être requise pour des démarches au Gabon (succession, demande de prêt, etc.).",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du passeport",
          "Copie du permis de séjour (TIE)",
          "Justificatifs de revenus (nóminas, declaración de la renta, certificat employeur)",
          "Justificatif de domicile (empadronamiento)",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 16,
      },
      {
        title: "Attestation de Validité du Permis de Conduire",
        slug: "attestation-permis",
        description: "Atteste de la validité d'un permis de conduire gabonais pour les démarches d'échange de permis en Espagne (via la DGT — Dirección General de Tráfico).",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du permis de conduire gabonais",
          "Copie du passeport",
          "Copie du permis de séjour (TIE)",
          "Justificatif de domicile (empadronamiento)",
          "Traduction assermentée du permis de conduire (si nécessaire)",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 17,
      },
      {
        title: "Attestation de Capacité Juridique",
        slug: "attestation-capacite-juridique",
        description: "Certifie qu'une personne jouit de sa pleine capacité juridique (n'est pas sous tutelle, curatelle ou interdiction). Utile pour les transactions immobilières, les procurations, les actes notariés en Espagne.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie de l'acte de naissance",
          "Copie du passeport",
          "Copie du permis de séjour (TIE)",
          "Attestation sur l'honneur de capacité juridique",
          "Justificatif de domicile (empadronamiento)",
        ],
        delay: "Selon disponibilité",
        isOnline: false,
        isActive: true,
        order: 18,
      },
      {
        title: "Certificat de Vie et d'Entretien",
        slug: "certificat-vie-entretien",
        description: "Atteste qu'une personne est en vie et, le cas échéant, qu'elle est prise en charge par un tiers. Requis par les caisses de retraite, les organismes sociaux ou pour des démarches de succession.",
        category: ServiceCategory.Certification,
        requirements: [
          "Copie du passeport",
          "Copie du permis de séjour (TIE)",
          "Justificatif de domicile (empadronamiento)",
          "Formulaire de l'organisme demandeur (le cas échéant)",
        ],
        delay: "Immédiat",
        notes: "La présence physique du demandeur à l'Ambassade est généralement requise.",
        isOnline: false,
        isActive: true,
        order: 19,
      },

      // ============================================
      // 6. AUTRES SERVICES
      // ============================================
      {
        title: "Légalisation de Documents",
        slug: "legalisation",
        description: "Authentification de la signature apposée sur un document d'origine gabonaise pour qu'il soit reconnu valide en Espagne, ou inversement. La légalisation confirme que le signataire avait qualité pour signer.",
        category: ServiceCategory.Other,
        requirements: [
          "Original du document à légaliser",
          "Copie du passeport du demandeur",
          "Copie du permis de séjour (TIE)",
        ],
        delay: "24h à 48h",
        isOnline: false,
        isActive: true,
        order: 20,
      },
      {
        title: "Demande d'Audience",
        slug: "demande-audience",
        description: "Sollicitation d'un rendez-vous avec l'Ambassadeur pour toute question consulaire ou administrative.",
        category: ServiceCategory.Other,
        requirements: [
          "Demande manuscrite ou email motivé",
          "Pièce d'identité",
          "Objet détaillé de la demande",
        ],
        delay: "Sur rendez-vous",
        isOnline: false,
        isActive: true,
        order: 21,
      },
      {
        title: "PACS",
        slug: "pacs",
        description: "Information sur le Pacte Civil de Solidarité. Note : le PACS n'est pas reconnu par la législation gabonaise. L'Ambassade fournit des informations sur les implications juridiques.",
        category: ServiceCategory.Other,
        requirements: [],
        delay: "Sur rendez-vous",
        isOnline: false,
        isActive: true,
        order: 22,
      },
      {
        title: "Divorce",
        slug: "divorce",
        description: "Informations sur la procédure de divorce et la procédure d'exequatur pour la reconnaissance d'un divorce prononcé en Espagne par les autorités gabonaises.",
        category: ServiceCategory.Other,
        requirements: [],
        delay: "Sur rendez-vous",
        isOnline: false,
        isActive: true,
        order: 23,
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
        title: "S.E. Madame Allegra Pamela Bongo nommée Ambassadeur du Gabon en Espagne",
        slug: "nomination-ambassadeur-bongo-espagne",
        excerpt: "Son Excellence Madame Allegra Pamela Bongo a été nommée Ambassadeur de la République Gabonaise près le Royaume d'Espagne.",
        content: `# Nomination de S.E. Madame Allegra Pamela Bongo

Son Excellence **Madame Allegra Pamela Bongo** a été nommée **Ambassadeur de la République Gabonaise** près le Royaume d'Espagne.

## Prise de fonctions

L'Ambassadeur a pris ses fonctions à Madrid, marquant un nouveau chapitre dans les relations bilatérales entre le Gabon et l'Espagne.

## Missions

L'Ambassade du Gabon en Espagne, sous la direction de S.E. Madame Bongo, a pour missions de :
- Renforcer les **relations diplomatiques** entre le Gabon et l'Espagne
- Protéger les intérêts des **ressortissants gabonais** résidant en Espagne
- Promouvoir la **coopération économique et culturelle** bilatérale
- Assurer les **services consulaires** pour la communauté gabonaise

## Contact

L'Ambassade est située à la **Calle de la Silva, 2 — 28013 Madrid**.`,
        category: "communique" as const,
        publishedAt: now - (3 * day),
        status: "published" as const,
        coverImage: "/images/ambassadeur_es.jpg",
      },
      {
        title: "Élection présidentielle du 12 avril 2025 : Brice Clotaire Oligui Nguema élu Président",
        slug: "election-presidentielle-avril-2025",
        excerpt: "Le Gabon a élu son nouveau président lors du scrutin du 12 avril 2025, marquant la fin de la transition politique et le retour à l'ordre constitutionnel.",
        content: `# Élection présidentielle du 12 avril 2025

Le **12 avril 2025**, les Gabonais se sont rendus aux urnes pour élire leur nouveau président dans le cadre du retour à l'ordre constitutionnel civil.

## Résultats

**Brice Clotaire Oligui Nguema**, qui a dirigé la transition depuis le 30 août 2023, a été élu Président de la République Gabonaise.

## Fin de la transition

Le **Comité pour la Transition et la Restauration des Institutions (CTRI)** a été officiellement dissous le **2 mai 2025**, la veille de l'investiture du président élu.

## Participation de la diaspora en Espagne

Les Gabonais d'Espagne ont pu exercer leur droit de vote dans les bureaux de vote mis en place par l'Ambassade à Madrid. La mobilisation de la communauté gabonaise en Espagne a été saluée par les autorités.

## Nouvelle ère

Cette élection marque le début de la **5ème République gabonaise**, instituée par la nouvelle Constitution adoptée par référendum en novembre 2024.`,
        category: "actualite" as const,
        publishedAt: now - (5 * day),
        status: "published" as const,
        coverImage: "/images/actualites/election-presidentielle-2025.png",
      },
      {
        title: "Lancement du e-Visa touristique gratuit du 1er juillet au 30 septembre 2025",
        slug: "lancement-evisa-touristique-gratuit",
        excerpt: "Le Gabon lance un e-Visa touristique gratuit dans le cadre de la Caravane Touristique, accessible en ligne via le portail de la DGDI en moins de 48 heures.",
        content: `# E-Visa Touristique Gratuit

Dans le cadre de la **Caravane Touristique du Gabon**, le gouvernement a lancé un **e-Visa touristique entièrement gratuit** du **1er juillet au 30 septembre 2025**.

## Comment en bénéficier ?

1. Rendez-vous sur le portail officiel de la DGDI : **edgdi.dgdi.ga**
2. Remplissez le formulaire de demande en ligne
3. Joignez les documents requis (copie du passeport, photo d'identité)
4. Recevez votre e-Visa en **moins de 48 heures**

## Conditions

- Passeport valide au moins 6 mois après la date d'entrée
- Certificat de vaccination contre la fièvre jaune obligatoire
- Confirmation d'hébergement

## Pour les résidents en Espagne

Les ressortissants espagnols et les résidents en Espagne souhaitant visiter le Gabon peuvent bénéficier de ce dispositif simplifié. Pour plus d'informations, contactez l'Ambassade du Gabon à Madrid.`,
        category: "actualite" as const,
        publishedAt: now - (8 * day),
        status: "published" as const,
        coverImage: "/images/actualites/evisa-touristique.png",
      },
      {
        title: "65ème anniversaire de l'Indépendance du Gabon — Célébrations du 17 août 2025",
        slug: "65eme-anniversaire-independance-gabon",
        excerpt: "Le Gabon célèbre le 65ème anniversaire de son Indépendance le 17 août 2025, ainsi que le 2ème anniversaire de la Journée nationale de la Libération le 30 août.",
        content: `# 65ème Anniversaire de l'Indépendance

Le **17 août 2025**, la République Gabonaise a célébré le **65ème anniversaire de son Indépendance**, un événement majeur pour l'ensemble de la nation gabonaise.

## Double célébration

Le mois d'août 2025 a été marqué par une double célébration :
- **17 août** : 65ème anniversaire de l'Indépendance
- **30 août** : 2ème anniversaire de la Journée nationale de la Libération

## Célébrations en Espagne

L'Ambassade du Gabon en Espagne a organisé des festivités pour permettre à la communauté gabonaise d'Espagne de commémorer ces dates importantes.

## Programme

- Cérémonie officielle de levée des couleurs
- Discours de S.E. Madame Allegra Pamela Bongo
- Cocktail républicain
- Animations culturelles

## Message d'unité

Ces célébrations ont été placées sous le signe de l'unité nationale et du renouveau, dans le contexte du retour à l'ordre constitutionnel après la période de transition.`,
        category: "evenement" as const,
        publishedAt: now - (12 * day),
        status: "published" as const,
        coverImage: "/images/actualites/independance-65.png",
        eventDate: new Date("2025-08-17").getTime(),
        eventTime: "10h00 - 18h00",
        eventLocation: "Ambassade du Gabon en Espagne",
        eventAddress: "Calle de la Silva, 2 — 28013 Madrid",
      },
      {
        title: "Représentation de la diaspora à l'Assemblée nationale : une avancée historique",
        slug: "diaspora-representation-assemblee-nationale",
        excerpt: "L'article 221 du projet de loi électorale prévoit désormais la représentation des Gabonais de l'étranger à l'Assemblée nationale.",
        content: `# Représentation de la Diaspora à l'Assemblée Nationale

Une avancée historique pour la diaspora gabonaise : l'**article 221 du projet de loi électorale** prévoit désormais la **représentation des Gabonais de l'étranger à l'Assemblée nationale**.

## Ce que cela change

Pour la première fois, les Gabonais résidant hors du territoire national pourront être représentés directement au sein de l'institution parlementaire.

## Réactions

La **Confédération de la Diaspora Gabonaise Multi-continentale G10** a salué cette avancée comme « une reconnaissance historique du poids et de l'engagement des Gabonais de l'étranger ».

## Élections législatives 2025

La 2ème circonscription couvrant l'**Europe, l'Asie, l'Amérique et l'Océanie** inclut les Gabonais résidant en Espagne.

## Implications pour les Gabonais d'Espagne

Les ressortissants gabonais en Espagne sont invités à :
- Vérifier leur inscription sur les listes électorales
- Se rapprocher de l'Ambassade pour toute information
- Participer activement au processus démocratique`,
        category: "actualite" as const,
        publishedAt: now - (18 * day),
        status: "published" as const,
        coverImage: "/images/depute_dispora_gabon.jpg",
      },
      {
        title: "Relations bilatérales Gabon-Espagne : renforcement de la coopération",
        slug: "relations-bilaterales-gabon-espagne",
        excerpt: "L'Ambassade du Gabon en Espagne œuvre au renforcement des relations bilatérales dans les domaines économique, culturel et touristique.",
        content: `# Relations Bilatérales Gabon-Espagne

L'Ambassade du Gabon en Espagne poursuit activement le renforcement des relations bilatérales entre les deux pays.

## Axes de coopération

### Coopération économique
- Promotion des opportunités d'investissement au Gabon
- Participation à la **FITUR** (Feria Internacional de Turismo) à Madrid
- Rencontres B2B entre entrepreneurs gabonais et espagnols

### Coopération culturelle
- Événements culturels célébrant la diversité gabonaise
- Échanges universitaires entre établissements espagnols et gabonais

### Tourisme
- Promotion du Gabon comme destination éco-touristique
- Le Gabon abrite 13 parcs nationaux couvrant 11% du territoire

## Diplomatie économique

L'Ambassade accompagne les entrepreneurs et investisseurs espagnols intéressés par le marché gabonais. Pour plus d'informations, contactez-nous à **contact@ambassadegabon.es**.`,
        category: "communique" as const,
        publishedAt: now - (22 * day),
        status: "published" as const,
        coverImage: "/images/actualites/cooperation-gabon-espagne.png",
      },
      {
        title: "Référendum constitutionnel : adoption de la nouvelle Constitution de la 5ème République",
        slug: "referendum-constitution-5eme-republique",
        excerpt: "Les Gabonais ont approuvé par référendum en novembre 2024 la nouvelle Constitution instituant la 5ème République gabonaise.",
        content: `# Nouvelle Constitution de la 5ème République

En **novembre 2024**, les citoyens gabonais ont été appelés à se prononcer par référendum sur un projet de nouvelle Constitution. Le texte a été **adopté**, instituant ainsi la **5ème République gabonaise**.

## Principales dispositions

La nouvelle Constitution introduit plusieurs réformes majeures :
- Renforcement de l'État de droit et des libertés fondamentales
- Modernisation des institutions républicaines
- Encadrement des mandats présidentiels
- Représentation de la diaspora au Parlement

## Participation de la diaspora en Espagne

Les Gabonais d'Espagne ont pu voter dans les bureaux de vote ouverts à l'Ambassade. Le taux de participation de la diaspora a été significatif, témoignant de l'engagement civique des Gabonais de l'étranger.

## Entrée en vigueur

La nouvelle Constitution est entrée en vigueur en 2025, jetant les bases d'un nouveau cadre institutionnel pour le Gabon.`,
        category: "actualite" as const,
        publishedAt: now - (30 * day),
        status: "published" as const,
        coverImage: "/images/actualites/referendum-constitution.png",
      },
      {
        title: "Rappel : la carte consulaire est gratuite et recommandée pour tout Gabonais en Espagne",
        slug: "carte-consulaire-gratuite-recommandee",
        excerpt: "L'Ambassade rappelle à tous les ressortissants gabonais en Espagne que la carte consulaire est un document gratuit et fortement recommandé.",
        content: `# Carte Consulaire : Gratuite et Recommandée

L'Ambassade du Gabon en Espagne rappelle à l'ensemble des ressortissants gabonais résidant sur le territoire espagnol que la **carte consulaire** est un document **gratuit** et **fortement recommandé**.

## Pourquoi la carte consulaire ?

La carte consulaire est votre document d'identification auprès de l'Ambassade. Elle vous permet de :
- Accéder à l'ensemble des **services consulaires**
- Être **recensé** au sein de la communauté gabonaise d'Espagne
- Être **inscrit sur les listes électorales** consulaires
- Bénéficier de l'**assistance consulaire** en cas d'urgence
- Obtenir rapidement des **documents administratifs**

## Pièces à fournir

- 1 copie de l'acte de naissance (datant de moins de 6 mois)
- 1 copie du passeport en cours de validité
- 1 copie du permis de séjour en cours de validité (NIE/TIE)
- 1 justificatif de domicile récent (empadronamiento)
- 2 photos d'identité (format officiel)

## Où et comment ?

Présentez-vous à l'**Ambassade du Gabon en Espagne** muni des pièces requises :

📍 Calle de la Silva, 2 — 28013 Madrid
📧 contact@ambassadegabon.es

**Aucun frais n'est demandé.** La démarche est entièrement gratuite.`,
        category: "communique" as const,
        publishedAt: now - (40 * day),
        status: "published" as const,
        coverImage: "/images/actualites/carte-consulaire-gratuite.png",
      },
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
        message: "L'Ambassade est ouverte du lundi au vendredi de 9h00 à 16h00. Contactez-nous par email à contact@ambassadegabon.es pour toute demande.",
        type: "info" as const,
        isActive: true,
        link: "/contact",
      }
    ];

    for (const a of announcements) {
      await ctx.db.insert("announcements", a);
    }

    return `Seeded ${services.length} services, ${posts.length} posts, ${announcements.length} announcements`;
  },
});
