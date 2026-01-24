# Plan Global de Développement

## Phase 1 : Initialisation et Nettoyage

_Objectif : Préparer la base de code saine._

- [ ] Suppression des routes et composants obsolètes (Authentification publique, My Space, anciens formulaires).
- [ ] Mise à jour de la configuration du projet (Métadonnées, Titre, Favicon).
- [ ] Setup de la structure de dossiers `docs/` et `resources/`.

## Phase 2 : Backend (Convex)

_Objectif : Mettre en place la structure de données._

- [ ] Implémentation du Schema (`convex/schema.ts`) : Tables Services, Posts, Announcements.
- [ ] Création des fonctions API (`convex/services.ts`, `convex/posts.ts`) :
  - [ ] Queries publiques (listAll, getBySlug).
  - [ ] Mutations protégées (create, update, delete).
- [ ] Script de "Seed" : Peupler la base avec les données récupérées du site actuel (Passeport, Visa, Transcription...).

## Phase 3 : Frontend - Socle Public

_Objectif : Rendre le site visible et navigable._

- [ ] **Design System** : Ajustement du thème (Couleurs, Typographie).
- [ ] **Développement du Layout** :
  - [ ] Navbar (Logo, Menu Navigation).
  - [ ] Footer (Liens légaux, Réseaux sociaux).
- [ ] **Page d'Accueil** (`index.tsx`) :
  - [ ] Hero Section.
  - [ ] Quick Links.
  - [ ] Latest News (Placeholder).
- [ ] **Page Contact** : Intégration Map et Infos.

## Phase 4 : Frontend - Fonctionnalités Métier

- [ ] **Catalogue Services** :
  - [ ] Page Liste (`services/index.tsx`).
  - [ ] Composant Carte.
  - [ ] Page Détail / Modale avec toutes les infos (Tarifs, Pièces).
- [ ] **Section Institutionnelle** :
  - [ ] Page "Le Consulat" (Contenu statique).
- [ ] **Actualités** :
  - [ ] Page Liste Blog.
  - [ ] Page Article individuel.

## Phase 5 : Administration (CMS)

_Objectif : Rendre le client autonome._

- [ ] Sécurisation de la route `/admin` avec Clerk.
- [ ] Dashboard d'accueil.
- [ ] CRUD Services : Interface pour modifier les tarifs/délais.
- [ ] CRUD Actualités : Interface de rédaction simple.

## Phase 6 : Recette et Déploiement

- [ ] Vérification du contenu (Orthographe, Exactitude des tarifs).
- [ ] Tests responsive (Mobile/Tablette).
- [ ] SEO (Sitemap, Meta tags dynamiques).
- [ ] Mise en production (Netlify/Vercel).
