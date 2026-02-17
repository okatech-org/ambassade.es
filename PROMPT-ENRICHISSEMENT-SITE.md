# Prompt d'enrichissement du site Consulat.ga (Version rectifiée)

## Contexte du projet

Tu travailles sur le site officiel du **Consulat Général du Gabon en France** (`france.consulat.ga`).

**Coordonnées officielles du Consulat :**
- Adresse : 26 bis, avenue Raphaël — 75016 Paris
- Email : consulatgeneralgabon@yahoo.fr

**Stack technique :** React 19 + TypeScript + TanStack Router (file-based routing) + Tailwind CSS v4 + shadcn/ui + i18next (FR/EN) + Lucide React icons.

**Design system :** Glass morphism (`glass-card`, `glass-panel`, `glass-section`, `text-gradient`, `animate-pulse-glow`, `animate-float`). Toutes les cartes utilisent des `div` avec classes glass, pas les composants `Card` de shadcn.

**Structure existante :**
- `/` — Accueil (Hero, Services, Guide Pratique, Actualités, CTA)
- `/services` — Services consulaires
- `/vie-en-france` — Guide de vie en France
- `/integration` — Page d'intégration et sensibilisation
- `/actualites` — Actualités
- `/le-consulat` — Présentation du consulat
- `/contact` — Contact

---

## Données des fiches techniques consulaires (VERSION RECTIFIÉE)

Utilise les informations suivantes, extraites du document officiel **"Fiche Technique des Actes Consulaires — RECTIFICATIONS"**, pour enrichir le site du consulat. Ces données doivent être intégrées dans les pages Services, Vie en France, Intégration et FAQ.

**IMPORTANT :** Ces données sont la version officielle rectifiée. En cas de doute entre les deux versions, c'est cette version rectifiée qui prévaut.

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

**Contrôle effectué par :** La Police de l'Air et des Frontières (PAF) aux aéroports de Roissy-Charles de Gaulle et Orly.

**Documents obligatoires :**
- Passeport en cours de validité
- Visa (court ou long séjour selon le motif)
- Attestation d'hébergement ou réservation d'hôtel
- Billet d'avion retour (court séjour)
- Assurance voyage couvrant les frais médicaux (min. 30 000 €)
- Justificatifs de ressources financières :
  - **120 €/jour** si hébergement à titre onéreux (hôtel)
  - **32,50 €/jour** si hébergé par un particulier titulaire d'une attestation d'accueil

**Points d'attention :**
- Le visa ne garantit PAS l'entrée sur le territoire : c'est la PAF qui décide
- Possibilité de refus d'entrée même avec un visa valide
- En cas de refus : recours possible auprès du tribunal administratif dans les 48h

---

### 4. PREMIÈRE DEMANDE DE CARTE DE SÉJOUR

**Procédure OFII (Office Français de l'Immigration et de l'Intégration) :**
1. Arrivée en France avec un visa long séjour valant titre de séjour (VLS-TS)
2. Validation du VLS-TS sur le site de l'OFII dans les **3 mois** suivant l'arrivée
3. Paiement de la taxe OFII (variable selon le type de visa : 200 € à 400 €)
4. **Visite médicale obligatoire** à l'OFII
5. Signature du **Contrat d'Intégration Républicaine (CIR)** : formation civique + linguistique

**Documents requis :**
- Passeport avec visa long séjour
- Formulaire OFII cerfa n°15614
- Justificatif de domicile
- Photos d'identité
- Timbre fiscal (montant variable)
- Certificat médical OFII

**⚠️ ATTENTION :** Le récépissé de première demande de carte de séjour **ne permet PAS de quitter la France** et d'y revenir. Seul le titre de séjour définitif ou le VLS-TS validé le permet.

---

### 5. CAS DES ÉTUDIANTS

**Visa étudiant long séjour :**
- Obtenu via **Campus France** (procédure "Études en France")
- VLS-TS mention "étudiant" — valable 1 an, renouvelable
- Les boursiers du gouvernement gabonais passent également par Campus France

**Titre de séjour pluriannuel étudiant :**
- Après la 1ère année : carte de séjour pluriannuelle (2 à 4 ans)
- Conditions : assiduité, progression des études, ressources suffisantes (**615 €/mois** minimum)

**Droit au travail :**
- Autorisation de travailler **964 heures/an** (60% de la durée légale)
- Pas besoin d'autorisation de travail supplémentaire

**Visite médicale :** Obligatoire à l'OFII dans les 3 mois suivant l'arrivée.

---

### 6. MINEURS — Document de Circulation pour Mineur Étranger (DCM)

**Conditions :**
- Mineur étranger résidant habituellement en France
- Parents en situation régulière ou l'un des parents français

**Documents requis :**
- Acte de naissance de l'enfant
- Passeport de l'enfant
- Titre de séjour des parents
- Justificatif de domicile
- Certificat de scolarité
- Photos d'identité

**Caractéristiques :**
- **Validité : 5 ans**, renouvelable jusqu'aux 18 ans de l'enfant
- Permet au mineur de voyager et de revenir en France sans visa

**Titre d'identité républicain :** Pour les mineurs nés en France de parents étrangers, un titre d'identité républicain peut être délivré par la préfecture.

**⚠️ À 18 ans :** Le jeune doit obligatoirement demander un titre de séjour propre (mention "étudiant" ou "vie privée et familiale" selon sa situation).

---

### 7. RENOUVELLEMENT DE CARTE DE SÉJOUR

**Délais :** Faire la demande **2 mois** avant l'expiration du titre.

**Procédure :**
- Rendez-vous en ligne sur le site de la préfecture
- Dépôt du dossier complet
- Délivrance d'un **récépissé** valable **3 mois** en attendant la nouvelle carte

**Documents :**
- Carte de séjour en cours ou expirée
- Passeport valide
- Justificatifs de domicile récents
- Justificatifs selon le motif du séjour (contrat de travail, bulletins de salaire, attestation d'inscription universitaire, etc.)
- Timbres fiscaux
- Photos d'identité

---

### 8. AUTORISATION PROVISOIRE DE SÉJOUR (APS) — Diplômés

**Base juridique :** Accord franco-gabonais du 5 juillet 2007.

**Bénéficiaires :** Étudiants gabonais ayant obtenu un diplôme de niveau Master ou équivalent en France.

**Durée : 9 mois, renouvelable une fois** (soit 18 mois maximum).

**Objectif :** Rechercher un emploi ou créer une entreprise en lien avec le diplôme obtenu.

**Conditions :**
- Diplôme obtenu dans un établissement français
- Diplôme de niveau Master minimum
- Demande **2 à 4 mois** avant l'expiration du titre de séjour étudiant

**Droit au travail :** Autorisation de travailler à temps plein pendant la durée de l'APS.

---

### 9. CHANGEMENT DE STATUT : Étudiant → Salarié

**Conditions :**
- Avoir un emploi en relation avec le diplôme obtenu
- Rémunération au moins égale à **1,5 fois le SMIC** (pour les métiers en tension : 1 fois le SMIC)
- L'employeur doit obtenir une **autorisation de travail** auprès de la DIRECCTE (Direction régionale des entreprises, de la concurrence, de la consommation, du travail et de l'emploi)

**Procédure :**
1. L'employeur dépose une demande d'autorisation de travail sur la plateforme du ministère du Travail
2. La DIRECCTE vérifie la situation de l'emploi et les garanties de l'employeur
3. L'étudiant dépose sa demande de changement de statut à la préfecture
4. Instruction du dossier (délai : 2 à 4 mois)
5. Délivrance d'un titre "salarié" ou "travailleur temporaire"

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

**Trois types de recours possibles :**

1. **Recours gracieux** auprès du Préfet
   - Délai : **2 mois** à compter de la notification
   - Envoi par **lettre recommandée avec accusé de réception**
   - ⚠️ **NE SUSPEND PAS** l'exécution de l'OQTF

2. **Recours hiérarchique** auprès du Ministre de l'Intérieur
   - Délai : **2 mois** à compter de la notification
   - Envoi par **lettre recommandée avec accusé de réception**
   - ⚠️ **NE SUSPEND PAS** l'exécution de l'OQTF

3. **Recours contentieux (administratif)** devant le Tribunal Administratif
   - Délai : **30 jours** à compter de la notification (ou **48h** si OQTF sans délai de départ)
   - ✅ **SEUL recours qui SUSPEND l'exécution de l'OQTF**
   - Aide juridictionnelle possible

**Si tous les recours échouent — Saisir le Consul Général :**
Le ressortissant peut saisir le Consul Général du Gabon avec les documents suivants :
- Copie de l'OQTF
- Copie des recours effectués et des décisions rendues
- Pièce d'identité (passeport ou carte consulaire)
- Tout document utile à la défense du dossier

**Rôle du consulat :** Le consulat peut accompagner le ressortissant en l'orientant vers une aide juridique, mais NE PEUT PAS s'opposer juridiquement à une OQTF.

**Ce qu'il faut faire :**
- NE PAS ignorer l'OQTF
- Consulter immédiatement un avocat spécialisé en droit des étrangers
- Privilégier le recours contentieux (le seul suspensif)
- Rassembler tous les documents prouvant l'ancienneté du séjour et l'insertion en France
- Contacter le consulat pour un accompagnement

---

### 11. PROCÉDURE EN CAS D'ARRESTATION PAR LA POLICE

**Droits fondamentaux :**
- Droit de connaître le motif de l'arrestation
- Droit de garder le silence
- Droit à un avocat (commis d'office si nécessaire)
- Droit de prévenir un proche
- **Droit de demander que le consulat soit informé** (Convention de Vienne, art. 36)
- Droit à un interprète si nécessaire
- Droit à un examen médical

**Durée de la garde à vue :**
- 24 heures, renouvelable une fois (48h max pour droit commun)
- 96h pour certaines infractions graves (terrorisme, stupéfiants)

**Rôle du consulat :**
- Visite du ressortissant en garde à vue ou en détention
- Vérification des conditions de détention
- Orientation vers un avocat
- Information de la famille
- ⚠️ NE PEUT PAS intervenir dans la procédure judiciaire
- ⚠️ NE PEUT PAS prendre en charge les frais d'avocat

**Ce qu'il faut faire :**
- Rester calme et coopérer
- **Demander expressément que le consulat soit informé**
- Ne signer aucun document sans l'avoir lu et compris
- Demander un interprète si besoin
- Demander un avocat commis d'office si vous n'en avez pas

---

### 12. CHANGEMENT D'ADRESSE (DOMICILE)

**Obligation :** Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les **3 mois**.

**Procédure :**
- En ligne sur administration-etrangers-en-france.interieur.gouv.fr
- Ou à la **préfecture de l'ancien domicile**

**Documents :** Titre de séjour + nouveau justificatif de domicile.

**Conséquences en cas de non-déclaration :** Amende possible + complications pour le renouvellement du titre.

---

### 13. PERTE DE DOCUMENTS

**Documents concernés :** Passeport, titre de séjour, carte d'identité consulaire.

**Procédure :**
1. **Déclaration de perte ou main courante** au commissariat de police (obtenir un récépissé)
2. Se rendre au consulat pour obtenir une **attestation de perte**
3. Pour le passeport : demander un nouveau passeport au consulat avec le récépissé + photos + justificatifs d'identité
4. Pour le titre de séjour : se rendre à la préfecture avec le récépissé
5. Demande de duplicata

**Coût :** Variable selon le document (passeport : tarif consulaire en vigueur).

**Conseil :** Toujours conserver des **photocopies de tous les documents importants** (en version numérique également : email, cloud, téléphone).

---

### 14. BINATIONAUX (Franco-Gabonais)

**Spécificité :** Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions). En pratique, de nombreux Gabonais possèdent les deux nationalités.

**Visa pour le Gabon (détenteur d'un passeport français d'origine gabonaise) :**
- Un visa est **obligatoire** pour entrer au Gabon avec un passeport français
- Le visa est obtenu auprès du Consulat Général du Gabon à Paris

**Documents requis pour le visa :**
- Passeport français valide (+ copie)
- Acte de naissance gabonais ou certificat de nationalité gabonaise
- Photos d'identité aux normes
- Formulaire de demande de visa rempli
- Justificatif du motif du voyage (billet d'avion, attestation d'hébergement, etc.)

**Pour les mineurs binationaux :**
- Mêmes documents + autorisation de sortie du territoire signée par les deux parents
- Copie des pièces d'identité des parents

**Délai de retrait du visa : 3 jours ouvrés.**

**⚠️ Pas de visa express** pour les voyages touristiques ou familiaux. La présence physique du demandeur est requise au consulat.

**Conseil pratique :** Les binationaux doivent entrer et sortir de **France avec le passeport français**, et entrer au **Gabon avec le passeport gabonais** (s'ils en possèdent un).

---

### 15. INSATISFACTION DU SERVICE — Voies de recours

En cas d'insatisfaction concernant un service rendu par le consulat, le ressortissant peut :
- Adresser une réclamation écrite au **Consul Général**
- Par courrier : 26 bis, avenue Raphaël — 75016 Paris
- Par email : consulatgeneralgabon@yahoo.fr

---

### 16. DEMANDE D'INFORMATIONS

Pour toute demande d'information complémentaire :
- **Adresse :** Consulat Général du Gabon — 26 bis, avenue Raphaël — 75016 Paris
- **Email :** consulatgeneralgabon@yahoo.fr
- **Se présenter sur place** aux heures d'ouverture

---

## Instructions pour l'intégration au site

En utilisant les données ci-dessus, enrichis le site `france.consulat.ga` comme suit :

### A. Page Services (`/services`)
Pour chaque acte consulaire, crée ou enrichis une **ServiceCard** avec :
- **Titre** clair et concis
- **Description** résumant la démarche en 2-3 lignes
- **Badge** indiquant le type (Ex: "Préfecture", "Consulat", "En ligne", "Urgent")
- **Délai estimé** quand disponible
- **Bouton "Information"** ouvrant un modal/drawer avec la fiche complète (procédure pas à pas, documents requis, coût, liens utiles)
- **Bouton "Faire la demande"** renvoyant vers consulat.ga ou le portail officiel concerné

Les services à intégrer :
1. Régularisation administrative
2. Première carte de séjour (procédure OFII)
3. Renouvellement de carte de séjour
4. APS pour diplômés (9 mois, renouvelable — Accord du 5 juillet 2007)
5. Changement de statut étudiant → salarié
6. Document de circulation pour mineur (DCM) — validité 5 ans
7. Déclaration de perte de documents (+ attestation de perte consulaire)
8. Changement d'adresse
9. Visa binationaux (Franco-Gabonais) — délai 3 jours ouvrés
10. Assistance en cas d'arrestation
11. Accompagnement OQTF (3 types de recours détaillés)

### B. Page Vie en France (`/vie-en-france`)
Ajoute ou enrichis des sections :
- **Admission en France** — contrôle PAF (Roissy/Orly), documents exigés, montants de ressources (120€/jour ou 32,50€/jour)
- **Droits et devoirs** — obligations légales (changement d'adresse sous 3 mois, renouvellement 2 mois avant expiration)
- **Vie étudiante** — Campus France, droit au travail (964h/an), carte pluriannuelle, ressources minimum (615€/mois), visite médicale OFII
- **OQTF : que faire ?** — guide pratique avec les 3 types de recours (gracieux/hiérarchique/contentieux), préciser que seul le recours contentieux est suspensif, procédure de saisine du Consul Général
- **Le récépissé** — expliquer qu'un récépissé de première demande ne permet pas de quitter la France

### C. Page Intégration (`/integration`)
Enrichis les sections existantes avec :
- Dans **Savoir-vivre** : coopération avec les forces de l'ordre, demander expressément l'information du consulat en cas d'arrestation
- Dans **Guides thématiques > Droits** : détail des 3 recours OQTF, régularisation, droit au travail étudiant, passage à 18 ans pour les mineurs
- Dans **Erreurs courantes** : ne pas ignorer une OQTF, ne pas oublier le changement d'adresse, toujours garder des copies numériques des documents, ne pas voyager avec un simple récépissé de première demande, ne pas signer de documents sans les lire en garde à vue
- Dans **Numéros utiles** : ajouter le consulat (26 bis avenue Raphaël, consulatgeneralgabon@yahoo.fr), OFII, préfecture en ligne, aide juridictionnelle

### D. FAQ (`/` ou page dédiée)
Ajoute les questions fréquentes suivantes :
- "Comment régulariser ma situation en France ?"
- "Quels documents présenter à la frontière à Roissy ou Orly ?"
- "Comment renouveler ma carte de séjour et quand faire la demande ?"
- "Qu'est-ce qu'une OQTF et quels sont mes recours ?"
- "J'ai perdu mon passeport/titre de séjour, que faire ?"
- "Je suis étudiant gabonais, combien d'heures puis-je travailler ?"
- "Je suis binational franco-gabonais, ai-je besoin d'un visa pour le Gabon ?"
- "Que faire en cas d'arrestation par la police ?"
- "Comment passer du statut étudiant au statut salarié ?"
- "Qu'est-ce que l'APS et combien de temps dure-t-elle ?" (9 mois renouvelable)
- "Mon enfant a 18 ans, que doit-il faire pour son titre de séjour ?"
- "Puis-je voyager avec un récépissé de carte de séjour ?"
- "Comment saisir le Consul Général en cas d'insatisfaction ?"

### E. Traductions i18n
Toutes les nouvelles entrées doivent être ajoutées dans :
- `src/integrations/i18n/locales/fr.json`
- `src/integrations/i18n/locales/en.json`

Utilise les clés structurées existantes (ex: `services.regularisation.title`, `faq.oqtf.question`, etc.).

### F. Design et UX
- Respecte le design system existant (glass morphism, Tailwind v4, Lucide icons)
- Chaque fiche détaillée doit être dans un **modal ou drawer** accessible depuis la ServiceCard
- Utilise des **accordions** pour les procédures longues (étape par étape)
- Ajoute des **badges visuels** pour distinguer les démarches :
  - 🟢 **Consulat** — démarche au consulat
  - 🔵 **Préfecture** — démarche en préfecture
  - 🟡 **En ligne** — démarche dématérialisée
  - 🔴 **Urgent** — situation urgente (OQTF, arrestation)
- Les **alertes importantes** (récépissé ne permet pas de voyager, seul le recours contentieux est suspensif) doivent être mises en évidence avec un composant d'alerte visuel
- Les numéros d'urgence et contacts du consulat doivent être facilement accessibles (sticky ou section dédiée)
- Mobile-first : toutes les fiches doivent être parfaitement lisibles sur smartphone
