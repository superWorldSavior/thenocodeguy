---
id: 82
title: "SEO complet — meta tags, Open Graph, sitemap, robots.txt"
priority: high
size: M
labels: [m1]
---

## Description
Compléter le SEO on-page au-delà du JSON-LD (#55) : meta title/description uniques par page, Open Graph tags (og:title, og:description, og:image), Twitter Cards, sitemap.xml dynamique, robots.txt. Positionnement agence de staffing IA dans toutes les meta.

## Acceptance Criteria
- Every public page (/, /contact, /legal, /privacy, /a-propos) has a unique `<title>` and `<meta name="description">` tag — no two pages share the same title or description
- Every public page has Open Graph tags (og:title, og:description, og:image, og:url) and Twitter Card tags (twitter:card, twitter:title, twitter:description) in the HTML `<head>`
- A valid sitemap.xml is generated at /sitemap.xml listing all public pages across all 4 locales, and returns HTTP 200 with Content-Type application/xml
- robots.txt exists at /robots.txt, allows crawling of all public pages, and contains a Sitemap directive pointing to the sitemap.xml URL
- No meta content references "SaaS", "subscription", or "pricing" — all descriptions use staffing/recruitment vocabulary aligned with the agency positioning
