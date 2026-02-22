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
- Every page across all 4 locales has a unique <title> tag (no two pages share the same title) and a <meta name="description"> tag with content between 50 and 160 characters
- Every page includes og:title, og:description, og:image, og:url, og:locale meta tags AND twitter:card, twitter:title, twitter:description, twitter:image meta tags with non-empty values
- A GET request to /sitemap.xml returns HTTP 200 with Content-Type containing "xml", lists all public pages across all 4 locales with valid <loc> URLs and <lastmod> dates, and contains no URLs returning 404
- A GET request to /robots.txt returns HTTP 200 with Content-Type containing "text/plain", includes a Sitemap directive pointing to the absolute URL of /sitemap.xml, and does not disallow any public page paths
- The meta description of the homepage for each locale contains at least one keyword related to AI agent staffing (e.g., "AI agents", "agents IA", "AI人才", or equivalent locale-appropriate term)
