# Data Model: 061-site-polish-domaines

## Entities

### Page Domaine (i18n namespace)

Chaque page domaine est définie par un namespace i18n dans `messages/*.json`. Pas de base de données.

| Champ | Type | Description |
|-------|------|-------------|
| `metaTitle` | string | Titre SEO de la page |
| `metaDesc` | string | Description SEO |
| `badge` | string | Badge domaine (ex: "Commerce & Ventes") |
| `title` | string | Titre H1 du hero |
| `subtitle` | string | Sous-titre du hero |
| `ctaTop` | string | Label du CTA hero |
| `beforeLabel` | string | Label "AVANT" (partagé) |
| `afterLabel` | string | Label "APRÈS" (partagé) |
| `section{N}Title` | string | Titre de la section N (1-6) |
| `section{N}Before{M}` | string | Item "avant" M de la section N |
| `section{N}After{M}` | string | Item "après" M de la section N |
| `referenceTitle` | string | Titre bloc référence client |
| `referenceDesc` | string | Description référence client |
| `referenceStat{N}Value` | string | Valeur stat N |
| `referenceStat{N}Label` | string | Label stat N |
| `cta` | string | Label CTA final |
| `ctaSubtext` | string | Sous-texte CTA final |

**Namespaces**: `domainesBtp` (existant), `domainesCommerce`, `domainesAdmin`, `domainesWeb` (à créer).

### Formulaire Contact (champs)

| Champ | Type | Required | Options |
|-------|------|----------|---------|
| name | text | oui | — |
| email | email | oui | — |
| company | text | oui | — |
| role | select | oui | btp, commercial, administratif, webmaster, autre |
| missions | textarea | oui | — |
| tools | text | non | — |
| timeline | select | non | asap, month, quarter, exploring |

**Changement**: Ajout de l'option `btp` ("BTP / Construction") en première position dans le select `role`.

### Blog (routing)

| Ancien chemin | Nouveau chemin | Type |
|---------------|----------------|------|
| `/[locale]/lab` | `/[locale]/blog` | Redirect 301 |
| `/[locale]/lab/comment-automatiser-veille-email` | `/[locale]/blog/comment-automatiser-veille-email` | Redirect 301 |
| `/[locale]/lab/windmill-vs-n8n` | `/[locale]/blog/windmill-vs-n8n` | Redirect 301 |

**i18n**: Le namespace `lab` est renommé en `blog` dans les 4 fichiers de messages.
