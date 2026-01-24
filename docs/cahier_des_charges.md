# Cahier des Charges : Site Officiel d'Information du Consulat du Gabon en France

## 1. Contexte et Objectifs

Le projet consiste à transformer une application existante en portail officiel d'information pour le Consulat Général du Gabon en France.
Le but est de fournir une interface claire, institutionnelle et informative pour orienter les usagers (citoyens gabonais en France et étrangers) vers les bonnes procédures et les bons interlocuteurs.

**Objectifs clés :**

- **Centraliser l'information** : Tarifs, pièces à fournir, horaires.
- **Orienter les usagers** : Redirection claire vers les plateformes de demande en ligne (`consulat.ga`, `ae.dgdifrance.fr`).
- **Communiquer** : Diffuser les actualités officielles et alertes.

## 2. Cibles

- Ressortissants gabonais résidant en France.
- Demandeurs de visa (Tourisme, Affaires).
- Administration consulaire (Gestion du contenu).

## 3. Périmètre Fonctionnel

### A. Partie Publique (Front-Office)

Le site est principalement consultatif.

1.  **Accueil**
    - Identité visuelle forte (Armoiries, Drapeau, Charte officielle).
    - Bannière "Message important" ou "Dernière actualité".
    - Accès rapide aux démarches fréquentes (Passeport, Visa, Carte Consulaire).

2.  **Présentation du Consulat**
    - Mot du Consul.
    - Missions (Protection, État civil, etc.).
    - Juridiction et Organisation.

3.  **Catalogue des Services**
    - Présentation détaillée de chaque démarche (Fiches services) :
      - Description.
      - Populations concernées.
      - Pièces à fournir (Liste à cocher).
      - Coût et moyens de paiement acceptés.
      - Délai de traitement.
      - **Action** : Lien vers la procédure (ex: Prise de RDV DGDI, Formulaire PDF à télécharger, ou Site `consulat.ga`).
    - _Exemples de services_ : Passeport, Visa, Carte Consulaire, Transcription, Mariage, Légalisation, Certificats.

4.  **Actualités et Événements**
    - Affichage chronologique des articles.
    - Catégories : Communiqués, Événements culturels, Informations pratiques.

5.  **Contact et Accès**
    - Adresse physique avec carte interactive.
    - Horaires d'ouverture détaillés par service.
    - Numéros de téléphone et emails de contact par service.

### B. Partie Administration (Back-Office)

Accès restreint aux agents du consulat pour la mise à jour du contenu.

1.  **Gestion des Actualités**
    - Créer, modifier, supprimer, publier/dépublier des articles.
    - Éditeur de texte riche (Gras, liens, images).

2.  **Gestion des Fiches Services**
    - Modifier les tarifs et les pièces requises (mise à jour rapide).
    - Modifier les délais annoncés.

3.  **Gestion des Annonces**
    - Activer/Désactiver des bandeaux d'alerte en haut de site (ex: "Fermeture exceptionnelle").

## 4. Identité Graphique et Ergonomie

- **Style** : Sobre, institutionnel, moderne.
- **Couleurs** : Vert, Jaune, Bleu (Drapeau Gabon) utilisés avec parcimonie sur fond neutre (Blanc/Gris).
- **Accessibilité** : Respect des normes de base, lisibilité mobile (Responsive).

## 5. Contraintes

- **Sécurité** : Protection de l'accès Admin.
- **Performance** : Chargement rapide (SSR/Static).
- **Maintenance** : Facilité de modification des textes sans toucher au code.
