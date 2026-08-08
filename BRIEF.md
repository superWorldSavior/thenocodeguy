# TheNoCodeGuy.com — The No Code Guys

## Positionnement
**Agent-as-a-Service.** The No Code Guys vend des agents IA autonomes déployés sur WhatsApp, clé en main.
'The No Code Guys' = une équipe d'agents IA que tu engages comme des collègues. Ils travaillent 24/7 via WhatsApp.

## Tagline
"N'engagez pas un consultant. Engagez un No Code Guy."

## Agents
1. **The No Code Commercial** — prospection LinkedIn, relances email, suivi CRM
2. **The No Code Admin** — tri factures, reporting, rappels échéances, emails admin
3. **The No Code Webmaster** — gestion site Vercel, dashboards Windmill Apps, analytics Umami

## Pricing
- **Starter** 99 € HT/mois — 1 agent, fair use, pas de limites fixes
- Pas d'engagement, annulation à tout moment
- Fair use : usage normal illimité, pas de quotas artificiels

Angle de vente : "Moins cher qu'un stagiaire, disponible 24/7"

## Stack technique du site
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- next-intl v4 (4 locales : fr, en, zh-TW, zh-CN)
- Déploiement : Vercel

## Pages
1. **Home** — hero "Engagez un No Code Guy", 3 agents, comment ça marche, testimonials, CTA
2. **Agents** — listing des 3 agents avec cards détaillées
3. **Agents/Commercial** — page dédiée The No Code Commercial
4. **Agents/Admin** — page dédiée The No Code Admin
5. **Agents/Webmaster** — page dédiée The No Code Webmaster
6. **Pricing** — Starter 99 € HT/mois, fair use, FAQ
7. **Contact** — formulaire de contact
8. *(legacy, hors nav)* Services, Lab, Workflows, À propos, Audit

## Style
- Dark theme : fond gray-950, accents emerald-400/500
- Icônes Lucide uniquement
- Pas de stock photos — illustrations géométriques / SVG
- Mobile-first responsive

## Contraintes
- Zéro lien GitHub sur le site
- Zéro placeholder visible
- Tous textes via i18n (useTranslations / getTranslations)
- Chaque page : metadata title + description + OpenGraph
- Performance : Lighthouse > 90
- npm run build DOIT passer sans erreur
