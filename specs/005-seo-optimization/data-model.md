# Data Model: SEO Optimization

**Feature**: 005-seo-optimization | **Date**: 2026-02-26

## Entities

### Page Metadata (Translation Keys)

All page metadata lives in `messages/{locale}.json` files. No database. No API.

| Field | Constraint | Example |
|-------|-----------|---------|
| metaTitle | Max ~48 chars (template adds " \| TheNoCodeGuy" = ~15 chars → total < 60) | "Assistante admin BTP augmentée par l'IA" |
| metaDesc | 120-155 chars | "Déléguez l'admin BTP à un agent IA autonome..." |

### Translation Namespaces (new or modified)

| Namespace | Purpose | New Keys |
|-----------|---------|----------|
| `agentIA` | Pillar page /agent-ia | ~40 keys (hero, sections, FAQ, CTA) |
| `domainesBtp` | BTP domain enrichment | ~25 keys (FAQ, use cases, external links) |
| `domainesCommerce` | Commerce enrichment | ~20 keys (FAQ, use cases) |
| `domainesAdmin` | Admin enrichment | ~20 keys (FAQ, use cases) |
| `domainesWeb` | Web enrichment | ~20 keys (FAQ, use cases) |
| `blog` | Blog listing intro | ~5 keys (intro paragraph) |
| `contact` | Contact page content | ~5 keys (process description) |

### Pillar Page Content Structure

```
agentIA.metaTitle
agentIA.metaDesc
agentIA.heroTitle (H1)
agentIA.heroSubtitle
agentIA.whatTitle (H2)
agentIA.whatP1, whatP2, whatP3
agentIA.typesTitle (H2)
agentIA.type{1-4}Title, type{1-4}Desc
agentIA.useCasesTitle (H2)
agentIA.useCase{1-4}Title, useCase{1-4}Desc, useCase{1-4}Link
agentIA.howTitle (H2)
agentIA.step{1-4}Title, step{1-4}Desc
agentIA.faqTitle (H2)
agentIA.faq{1-5}Q, faq{1-5}A
agentIA.ctaTitle
agentIA.ctaDesc
```

### Domain Page FAQ Structure (per domain)

```
domaines{Sector}.faqTitle
domaines{Sector}.faq{1-5}Q
domaines{Sector}.faq{1-5}A
domaines{Sector}.useCasesTitle
domaines{Sector}.useCase{1-3}Title
domaines{Sector}.useCase{1-3}Desc
domaines{Sector}.externalLink{1-3}Label
domaines{Sector}.externalLink{1-3}Url
```

## Relationships

- Pillar page `/agent-ia` → links to all 4 domain pages + contact
- Domain pages → link to pillar page + relevant external sites
- Blog listing → links to all articles
- All pages → consistent metaTitle format via layout template
