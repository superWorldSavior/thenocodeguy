# Feature Specification: SEO Optimization

**Feature Branch**: `005-seo-optimization`
**Created**: 2026-02-26
**Status**: Draft
**Input**: DataForSEO API audit + wording shift to "delegation/staffing IA". All changes in 4 locales (fr, en, zh-TW, zh-CN).

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Fix technical SEO bugs (Priority: P1)

A search engine crawls thenocodeguy.com and encounters duplicate title suffixes ("— TheNoCodeGuy | TheNoCodeGuy"), pages with titles over 60 characters, a missing H1 tag, and zero outbound links. These technical issues prevent proper indexing and reduce crawl quality.

The site owner needs all technical SEO defects fixed across all 4 locales (fr, en, zh-TW, zh-CN) so that Google and other search engines can properly index every page.

**Why this priority**: Technical bugs block all other SEO efforts. No content strategy matters if pages display broken metadata in SERPs.

**Independent Test**: After implementation, run a DataForSEO on-page crawl and verify the on-page score reaches 99+/100 with zero critical issues.

**Acceptance Scenarios**:

1. **Given** 8 pages have titles longer than 60 characters due to duplicate suffix, **When** crawled, **Then** all page titles are under 60 characters with a single brand suffix
2. **Given** 1 page has no H1 tag, **When** crawled, **Then** every page has exactly one H1
3. **Given** pages have zero external links, **When** crawled, **Then** at least 10 relevant external links exist across the site (FFBatiment, Service-public.fr, FranceNum, etc.)
4. **Given** 5 images lack title attributes, **When** crawled, **Then** all images have both alt and title attributes
5. **Given** all fixes apply to 4 locales, **When** switching locale, **Then** each locale shows properly translated meta titles and descriptions

---

### User Story 2 — Optimize meta descriptions for delegation/staffing positioning (Priority: P2)

A potential client searches for "agent ia" or "assistant ia btp" on Google. The SERP snippet for thenocodeguy.com should clearly communicate the AI agent staffing/delegation value proposition. Meta titles and descriptions across all pages and all 4 locales must reflect the new "embaucher/déléguer" positioning while targeting keywords with proven search volume.

**Why this priority**: Meta descriptions are the first impression in SERPs. With the wording shift from "automatiser" to "déléguer/embaucher", all meta tags need to incorporate high-volume keywords ("agent ia" 6,600/month, "assistant ia" 1,900/month).

**Independent Test**: Grep all metaTitle/metaDesc keys in all 4 locale files. Verify zero instances of "Automatisez" in meta tags, and that "agent ia" or "assistant ia" appear in strategic page metas.

**Acceptance Scenarios**:

1. **Given** metaDesc for /domaines/btp says "Automatisez l'admin BTP...", **When** updated, **Then** it uses delegation language and includes "agent IA" keyword, in all 4 locales
2. **Given** metaDesc for /domaines/commerce says "Automatisez votre prospection...", **When** updated, **Then** it uses delegation language, in all 4 locales
3. **Given** metaDesc for /domaines/admin says "Automatisez votre back-office...", **When** updated, **Then** it uses delegation language, in all 4 locales
4. **Given** metaDesc for /domaines/web says "Automatisez votre présence en ligne...", **When** updated, **Then** it uses delegation language, in all 4 locales
5. **Given** all meta descriptions, **When** measured, **Then** each is between 120-155 characters

---

### User Story 3 — Create pillar page "Agent IA" (Priority: P3)

A user searches for "agent ia" (6,600 searches/month — the highest volume keyword in the space). Currently no page on thenocodeguy.com targets this query. A dedicated pillar page at /agent-ia explains what an AI agent is, how it works, what types exist, and positions TheNoCodeGuy as the staffing solution. This page must exist in all 4 locales.

**Why this priority**: "agent ia" is the #1 keyword opportunity. Creating a dedicated page is the fastest path to organic traffic.

**Independent Test**: Navigate to /fr/agent-ia, /en/agent-ia, /zh-TW/agent-ia, /zh-CN/agent-ia. Each page loads with locale-appropriate content, proper H1, structured sections, internal links to domain pages, and a CTA.

**Acceptance Scenarios**:

1. **Given** the page does not exist, **When** created, **Then** /[locale]/agent-ia is accessible in all 4 locales with 1,500+ words of content (FR version)
2. **Given** the page exists, **When** checked for SEO, **Then** the H1 contains "agent IA", the meta title is under 60 characters, the meta description is 120-155 characters
3. **Given** the page content, **When** reviewed, **Then** it contains sections: what is an AI agent, types of agents, use cases by sector, how TheNoCodeGuy staffing works, FAQ, and a CTA
4. **Given** the page, **When** checked for internal linking, **Then** it links to all 4 domain pages and the contact page
5. **Given** the pillar page, **When** checked for external links, **Then** it includes at least 3 authoritative external references

---

### User Story 4 — Enrich domain pages for keyword targeting (Priority: P4)

A user searches for "ia btp" (140 searches/month, +29% YoY growth). The /domaines/btp page currently has thin content. DataForSEO analysis shows all BTP IA competitors target devis/chantier — nobody targets the administrative assistant angle. Enriching domain pages captures this uncontested niche. Same enrichment for commerce, admin, and web domain pages. All in 4 locales.

**Why this priority**: Blue ocean opportunity — the admin assistant angle in BTP is 100% uncontested. Enriching domain pages with targeted content directly attacks this niche.

**Independent Test**: Check word count on /fr/domaines/btp. Verify it exceeds 1,500 words with FAQ section and structured headings.

**Acceptance Scenarios**:

1. **Given** /domaines/btp has thin content, **When** enriched, **Then** it contains 1,500+ words (FR) with FAQ section, detailed use cases, and structured headings targeting "ia btp" and "assistant ia btp"
2. **Given** /domaines/commerce has thin content, **When** enriched, **Then** it contains 1,000+ words (FR) with expanded use cases
3. **Given** /domaines/admin has thin content, **When** enriched, **Then** it contains 1,000+ words (FR) with expanded use cases
4. **Given** /domaines/web has thin content, **When** enriched, **Then** it contains 1,000+ words (FR) with expanded use cases
5. **Given** all enrichments, **When** checked across locales, **Then** en, zh-TW, and zh-CN versions have equivalent translated content

---

### User Story 5 — Enrich blog listing and low-content pages (Priority: P5)

The blog listing page (/blog) has only 52 words. The contact page has 57 words. These are flagged as low-content by crawlers. They need introductory SEO text to improve crawl quality. All changes in 4 locales.

**Why this priority**: Low-content pages signal poor quality to search engines. Minimal effort for meaningful crawl improvement.

**Independent Test**: Check word count on /fr/blog listing page. Verify it exceeds 200 words.

**Acceptance Scenarios**:

1. **Given** /blog listing has 52 words, **When** enriched, **Then** it has an SEO introduction paragraph (200+ words) describing the blog's purpose and topics, in all 4 locales
2. **Given** /contact has 57 words, **When** enriched, **Then** it has contextual content (150+ words) about the consultation process, in all 4 locales

---

### Edge Cases

- What happens when a meta description exceeds 155 characters? It gets truncated in SERPs — all descriptions must be 120-155 characters.
- How do we handle keywords with zero search volume in Chinese markets? Use the closest equivalent terms; Chinese content serves brand presence, not SEO volume.
- What if the layout template concatenates "| TheNoCodeGuy" to titles? The fix must happen in the layout metadata template, not in individual page meta titles.
- What if adding content to domain pages breaks the existing before/after card layout? New content must be added as separate sections (FAQ, use cases) without modifying existing layout structure.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All page titles MUST be under 60 characters and contain only one brand suffix
- **FR-002**: All meta descriptions MUST display properly translated text in each locale (no raw i18n keys)
- **FR-003**: All meta descriptions MUST be between 120-155 characters
- **FR-004**: Meta descriptions on domain pages MUST replace "Automatisez" with delegation/agent language and include high-volume keywords ("agent ia", "assistant ia")
- **FR-005**: The site MUST contain at least 10 relevant external links across its pages
- **FR-006**: Every page MUST have exactly one H1 tag
- **FR-007**: A pillar page at /[locale]/agent-ia MUST exist in all 4 locales (fr, en, zh-TW, zh-CN)
- **FR-008**: The pillar page MUST contain 1,500+ words (FR version) with structured headings (H2, H3)
- **FR-009**: /domaines/btp MUST be enriched to 1,500+ words (FR); other domain pages to 1,000+ words
- **FR-010**: Blog listing page MUST include an SEO introduction (200+ words in FR)
- **FR-011**: Contact page MUST include contextual SEO content (150+ words in FR)
- **FR-012**: All content changes MUST be implemented in all 4 locales: fr, en, zh-TW, zh-CN
- **FR-013**: All images MUST have both alt and title attributes

### Key Entities

- **Page Metadata**: title (max 60 chars), description (120-155 chars), H1 tag, locale
- **Pillar Page**: /agent-ia — definition content, use cases, internal links to domain pages, CTA
- **Domain Page**: /domaines/{sector} — enriched content, FAQ section, use cases, external links
- **Translation Keys**: All new content added via next-intl JSON files in messages/{locale}.json

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On-page SEO score reaches 99+/100 (from current 97/100) as measured by DataForSEO crawl
- **SC-002**: Zero pages with title longer than 60 characters
- **SC-003**: Zero pages with broken or missing meta descriptions
- **SC-004**: Zero instances of "Automatisez" in any metaTitle or metaDesc across all 4 locale files
- **SC-005**: At least 10 external links across the site (from current 0)
- **SC-006**: Pillar page /agent-ia exists and loads in all 4 locales with 1,500+ words (FR)
- **SC-007**: /domaines/btp reaches 1,500+ words (FR) with targeted keywords
- **SC-008**: All 4 domain pages enriched to their target word count in all 4 locales
- **SC-009**: Blog listing and contact page enriched to target word counts in all 4 locales
- **SC-010**: Site meta tags target keywords with proven search volume: "agent ia" (6,600/mo), "assistant ia" (1,900/mo), "ia btp" (140/mo)

## Assumptions

- The layout.tsx template system handles the "| TheNoCodeGuy" suffix — the fix may need to be in the layout metadata configuration
- Chinese locale content serves brand presence; SEO volume for Chinese AI terms is not a primary target
- External links should point to authoritative French sources (FFBatiment.fr, Service-public.fr, FranceNum.gouv.fr, etc.)
- Blog articles use MDX frontmatter for meta descriptions, not JSON translation files
- The DataForSEO report at /seo-analysis-report.md provides the baseline metrics
- Domain page enrichment adds new sections (FAQ, expanded use cases) without modifying existing before/after card layout
