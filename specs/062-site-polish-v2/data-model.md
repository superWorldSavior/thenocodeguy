# Data Model: Site Polish V2

## Entities

Aucune entité de données — cette feature est purement visuelle (CSS/design tokens + composant UI).

## i18n Keys Modified

### Clés à renommer (Lab → Blog)

Les articles référencent encore des clés "Lab" dans les traductions :

| Namespace | Clé actuelle | Nouvelle clé | Impact |
|-----------|-------------|-------------|--------|
| `articles.veilleEmail` | `labBadge` | `blogBadge` | Badge catégorie dans l'article |
| `articles.windmillVsN8n` | `labBadge` | `blogBadge` | Badge catégorie dans l'article |

### Valeurs à mettre à jour

| Locale | Clé | Ancienne valeur | Nouvelle valeur |
|--------|-----|----------------|-----------------|
| fr | `articles.veilleEmail.labBadge` | "Lab" | "Blog" |
| en | `articles.veilleEmail.labBadge` | "Lab" | "Blog" |
| zh-TW | `articles.veilleEmail.labBadge` | "Lab" | "Blog" |
| zh-CN | `articles.veilleEmail.labBadge` | "Lab" | "Blog" |
| fr | `articles.windmillVsN8n.labBadge` | "Lab" | "Blog" |
| en | `articles.windmillVsN8n.labBadge` | "Lab" | "Blog" |
| zh-TW | `articles.windmillVsN8n.labBadge` | "Lab" | "Blog" |
| zh-CN | `articles.windmillVsN8n.labBadge` | "Lab" | "Blog" |

### Nouvelles clés (locale switcher labels)

| Namespace | Clé | fr | en | zh-TW | zh-CN |
|-----------|-----|----|----|-------|-------|
| `nav` | `langFr` | "Français" | "Français" | "Français" | "Français" |
| `nav` | `langEn` | "English" | "English" | "English" | "English" |
| `nav` | `langZhTw` | "繁體中文" | "繁體中文" | "繁體中文" | "繁體中文" |
| `nav` | `langZhCn` | "简体中文" | "简体中文" | "简体中文" | "简体中文" |
| `nav` | `switchLanguage` | "Langue" | "Language" | "語言" | "语言" |
