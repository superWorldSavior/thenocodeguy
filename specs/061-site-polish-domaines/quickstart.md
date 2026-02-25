# Quickstart: 061-site-polish-domaines

## Prérequis

- Node.js 20+
- `npm install` (deps déjà installées)
- Dev server : `PORT=3005 npm run dev` (port 3005, 3000 occupé par Grafana)

## Vérification rapide

```bash
# Vérifier que la branche est correcte
git branch --show-current
# → 061-site-polish-domaines

# Lancer le dev server
PORT=3005 npm run dev

# Vérifier les pages domaines
# → http://localhost:3005/fr/domaines/btp (existant)
# → http://localhost:3005/fr/domaines/commerce (à créer)
# → http://localhost:3005/fr/domaines/admin (à créer)
# → http://localhost:3005/fr/domaines/web (à créer)

# Vérifier le formulaire contact
# → http://localhost:3005/fr/contact

# Vérifier le blog (après rename)
# → http://localhost:3005/fr/blog

# Build final
npm run build
```

## Fichiers clés à modifier

| Fichier | Raison |
|---------|--------|
| `app/[locale]/domaines/commerce/page.tsx` | Nouvelle page Commerce |
| `app/[locale]/domaines/admin/page.tsx` | Nouvelle page Admin |
| `app/[locale]/domaines/web/page.tsx` | Nouvelle page Web |
| `app/[locale]/contact/ContactForm.tsx` | Fix selects + ajout BTP |
| `app/[locale]/blog/` | Déplacé depuis `lab/` |
| `components/Navigation.tsx` | Ajout lien Blog |
| `components/Footer.tsx` | Ajout lien Blog |
| `messages/*.json` | Nouvelles clés domaines + rename lab→blog |
| `middleware.ts` ou `proxy.ts` | Redirections /lab → /blog |

## Ordre d'implémentation recommandé

1. Pages domaines (P1) — le plus gros morceau
2. Polish formulaire contact (P2) — rapide
3. Lab → Blog (P3) — rename + redirections
4. Build final + vérification visuelle
