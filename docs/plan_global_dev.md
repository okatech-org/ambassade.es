# Plan Global de Développement : Site du Consulat du Gabon en France

> Dernière mise à jour : 24/01/2026

## Phase 1 : Nettoyage et Configuration ✅

- [x] Supprimer les routes inutiles (`my-space`, `orgs`, `sign-in`, `sign-up`, `dashboard`, etc.)
- [x] Nettoyer les composants non utilisés (`NearbyOrgs.tsx`, `org/`, `profile/`, etc.)
- [x] Mettre à jour `package.json` et métadonnées globales

## Phase 2 : Backend (Convex) ✅

- [x] Définir le schéma (`posts`, `services`, `announcements`)
- [x] Nettoyage des fonctions et schémas obsolètes
- [x] Implémenter les fonctions CRUD pour posts, services, announcements
- [x] Script de Seed pour les données de référence
- [x] Refonte des fonctions d'administration

## Phase 3 : Frontend - Socle Public ✅

- [x] Refonte Navigation (Header/Footer) avec liens institutionnels
- [x] Page d'Accueil (Hero, Services, Localisations, CitizenCTA)
- [x] Page Contact avec infos et map
- [x] Mise à jour Design System (couleurs nationales)
- [x] Restriction HeaderUser (Admin uniquement)

## Phase 4 : Frontend - Fonctionnalités Métier ✅

### 4.1 Catalogue des Services ✅

- [x] Corriger `/services/$slug.tsx` (adapter au schéma Convex actuel)
- [x] Page liste `/services/index.tsx` - vérifier intégration données
- [x] Affichage des tarifs, délais, documents requis

### 4.2 Page Institutionnelle "Le Consulat" ✅

- [x] Créer route `/le-consulat.tsx`
- [x] Contenu : Missions du Consulat (source: `resources/consulat_info.md`)
- [x] Section contacts (adresse, téléphones, email)

### 4.3 Blog Actualités ✅

- [x] Page liste `/actualites/index.tsx`
- [x] Page article `/actualites/$slug.tsx`
- [x] Intégration avec `posts` Convex

## Phase 5 : Administration (CMS)

- [ ] Dashboard Admin simplifié
- [ ] CRUD Actualités (formulaire de rédaction)
- [ ] CRUD Services (mise à jour tarifs/délais)
- [ ] Toggle annonces urgentes

## Phase 6 : Finalisation

- [ ] Optimisation SEO (Meta tags dynamiques)
- [ ] Tests responsive (Mobile/Tablette)
- [ ] Vérification accessibilité
- [ ] Déploiement production
