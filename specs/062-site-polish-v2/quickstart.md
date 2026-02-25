# Quickstart: 062-site-polish-v2

## Prérequis

- Node.js 20+
- `npm install` (deps déjà installées)
- Dev server : `PORT=3005 npm run dev` (port 3005, 3000 occupé par Grafana)

## Vérification rapide

```bash
# Vérifier que la branche est correcte
git branch --show-current
# → 062-site-polish-v2

# Installer le composant DropdownMenu shadcn
npx shadcn@latest add dropdown-menu

# Lancer le dev server
PORT=3005 npm run dev

# Vérifier les pages blog (US1)
# → http://localhost:3005/fr/blog (listing)
# → http://localhost:3005/fr/blog/comment-automatiser-veille-email (article 1)
# → http://localhost:3005/fr/blog/windmill-vs-n8n (article 2)
# Vérifier en light mode ET dark mode
# Vérifier en EN aussi

# Vérifier le locale switcher (US2)
# → Cliquer sur l'icône globe dans la nav
# → Dropdown avec 4 langues
# → Changer de langue → page recharge

# Build final
npm run build
```

## Fichiers clés à modifier

| Fichier | Raison |
|---------|--------|
| `app/[locale]/blog/page.tsx` | Remplacer couleurs hardcodées par design tokens |
| `app/[locale]/blog/comment-automatiser-veille-email/page.tsx` | Idem + remplacer FlaskConical, lien /workflows |
| `app/[locale]/blog/windmill-vs-n8n/page.tsx` | Idem + remplacer FlaskConical |
| `components/Navigation.tsx` | Remplacer pills horizontales par globe + dropdown |
| `components/ui/dropdown-menu.tsx` | Nouveau composant via shadcn CLI |
| `messages/*.json` | Renommer labBadge→blogBadge, ajouter clés langue |

## Ordre d'implémentation recommandé

1. Blog refonte design system (P1) — le plus impactant visuellement
2. Globe locale switcher (P2) — composant nav
3. Vérification globale (P3) — build + liens + dark mode
