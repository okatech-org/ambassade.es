# Prompt d'enrichissement du site Consulat.ga

## Contexte du projet

Tu travailles sur le site officiel du **Consulat Général du Gabon en France** (`france.consulat.ga`).

**Stack technique :** React 19 + TypeScript + TanStack Router (file-based routing) + Tailwind CSS v4 + shadcn/ui + i18next (FR/EN) + Lucide React icons.

**Design system :** Glass morphism (`glass-card`, `glass-panel`, `glass-section`, `text-gradient`, `animate-pulse-glow`, `animate-float`). Toutes les cartes utilisent des `div` avec classes glass, pas les composants `Card` de shadcn.

**Structure existante :**
- `/` — Accueil (Hero IA, Services, Guide Pratique, Actualités, CTA)
- `/services` — Services consulaires
- `/vie-en-france` — Guide de vie en France
- `/integration` — Page d'intégration et sensibilisation
- `/actualites` — Actualités
- `/le-consulat` — Présentation du consulat
- `/contact` — Contact

---

## Données des fiches techniques consulaires

Utilise les informations suivantes, extraites du document officiel **"Fiche Technique des Actes Consulaires"**, pour enrichir le site du consulat. Ces données doivent être intégrées dans les pages Services, Vie en France, Intégration et FAQ.

---

### 1. MISSIONS DU CONSULAT GÉNÉRAL (Convention de Vienne, art. 5)

Les missions consulaires comprennent :
- Protection des intérêts de l'État d'envoi et de ses ressortissants
- Développement des relations commerciales, économiques, culturelles et scientifiques
- Délivrance de passeports, visas et documents de voyage
- Actes d'état civil (naissances, mariages, décès)
- Actes notariés et administratifs
- Assistance aux ressortissants (détenus, accidents, décès, rapatriement)
- Fonctions judiciaires (transmission d'actes, commissions rogatoires)

---

### 2. RÉGULARISATION ADMINISTRATIVE EN FRANCE

**Objectif :** Aider les Gabonais en situation irrégulière à régulariser leur séjour.

**Options de régularisation :**
- **Admission exceptionnelle au séjour** (circulaire Valls 2012) — critères : ancienneté de séjour, insertion professionnelle, attaches en France
- **Régularisation par le travail** — nécessite une promesse d'embauche ou un contrat de travail
- **Régularisation pour motif familial** — parent d'enfant français, conjoint de Français
- **Régularisation pour raisons médicales** — pathologie grave nécessitant un traitement indisponible au Gabon
- **Protection internationale** — statut de réfugié ou protection subsidiaire via l'OFPRA

**Documents nécessaires (tronc commun) :**
- Passeport valide ou périmé
- Justificatifs de domicile (3 derniers mois)
- Photos d'identité (normes ANTS)
- Preuves de présence en France (avis d'imposition, attestations médicales, courriers administratifs)
- Justificatifs selon le motif (contrat de travail, acte de naissance de l'enfant français, certificat médical OFII, etc.)

**Où déposer le dossier :**
- Préfecture ou sous-préfecture du lieu de résidence
- Portail en ligne : administration-etrangers-en-france.interieur.gouv.fr

---

### 3. ADMISSION EN FRANCE — Documents exigés à la frontière

**Documents obligatoires :**
- Passeport en cours de validité
- Visa (court ou long séjour selon le motif)
- Attestation d'hébergement ou réservation d'hôtel
- Billet d'avion retour (court séjour)
- Assurance voyage couvrant les frais médicaux (min. 30 000 €)
- Justificatifs de ressources financières (min. 120 €/jour ou 32,50 €/jour si hébergé par un particulier titulaire d'une attestation d'accueil)

**Points d'attention :**
- Le visa ne garantit pas l'entrée : la police aux frontières décide
- Possibilité de refus d'entrée même avec un visa valide
- En cas de refus : recours possible auprès du tribunal administratif dans les 48h

---

### 4. PREMIÈRE DEMANDE DE CARTE DE SÉJOUR

**Procédure OFII (Office Français de l'Immigration et de l'Intégration) :**
1. Arrivée en France avec un visa long séjour valant titre de séjour (VLS-TS)
2. Validation du VLS-TS sur le site de l'OFII dans les 3 mois suivant l'arrivée
3. Paiement de la taxe OFII (variable selon le type de visa : 200 € à 400 €)
4. Visite médicale obligatoire à l'OFII
5. Signature du Contrat d'Intégration Républicaine (CIR) : formation civique + linguistique

**Documents requis :**
- Passeport avec visa long séjour
- Formulaire OFII cerfa n°15614
- Justificatif de domicile
- Photos d'identité
- Timbre fiscal (montant variable)
- Certificat médical OFII

---

### 5. CAS DES ÉTUDIANTS

**Visa étudiant long séjour :**
- Obtenu via Campus France (procédure "Études en France")
- VLS-TS mention "étudiant" — valable 1 an, renouvelable

**Titre de séjour pluriannuel étudiant :**
- Après la 1ère année : carte de séjour pluriannuelle (2 à 4 ans)
- Conditions : assiduité, progression des études, ressources suffisantes (615 €/mois min.)

**Droit au travail :**
- Autorisation de travailler 964 heures/an (60% de la durée légale)
- Pas besoin d'autorisation de travail supplémentaire

---

### 6. MINEURS — Document de Circulation pour Mineur Étranger (DCME)

**Conditions :**
- Mineur étranger résidant en France
- Parents en situation régulière ou l'un des parents français

**Documents requis :**
- Acte de naissance de l'enfant
- Passeport de l'enfant
- Titre de séjour des parents
- Justificatif de domicile
- Certificat de scolarité
- Photos d'identité

**Utilité :** Permet au mineur de voyager et de revenir en France sans visa.

---

### 7. RENOUVELLEMENT DE CARTE DE SÉJOUR

**Délais :** Faire la demande 2 à 4 mois avant expiration.

**Procédure :**
- Rendez-vous en ligne sur le site de la préfecture
- Dépôt du dossier complet
- Délivrance d'un récépissé en attendant la nouvelle carte

**Documents :**
- Carte de séjour en cours ou expirée
- Passeport valide
- Justificatifs de domicile récents
- Justificatifs selon le motif du séjour (contrat de travail, bulletins de salaire, attestation d'inscription universitaire, etc.)
- Timbres fiscaux
- Photos d'identité

---

### 8. AUTORISATION PROVISOIRE DE SÉJOUR (APS) — Diplômés

**Bénéficiaires :** Étudiants étrangers ayant obtenu un diplôme de niveau Master ou équivalent en France.

**Durée :** 12 mois, non renouvelable.

**Objectif :** Rechercher un emploi ou créer une entreprise en lien avec le diplôme obtenu.

**Conditions :**
- Diplôme obtenu dans un établissement français
- Diplôme de niveau Master minimum
- Demande avant l'expiration du titre étudiant

**Droit au travail :** Autorisation de travailler à temps plein pendant la durée de l'APS.

---

### 9. CHANGEMENT DE STATUT : Étudiant → Salarié

**Conditions :**
- Avoir un emploi en relation avec le diplôme obtenu
- Rémunération au moins égale à 1,5 fois le SMIC (pour les métiers en tension : 1 fois le SMIC)
- L'employeur doit déposer une demande d'autorisation de travail

**Procédure :**
1. L'employeur fait la demande d'autorisation de travail sur la plateforme du ministère du Travail
2. L'étudiant dépose sa demande de changement de statut à la préfecture
3. Instruction du dossier (délai : 2 à 4 mois)
4. Délivrance d'un titre "salarié" ou "travailleur temporaire"

**Documents :**
- Contrat de travail ou promesse d'embauche
- Diplôme obtenu en France
- Titre de séjour étudiant en cours
- Formulaire Cerfa n°15187
- Justificatif de domicile

---

### 10. OQTF — Obligation de Quitter le Territoire Français

**Définition :** Décision administrative enjoignant un étranger à quitter la France dans un délai de 30 jours (ou sans délai dans certains cas).

**Motifs de délivrance :**
- Séjour irrégulier
- Refus de renouvellement de titre de séjour
- Refus de demande d'asile
- Menace à l'ordre public

**Recours possibles :**
- **Recours gracieux** auprès du préfet (dans les 30 jours)
- **Recours contentieux** devant le tribunal administratif (délai de 30 jours, ou 48h si OQTF sans délai)
- **Recours suspensif** — l'exécution de l'OQTF est suspendue pendant l'examen du recours
- Aide juridictionnelle possible

**Rôle du consulat :** Le consulat peut accompagner le ressortissant en lui fournissant des informations sur ses droits et en l'orientant vers une aide juridique. Le consulat NE PEUT PAS s'opposer juridiquement à une OQTF.

**Ce qu'il faut faire :**
- NE PAS ignorer l'OQTF
- Consulter immédiatement un avocat spécialisé en droit des étrangers
- Rassembler tous les documents prouvant l'ancienneté du séjour et l'insertion en France
- Contacter le consulat pour un accompagnement

---

### 11. PROCÉDURE EN CAS D'ARRESTATION PAR LA POLICE

**Droits fondamentaux :**
- Droit de connaître le motif de l'arrestation
- Droit de garder le silence
- Droit à un avocat (commis d'office si nécessaire)
- Droit de prévenir un proche
- Droit de prévenir le consulat (Convention de Vienne, art. 36)
- Droit à un interprète si nécessaire
- Droit à un examen médical

**Durée de la garde à vue :**
- 24 heures, renouvelable une fois (48h max pour droit commun)
- 96h pour certaines infractions graves (terrorisme, stupéfiants)

**Rôle du consulat :**
- Visite du ressortissant en garde à vue ou en détention
- Vérification des conditions de détention
- Mise en relation avec un avocat
- Information de la famille
- NE PEUT PAS intervenir dans la procédure judiciaire

**Ce qu'il faut faire :**
- Rester calme et coopérer
- Demander à contacter le consulat immédiatement
- Ne signer aucun document sans l'avoir lu et compris
- Demander un interprète si besoin

---

### 12. CHANGEMENT D'ADRESSE

**Obligation :** Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois.

**Procédure :**
- En ligne sur administration-etrangers-en-france.interieur.gouv.fr
- Ou à la préfecture du nouveau domicile

**Documents :** Titre de séjour + nouveau justificatif de domicile.

**Conséquences en cas de non-déclaration :** Amende possible + complications pour le renouvellement du titre.

---

### 13. PERTE DE DOCUMENTS

**Documents concernés :** Passeport, titre de séjour, carte d'identité consulaire.

**Procédure :**
1. Déclaration de perte au commissariat (récépissé de déclaration de perte)
2. Pour le passeport : se rendre au consulat avec le récépissé + photos + justificatifs d'identité
3. Pour le titre de séjour : se rendre à la préfecture avec le récépissé
4. Demande de duplicata

**Coût :** Variable selon le document (passeport : tarif consulaire en vigueur).

**Conseil :** Toujours conserver des photocopies de tous les documents importants (en version numérique également).

---

### 14. BINATIONAUX (Franco-Gabonais)

**Spécificité :** Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions). En pratique, de nombreux Gabonais possèdent les deux nationalités.

**Visa pour le Gabon (détenteur d'un passeport français d'origine gabonaise) :**
- Un visa est nécessaire pour entrer au Gabon avec un passeport français
- Le visa peut être obtenu auprès du consulat du Gabon
- Possibilité d'un visa de long séjour pour les binationaux souhaitant s'établir au Gabon

**Documents utiles :**
- Passeport français valide
- Acte de naissance gabonais ou certificat de nationalité gabonaise
- Photos d'identité

**Conseil :** Les binationaux doivent entrer et sortir de France avec leur passeport français, et entrer au Gabon avec leur passeport gabonais (s'ils en possèdent un).

---

## Instructions pour l'intégration au site

En utilisant les données ci-dessus, enrichis le site `france.consulat.ga` comme suit :

### A. Page Services (`/services`)
Pour chaque acte consulaire, crée ou enrichis une **ServiceCard** avec :
- **Titre** clair et concis
- **Description** résumant la démarche en 2-3 lignes
- **Badge** indiquant le type (Ex: "Préfecture", "Consulat", "En ligne")
- **Délai estimé** quand disponible
- **Bouton "Information"** ouvrant un modal/drawer avec la fiche complète (procédure pas à pas, documents requis, coût, liens utiles)
- **Bouton "Faire la demande"** renvoyant vers consulat.ga ou le portail officiel concerné

Les services à intégrer :
1. Régularisation administrative
2. Première carte de séjour (procédure OFII)
3. Renouvellement de carte de séjour
4. APS pour diplômés
5. Changement de statut étudiant → salarié
6. Document de circulation pour mineur (DCME)
7. Déclaration de perte de documents
8. Changement d'adresse
9. Visa binationaux (Franco-Gabonais)
10. Assistance en cas d'arrestation

### B. Page Vie en France (`/vie-en-france`)
Ajoute ou enrichis des sections :
- **Admission en France** — documents exigés à la frontière, montants minimum de ressources
- **Droits et devoirs** — obligations légales (changement d'adresse, renouvellement dans les délais)
- **Vie étudiante** — droit au travail (964h/an), carte pluriannuelle, ressources minimum (615€/mois)
- **OQTF : que faire ?** — guide pratique pas à pas, recours possibles, rôle du consulat

### C. Page Intégration (`/integration`)
Enrichis les sections existantes avec :
- Dans **Savoir-vivre** : ajout sur la coopération avec les forces de l'ordre (droits lors d'une arrestation)
- Dans **Guides thématiques > Droits** : détail des recours OQTF, régularisation, droit au travail étudiant
- Dans **Erreurs courantes** : ne pas ignorer une OQTF, ne pas oublier le changement d'adresse, toujours garder des copies de documents
- Dans **Numéros utiles** : ajouter les contacts pertinents (OFII, préfecture en ligne, aide juridictionnelle)

### D. FAQ (`/` ou page dédiée)
Ajoute les questions fréquentes suivantes :
- "Comment régulariser ma situation en France ?"
- "Quels documents présenter à la frontière ?"
- "Comment renouveler ma carte de séjour ?"
- "Qu'est-ce qu'une OQTF et que faire si j'en reçois une ?"
- "J'ai perdu mon passeport/titre de séjour, que faire ?"
- "Je suis étudiant, combien d'heures puis-je travailler ?"
- "Je suis binational, ai-je besoin d'un visa pour le Gabon ?"
- "Que faire en cas d'arrestation ?"
- "Comment passer du statut étudiant au statut salarié ?"
- "Qu'est-ce que l'APS et comment en bénéficier ?"

### E. Traductions i18n
Toutes les nouvelles entrées doivent être ajoutées dans :
- `src/integrations/i18n/locales/fr.json`
- `src/integrations/i18n/locales/en.json`

Utilise les clés structurées existantes (ex: `services.regularisation.title`, `faq.oqtf.question`, etc.).

### F. Design et UX
- Respecte le design system existant (glass morphism, Tailwind v4, Lucide icons)
- Chaque fiche détaillée doit être dans un **modal ou drawer** accessible depuis la ServiceCard
- Utilise des **accordions** pour les procédures longues (étape par étape)
- Ajoute des **badges visuels** pour distinguer les démarches (Consulat / Préfecture / En ligne / Urgent)
- Les numéros d'urgence et liens utiles doivent être facilement accessibles (sticky ou section dédiée)
- Mobile-first : toutes les fiches doivent être parfaitement lisibles sur smartphone
