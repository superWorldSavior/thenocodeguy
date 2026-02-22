---
id: 81
title: "Page À propos — histoire, équipe, mission"
priority: high
size: M
labels: [m1]
---

## Description
Créer la page /a-propos (ou /about selon locale) présentant The No Code Guys : l'histoire du fondateur, la mission (Randstad de l'IA — placer des agents IA dans les équipes), la vision. Positionnement agence de staffing IA. Page essentielle pour la confiance B2B.

## Acceptance Criteria
- Navigating to /about (en), /a-propos (fr), /about (zh-TW), /about (zh-CN) returns HTTP 200 and renders the About page with locale-appropriate content
- The page contains three visible sections: founder story (with at least one paragraph of text), mission statement mentioning AI agent staffing for businesses, and vision statement
- The page includes at least one image (founder or team photo) with a non-empty alt attribute
- The page uses the site-wide light-mode shadcn/ui layout (header, footer) and passes axe-core accessibility checks with zero critical violations
- The HTML lang attribute matches the current locale (en, fr, zh-TW, zh-CN) and all visible text strings are translated (no untranslated French or English strings appear in non-matching locales)
