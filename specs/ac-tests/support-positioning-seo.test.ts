import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");

function readText(path: string) {
  return readFileSync(resolve(root, path), "utf8");
}

function readJson<T>(path: string): T {
  return JSON.parse(readText(path)) as T;
}

type Messages = Record<string, unknown>;

describe("support-first positioning and critical SEO", () => {
  it("uses support-first trust signals on the FR acquisition funnel", () => {
    const messages = readJson<Messages>("messages/fr.json");
    const footer = messages.footer as Record<string, string>;
    const hero = messages.hero as Record<string, string>;
    const contact = messages.contact as Record<string, string>;

    expect(footer.tagline).toMatch(/support|accompagnement|mise en place/i);
    expect(hero.trustBadge2).toMatch(/support|sav|humain/i);
    expect(hero.trustBadge3).toMatch(/formation|accompagnement|validation/i);
    expect(contact.seoIntroP2).toMatch(/mise en place|formation|support|sav/i);
    expect(contact.seoIntroP3).toMatch(/support|sav|formation|accompagnement/i);
  });

  it("removes placeholder legal and privacy content from FR pages", () => {
    const messages = readJson<Messages>("messages/fr.json");
    const mentionsLegales = messages.mentionsLegales as Record<string, string>;
    const confidentialite = messages.confidentialite as Record<string, string>;
    const cgv = messages.cgv as Record<string, string>;

    expect(mentionsLegales.editorContent).not.toContain("[À COMPLÉTER]");
    expect(mentionsLegales.hostingContent).not.toContain("[À COMPLÉTER]");
    expect(confidentialite.controllerContent).not.toContain("[À COMPLÉTER]");
    expect(confidentialite.dpoContent).not.toContain("[À COMPLÉTER]");
    expect(cgv.lawContent).not.toContain("[À COMPLÉTER]");
  });

  it("prefers the live FR legal routes and avoids fake FR-only blog alternates", () => {
    const sitemapSource = readText("app/sitemap.ts");

    expect(sitemapSource).toContain('/mentions-legales');
    expect(sitemapSource).toContain('/confidentialite');
    expect(sitemapSource).not.toContain('{ path: "/legal"');
    expect(sitemapSource).not.toContain('{ path: "/privacy"');
    expect(sitemapSource).not.toContain('getBlogPosts("fr")');
  });

  it("defines page-level descriptions on key acquisition pages", () => {
    const contactPage = readText("app/[locale]/contact/page.tsx");
    const blogPage = readText("app/[locale]/blog/page.tsx");

    expect(contactPage).toMatch(/description:/);
    expect(blogPage).toMatch(/description:/);
  });

  it("keeps the remaining FR product pages aligned with supervised deployment", () => {
    const messages = readJson<Messages>("messages/fr.json");
    const blog = messages.blog as Record<string, string>;
    const about = messages.about as Record<string, string>;
    const agentIA = messages.agentIA as Record<string, string>;
    const domainesBtp = messages.domainesBtp as Record<string, string>;
    const domainesCommerce = messages.domainesCommerce as Record<string, string>;
    const domainesAdmin = messages.domainesAdmin as Record<string, string>;
    const domainesWeb = messages.domainesWeb as Record<string, string>;
    const facture = messages.facture as Record<string, string>;

    expect(blog.metaTitle).not.toMatch(/staffing/i);
    expect(blog.seoIntroP1).toMatch(/supervis|accompagnement|mise en place|support/i);
    expect(about.storyP2).not.toMatch(/sans intervention humaine/i);

    expect(agentIA.metaTitle).toMatch(/supervis|assistant/i);
    expect(agentIA.heroSubtitle).toMatch(/support|formation|supervis|humain|cadr/i);
    expect(agentIA.ctaTitle).not.toMatch(/recruter/i);
    expect(agentIA.compareTitle).not.toMatch(/recrutement classique/i);
    expect(agentIA.compareEmployeeLabel).not.toMatch(/salarié/i);

    expect(domainesBtp.metaDesc).not.toMatch(/autonome/i);
    expect(domainesBtp.title).not.toMatch(/pilote automatique/i);
    expect(domainesCommerce.metaDesc).not.toMatch(/recrutez/i);
    expect(domainesCommerce.title).not.toMatch(/tourne tout seul/i);
    expect(domainesAdmin.title).not.toMatch(/sans vous/i);
    expect(domainesWeb.metaDesc).not.toMatch(/autonome|24\/7/i);
    expect(domainesWeb.faq1A).toMatch(/continu|alerte|support|humain/i);
    expect(facture.subtitle).not.toMatch(/recrutez un agent IA/i);
    expect(facture.afterLabel).toMatch(/supervis/i);
  });

  it("adds localized metadata scaffolding to second-pass pages", () => {
    const pages = [
      "app/[locale]/a-propos/page.tsx",
      "app/[locale]/agent-ia/page.tsx",
      "app/[locale]/domaines/admin/page.tsx",
      "app/[locale]/domaines/btp/page.tsx",
      "app/[locale]/domaines/btp/facturation-electronique/page.tsx",
      "app/[locale]/domaines/commerce/page.tsx",
      "app/[locale]/domaines/web/page.tsx",
    ];

    for (const page of pages) {
      const source = readText(page);
      expect(source).toMatch(/params:\s*Promise<\{\s*locale:\s*string\s*\}>/);
      expect(source).toMatch(/alternates:/);
      expect(source).toMatch(/openGraph:/);
      expect(source).toMatch(/description:/);
    }
  });

  it("cleans the remaining FR offer and workflow copy", () => {
    const messages = readJson<Messages>("messages/fr.json");
    const agents = messages.agents as Record<string, unknown>;
    const pricing = messages.pricing as Record<string, string>;
    const profiles = messages.profiles as Record<string, string>;
    const workflows = messages.workflows as Record<string, string>;
    const cgv = messages.cgv as Record<string, string>;

    const commercial = agents.commercial as Record<string, string>;
    const admin = agents.admin as Record<string, string>;
    const webmaster = agents.webmaster as Record<string, string>;

    expect(commercial.desc).not.toMatch(/ne dort jamais/i);
    expect(commercial.heroSubtitle).not.toMatch(/24\/7/i);
    expect(admin.heroSubtitle).not.toMatch(/tourne toute seule/i);
    expect(webmaster.heroSubtitle).not.toMatch(/pilote automatique/i);

    expect(pricing.metaDesc).not.toMatch(/autonome/i);
    expect(pricing.starterDesc).not.toMatch(/autonome/i);
    expect(pricing.faq0A).toMatch(/supervis|support|cadre|validation/i);
    expect(pricing.ctaSubtitle).not.toMatch(/place un agent/i);

    expect(profiles.agent0Desc).not.toMatch(/pendant votre sommeil/i);
    expect(profiles.agent1Desc).not.toMatch(/pilote automatique/i);
    expect(profiles.agent2Desc).not.toMatch(/24h\/24/i);

    expect(workflows.wf2Desc).not.toMatch(/pilote automatique/i);
    expect(cgv.objectContent).not.toMatch(/mise à disposition d'agents|staffing/i);
    expect(cgv.intro).not.toMatch(/placement d'agents/i);
  });

  it("cleans the FR blog articles that still sell replacement-style promises", () => {
    const factureArticle = readText("content/blog/fr/facturation-electronique-btp-2026.mdx");
    const telegramArticle = readText("content/blog/fr/agent-ia-telegram-pme.mdx");

    expect(factureArticle).not.toContain("vous recrutiez un agent IA");
    expect(telegramArticle).not.toContain("Versus recrutement d'un assistant");
    expect(telegramArticle).not.toContain("24h/24, 7j/7");
    expect(telegramArticle).not.toContain("disponibilité 24/7");
  });

  it("adds localized metadata scaffolding to workflows and CGV pages", () => {
    const pages = [
      "app/[locale]/workflows/layout.tsx",
      "app/[locale]/cgv/page.tsx",
    ];

    for (const page of pages) {
      const source = readText(page);
      expect(source).toMatch(/params:\s*Promise<\{\s*locale:\s*string\s*\}>/);
      expect(source).toMatch(/alternates:/);
      expect(source).toMatch(/openGraph:/);
      expect(source).toMatch(/description:/);
    }
  });
});
