# Spécifications Techniques

## 1. Stack Technologique

Le projet repose sur une architecture moderne "Full-stack TypeScript".

- **Frontend Framework** : [TanStack Start](https://tanstack.com/start) (React framework avec Server-Side Rendering).
- **Build Tool** : Vite.
- **Routing** : TanStack Router (File-based routing dans `src/routes`).
- **Langage** : TypeScript.
- **Styling** :
  - Tailwind CSS v4.
  - Composants UI : shadcn/ui (basé sur Radix UI).
  - Icônes : Lucide React.
- **Backend / Database** : [Convex](https://convex.dev/) (Backend-as-a-Service).
  - Base de données temps réel.
  - Fonctions serverless (Queries, Mutations).
  - Stockage de fichiers (Images des articles).
- **Authentification (Admin)** : [Clerk](https://clerk.com/).
- **Validation** : Zod.

## 2. Architecture des Données (Convex Schema)

### Tables

#### `posts` (Actualités)

Stores news and events.

```typescript
{
  title: v.string(),
  slug: v.string(), // indexé pour les URLs
  excerpt: v.string(),
  content: v.string(), // HTML ou Markdown stocké
  coverImage: v.optional(v.id("_storage")),
  category: v.union(v.literal("communique"), v.literal("evenement"), v.literal("actualite")),
  publishedAt: v.number(), // Timestamp
  status: v.union(v.literal("draft"), v.literal("published")),
}
```

#### `services` (Catalogue)

Stores service details, requirements, and pricing.

```typescript
{
  title: v.string(),
  slug: v.string(),
  description: v.string(),
  category: v.string(), // ex: "Identité", "Etat Civil"
  requirements: v.array(v.string()), // Liste des pièces
  price: v.string(), // ex: "55 €"
  delay: v.optional(v.string()), // ex: "1 an"
  actionLink: v.optional(v.string()), // URL externe
  isOnline: v.boolean(), // Si une démarche en ligne existe
}
```

#### `announcements` (Alertes)

Global site alerts.

```typescript
{
  message: v.string(),
  type: v.union(v.literal("info"), v.literal("warning"), v.literal("error")),
  isActive: v.boolean(),
  startAt: v.optional(v.number()),
  endAt: v.optional(v.number()),
}
```

## 3. Architecture Frontend

### Routing (`src/routes`)

- `__root.tsx` : Layout global (Header, Footer, Toast provider).
- `index.tsx` : Page d'accueil.
- `consulat.tsx` : Page de présentation institutionnelle.
- `services/`
  - `index.tsx` : Liste des services (Grille).
  - `$slug.tsx` : Page de détail d'un service (ou géré via Query param pour Modale).
- `actualites/`
  - `index.tsx` : Liste paginée.
  - `$slug.tsx` : Article complet.
- `contact.tsx` : Infos pratiques.
- `admin/` : Routes protégées (Guard `_layout.tsx` vérifiant Auth Clerk).
  - `dashboard.tsx`
  - `posts/...`
  - `services/...`

### Composants Clés

- `Navigation` : Menu responsive.
- `ServiceCard` : Résumé d'un service.
- `ServiceModal` : Affichage rapide des détails sans changer de page (Pattern Intercepting Routes ou simple Dialog).
- `NewsCard` : Aperçu actualité.
- `Admin/Editor` : Composant d'édition de texte (ex: petit wrapper autour d'un textarea ou tiptap si besoin de riche).

## 4. Intégrations Externes

- **Maps** : Iframe Google Maps ou Leaflet pour la page Contact.
- **Analytics** : (À définir, ex: Google Analytics ou Plausible).
- **Emails** : Non requis pour le MVP (pas de formulaire de contact, juste lien `mailto`).

## 5. Sécurité

- **RLS (Row Level Security)** via Convex :
  - Lecture : `public` pour tous les documents statut `published`.
  - Écriture : `admin` uniquement (Vérification identité Clerk).
- Sanitization du contenu HTML des articles avant affichage.
