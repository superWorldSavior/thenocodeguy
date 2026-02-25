# Research: 061-site-polish-domaines

## R1 — Template pages domaines : copier vs abstraire

**Decision**: Copier le pattern de `btp/page.tsx` pour chaque page domaine (Commerce, Admin, Web) sans créer de composant partagé.

**Rationale**: La page BTP utilise un tableau `sections` avec des clés i18n indexées (`section1Title`, `section1Before1`, etc.) et un rendu JSX direct. C'est simple, lisible, et chaque page peut avoir un nombre différent de sections/items. Abstraire en composant partagé ajouterait de la complexité (config object, généricité) pour 3 pages qui ne changeront pas souvent.

**Alternatives considered**:
- Composant `DomainePage` générique avec props `{namespace, sections, icon}` → Plus DRY mais violé le principe V (simplicité). La page BTP a 6 sections de 3-4 items, d'autres domaines pourraient en avoir moins.
- Template dynamique avec `[slug]/page.tsx` → Nécessiterait une logique de routing dynamique et un mapping slug→config. Over-engineering pour 4 pages statiques.

## R2 — Lab → Blog : rename vs redirect

**Decision**: Déplacer les fichiers de `app/[locale]/lab/` vers `app/[locale]/blog/` et ajouter des redirections 301 via le fichier proxy/middleware Next.js existant.

**Rationale**: Next.js 16 utilise `proxy` (anciennement middleware). Les redirections 301 préservent le SEO des URLs existantes. Le contenu est identique, seul le chemin change.

**Alternatives considered**:
- Garder les deux routes (lab + blog) → Contenu dupliqué, mauvais pour le SEO.
- Redirect côté Vercel (vercel.json) → Fonctionne mais centraliser dans le code est préférable pour la maintenance.

## R3 — Contenu Avant/Après pour Commerce, Admin, Web

**Decision**: Rédiger le contenu métier en se basant sur des scénarios réalistes pour chaque secteur, avec le même ton que la page BTP (problème concret → solution agent IA).

**Rationale**: Le contenu BTP est validé et performant. Il suit le pattern : titre section → avant (douleur) → après (solution IA). Chaque domaine a ses propres problématiques métier distinctes.

**Sections prévues**:
- **Commerce** : Prospection, Qualification leads, Suivi CRM, Reporting commercial, Relances clients
- **Admin** : Tri courrier/email, Planification, Pré-comptabilité, Suivi RH, Gestion fournisseurs
- **Web** : Monitoring, SEO, Déploiements, Analytics, Maintenance

## R4 — Fix selects formulaire contact

**Decision**: Remplacer les styles inline `var()` par des classes Tailwind cohérentes avec les inputs shadcn/ui. Ajouter un composant `<select>` stylisé ou utiliser les classes des `Input` shadcn.

**Rationale**: Les selects actuels utilisent `border-[var(--input)]` et `focus-visible:ring-[var(--ring)]` en inline. Les inputs shadcn utilisent des classes Tailwind standard. Aligner les deux pour la cohérence visuelle, surtout en dark mode.

**Alternatives considered**:
- Utiliser le composant Select de shadcn/ui (Radix) → Plus riche (dropdown custom) mais over-engineering pour un simple formulaire de contact. Le `<select>` natif est plus accessible et léger.
