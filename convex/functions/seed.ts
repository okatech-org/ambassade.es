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
        delay: "Selon disponibilité",
        validity: "3 ans",
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
        title: "S.E.M. Alfred Nguia Banda nommé Ambassadeur du Gabon en France",
        slug: "nomination-ambassadeur-nguia-banda",
        excerpt: "Le Conseil des ministres du 23 octobre 2025 a nommé S.E.M. Alfred Nguia Banda comme nouvel Ambassadeur Haut Représentant du Gabon en France et Représentant permanent auprès de l'OIF.",
        content: `# Nomination de S.E.M. Alfred Nguia Banda

Le Conseil des ministres, réuni le **23 octobre 2025**, a procédé à la nomination de **Son Excellence Monsieur Alfred Nguia Banda** au poste d'Ambassadeur Haut Représentant de la République Gabonaise auprès de la République Française et Représentant permanent du Gabon auprès de l'Organisation internationale de la Francophonie (OIF).

## Un retour symbolique

S.E.M. Alfred Nguia Banda succède à Madame Marie-Édith Tassyla Doumbeneny. Son retour en tant qu'ambassadeur est considéré comme un événement symbolique pour la diplomatie gabonaise.

## Prise de fonctions

L'Ambassadeur a officiellement pris ses fonctions le **11 février 2026**, marquant ainsi le début d'un nouveau chapitre dans les relations franco-gabonaises.

## Impact pour la communauté gabonaise

Cette nomination s'inscrit dans la volonté du Gabon de renforcer ses liens diplomatiques avec la France et d'améliorer les services rendus à la communauté gabonaise résidant sur le territoire français.

Le Consulat Général du Gabon en France se tient à la disposition des ressortissants pour toute information complémentaire.`,
        category: "communique" as const,
        publishedAt: now - (3 * day),
        status: "published" as const,
        coverImage: "/images/ambassadeur_fr.jpg",
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

Le **Comité pour la Transition et la Restauration des Institutions (CTRI)** a été officiellement dissous le **2 mai 2025**, la veille de l'investiture du président élu, mettant ainsi fin à sa mission.

## Participation de la diaspora

Les Gabonais de France ont pu exercer leur droit de vote dans les bureaux de vote mis en place par le Consulat et l'Ambassade. La mobilisation de la communauté gabonaise en France a été saluée par les autorités.

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

## Modernisation complète

Par ailleurs, le Gabon finalisera en décembre 2025 la modernisation complète de son système e-Visa via le portail **evisa.dgdi.ga**, permettant désormais le paiement en ligne des frais de visa.

## Pour les ressortissants gabonais

Cette initiative vise à promouvoir le tourisme au Gabon. Les ressortissants gabonais souhaitant inviter des proches peuvent les orienter vers ce dispositif simplifié.`,
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

## Célébrations en France

Le Consulat Général, en collaboration avec l'Ambassade du Gabon en France, a organisé des festivités pour permettre à la communauté gabonaise de France de commémorer ces dates importantes.

## Programme
- Cérémonie officielle de levée des couleurs
- Discours des autorités diplomatiques
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
        eventLocation: "Ambassade du Gabon en France",
        eventAddress: "26 bis avenue Raphaël, 75016 Paris",
      },
      {
        title: "Représentation de la diaspora à l'Assemblée nationale : une avancée historique",
        slug: "diaspora-representation-assemblee-nationale",
        excerpt: "L'article 221 du projet de loi électorale prévoit désormais la représentation des Gabonais de l'étranger à l'Assemblée nationale.",
        content: `# Représentation de la Diaspora à l'Assemblée Nationale

Une avancée historique pour la diaspora gabonaise : l'**article 221 du projet de loi électorale** prévoit désormais la **représentation des Gabonais de l'étranger à l'Assemblée nationale**.

## Ce que cela change

Pour la première fois, les Gabonais résidant hors du territoire national pourront être représentés directement au sein de l'institution parlementaire. Cette mesure reconnaît officiellement le rôle et la contribution de la diaspora dans le développement du Gabon.

## Réactions

La **Confédération de la Diaspora Gabonaise Multi-continentale G10** a salué cette avancée comme « une reconnaissance historique du poids et de l'engagement des Gabonais de l'étranger ».

## Élections législatives 2025

Dans le cadre des préparatifs des élections législatives de 2025, la **Commission Consulaire Électorale de France** a réuni en septembre 2025 les candidats et leurs représentants à l'ambassade du Gabon en France pour la 2ème circonscription couvrant l'Europe, l'Asie, l'Amérique et l'Océanie.

## Implications pratiques

Les ressortissants gabonais en France sont invités à :
- Vérifier leur inscription sur les listes électorales
- Se rapprocher du Consulat pour toute information
- Participer activement au processus démocratique`,
        category: "actualite" as const,
        publishedAt: now - (18 * day),
        status: "published" as const,
        coverImage: "/images/depute_dispora_gabon.jpg",
      },
      {
        title: "Simplification des visas français pour les ressortissants gabonais : discussions en cours",
        slug: "simplification-visas-francais-gabonais",
        excerpt: "Le chef de la diplomatie gabonaise, S.E.M. Michel Régis Onanga Ndiaye, a engagé des discussions avec la France pour faciliter l'octroi des visas aux ressortissants gabonais.",
        content: `# Simplification des Visas Français

Des discussions bilatérales ont été engagées entre **S.E.M. Michel Régis Onanga M. Ndiaye**, Ministre des Affaires Étrangères du Gabon, et le **Ministre délégué français chargé de la Francophonie** pour faciliter l'octroi des visas français aux ressortissants gabonais.

## Contexte

Des problèmes techniques et des retards importants avaient été observés dans le traitement des demandes de visa français déposées par les ressortissants gabonais. Ces difficultés avaient suscité de nombreuses plaintes au sein de la communauté.

## Objectifs des discussions

- Réduire les délais de traitement des demandes de visa
- Résoudre les problèmes techniques rencontrés sur la plateforme de rendez-vous
- Faciliter la mobilité des ressortissants gabonais vers la France
- Renforcer la coopération consulaire bilatérale

## Recommandations du Consulat

En attendant l'aboutissement de ces discussions, le Consulat recommande aux ressortissants gabonais de :
- Déposer leurs demandes de visa le plus tôt possible
- S'assurer de la complétude de leurs dossiers
- Consulter régulièrement le site de France Visas

Le Consulat reste mobilisé pour accompagner les ressortissants dans leurs démarches.`,
        category: "communique" as const,
        publishedAt: now - (22 * day),
        status: "published" as const,
        coverImage: "/images/actualites/visa-simplification.png",
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

## Participation de la diaspora

Les Gabonais de France ont pu voter dans les bureaux de vote ouverts au Consulat et à l'Ambassade. Le taux de participation de la diaspora a été significatif, témoignant de l'engagement civique des Gabonais de l'étranger.

## Entrée en vigueur

La nouvelle Constitution est entrée en vigueur en 2025, jetant les bases d'un nouveau cadre institutionnel pour le Gabon.

## Impact pour les ressortissants

Les ressortissants gabonais sont invités à se familiariser avec les nouvelles dispositions constitutionnelles, notamment celles relatives aux droits des citoyens vivant à l'étranger.`,
        category: "actualite" as const,
        publishedAt: now - (30 * day),
        status: "published" as const,
        coverImage: "/images/actualites/referendum-constitution.png",
      },
      {
        title: "Loi immigration 2025 en France : ce qui change pour les ressortissants gabonais",
        slug: "loi-immigration-france-2025-gabonais",
        excerpt: "La loi immigration française de 2025 introduit de nouvelles exigences linguistiques et des procédures digitalisées. Le Consulat informe les ressortissants des changements.",
        content: `# Loi Immigration 2025 : Ce Qui Change

La France a adopté de nouvelles dispositions en matière d'immigration en 2025, impactant directement les ressortissants étrangers, y compris les Gabonais résidant en France.

## Principales mesures à retenir

### Exigences linguistiques renforcées (à partir du 1er janvier 2026)
- **Carte de séjour longue durée** : niveau A2 en français requis
- **Carte de résident** : niveau B1 en français requis
- **Naturalisation** : niveau B2 en français requis
- Un **examen civique** sera également obligatoire

### Digitalisation des procédures
- Prise de rendez-vous en préfecture obligatoirement en ligne à partir de décembre 2025
- Dématérialisation progressive des demandes de titre de séjour

### Statut « Talent » réformé
- Nouvelles catégories et conditions pour les permis « Talent »
- Révision des seuils de rémunération

### Régularisation par le travail
- Possibilité de régularisation pour les travailleurs dans les secteurs en tension (12 mois d'emploi minimum)
- Titre de séjour d'un an renouvelable

## Recommandations du Consulat

- Anticipez vos renouvellements de titre de séjour
- Inscrivez-vous à des cours de français si nécessaire
- Consultez le site du Consulat pour des informations mises à jour`,
        category: "communique" as const,
        publishedAt: now - (35 * day),
        status: "published" as const,
        coverImage: "/images/actualites/loi-immigration-france.png",
      },
      {
        title: "Rappel : la carte consulaire est gratuite et obligatoire pour tout Gabonais en France",
        slug: "carte-consulaire-gratuite-obligatoire",
        excerpt: "Le Consulat rappelle à tous les ressortissants gabonais en France que la carte consulaire est un document gratuit et obligatoire pour accéder aux services consulaires.",
        content: `# Carte Consulaire : Gratuite et Obligatoire

Le Consulat Général du Gabon en France rappelle à l'ensemble des ressortissants gabonais résidant sur le territoire français que la **carte consulaire** est un document **gratuit** et **obligatoire**.

## Pourquoi la carte consulaire ?

La carte consulaire est votre document d'identification auprès du Consulat. Elle vous permet de :
- Accéder à l'ensemble des **services consulaires**
- Être **recensé** au sein de la communauté gabonaise de France
- Être **inscrit sur les listes électorales** consulaires
- Bénéficier de l'**assistance consulaire** en cas d'urgence
- Obtenir rapidement des **documents administratifs**

## Pièces à fournir

- 1 copie de l'acte de naissance (datant de moins de 6 mois)
- 1 copie du passeport en cours de validité
- 1 copie du titre de séjour en cours de validité
- 1 justificatif de domicile récent
- 2 photos d'identité (format officiel)

## Où et comment ?

Présentez-vous au **Consulat Général du Gabon en France** muni des pièces requises :

📍 26 bis Avenue Raphaël, 75016 Paris
📞 07 51 02 52 92
📧 contact@consulatdugabon.fr

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
