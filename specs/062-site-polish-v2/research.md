# Research: Site Polish V2

## R1 — Remplacement des couleurs hardcodées blog

**Decision** : Remplacer toutes les classes Tailwind hardcodées (`bg-gray-950`, `text-emerald-400`, `bg-gray-900`, etc.) par les design tokens shadcn (`bg-background`, `text-primary`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`).

**Rationale** : Le site utilise déjà un système de tokens CSS via `@theme inline` dans `globals.css`. Ces tokens s'adaptent automatiquement au dark/light mode. Les couleurs hardcodées ignorent complètement ce système.

**Mapping des remplacements** :

| Hardcodé (actuel) | Token shadcn (cible) |
|-------------------|---------------------|
| `bg-gray-950` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-gray-400` | `text-muted-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `text-gray-300` | `text-card-foreground` |
| `text-emerald-400` | `text-primary` |
| `bg-emerald-500` | `bg-primary` |
| `hover:bg-emerald-400` | `hover:bg-brand-yellow hover:text-primary` |
| `bg-gray-900` | `bg-muted` |
| `bg-gray-900/50` | `bg-card` |
| `border-white/10` | `border-border` |
| `border-emerald-500/20` | `border-primary/20` |
| `bg-emerald-500/20` | `bg-primary/10` |
| `bg-emerald-500/5` | `bg-primary/5` |
| `bg-white/5` | `bg-muted` |
| `text-emerald-300` (code) | `text-primary` |

**Alternatives considered** :
- Créer un thème "blog" séparé → Rejeté (over-engineering, viole Principe V)
- Garder le noir + changer juste l'accent → Rejeté (ne résout pas le light mode)

## R2 — Icône et badge blog

**Decision** : Remplacer `FlaskConical` par `BookOpen` (lucide-react). Remplacer les badges "Lab" par "Blog" dans les traductions.

**Rationale** : `FlaskConical` est une icône de laboratoire, vestige du rename Lab→Blog. `BookOpen` est l'icône standard pour un blog.

**Alternatives considered** :
- `Newspaper` → Trop "actualités", pas blog
- `PenLine` → Trop "écriture", pas lecture
- `Rss` → Trop technique
- `BookOpen` → Parfait : évoque lecture, articles, contenu ✓

## R3 — Code blocks styling

**Decision** : Les code blocks dans les articles utilisent `bg-muted` avec `text-foreground` et des accents `text-primary` pour les mots-clés. Les blocs restent sombres même en light mode (convention standard des éditeurs de code).

**Rationale** : Les code blocks sont traditionnellement sombres sur fond clair — c'est un standard UX. On utilise `bg-[#1e1e2e]` (un gris très sombre neutre) avec `text-[#cdd6f4]` pour le texte, compatible avec les deux modes.

**Alternative** : Utiliser `bg-muted` directement → Rejeté car en light mode, muted est trop clair pour du code.

## R4 — Globe locale switcher

**Decision** : Utiliser le composant `DropdownMenu` de shadcn/ui avec un trigger `Globe` (lucide-react).

**Rationale** : shadcn DropdownMenu est construit sur Radix UI, gère l'accessibilité (keyboard nav, focus trap, ESC to close), et s'intègre au design system existant.

**Structure** :
- Desktop : `<DropdownMenuTrigger>` = bouton Globe dans la nav → `<DropdownMenuContent>` = liste des 4 langues
- Mobile : même pattern dans le menu hamburger
- Langue active : `<DropdownMenuCheckboxItem>` ou indicateur visuel (check icon)

**Installation** : `npx shadcn@latest add dropdown-menu` (ajoute `@radix-ui/react-dropdown-menu`)

**Labels langues** :
| Code | Label court | Label complet |
|------|-------------|---------------|
| fr | FR | Français |
| en | EN | English |
| zh-TW | 繁中 | 繁體中文 |
| zh-CN | 简中 | 简体中文 |

**Alternatives considered** :
- Popover custom → Rejeté (réinventer la roue, pas accessible)
- Select natif → Rejeté (pas stylable de manière cohérente)
- shadcn Select → Possible mais DropdownMenu est plus adapté (pas un formulaire)

## R5 — Lien /workflows

**Decision** : Remplacer le lien `/workflows` dans l'article "comment-automatiser-veille-email" par `/contact`. Ce lien pointe vers une page inexistante.

**Rationale** : La page `/workflows` n'existe pas et n'est pas prévue. Le CTA naturel pour "accéder au workflow" est de contacter l'agence.
