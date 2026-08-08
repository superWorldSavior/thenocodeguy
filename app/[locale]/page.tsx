import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ContactForm from "@/components/ContactForm";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkovyjba";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Legal entity facts — locale-invariant (RCS Clermont-Ferrand 952 473 288)
const entity = {
  name: "The No Code Guy",
  email: "hello@casys.ai",
  ledger: [
    ["EURL · 3 000 €", "form"],
    ["17 rue du Pré la Reine, 63100 Clermont-Ferrand", "office"],
    ["Clermont-Ferrand 952 473 288", "rcs"],
    ["952 473 288 00019", "siret"],
    ["FR84 952473288", "vat"],
  ] as const,
};

const links = [
  { name: "eInvoice Platform", host: "einvoice-platform.fr", url: "https://einvoice-platform.fr" },
  { name: "Casys", host: "casys.ai", url: "https://casys.ai" },
  { name: "MCP ERPNext", host: "erp-platform.fr", url: "https://erp-platform.fr" },
  { name: "GitHub Casys-AI", host: "github.com/Casys-AI", url: "https://github.com/Casys-AI" },
  { name: "Permis Check", host: "permis-check.fr", url: "https://permis-check.fr" },
  { name: "LinkedIn", host: "linkedin.com/company/casys-ai", url: "https://www.linkedin.com/company/casys-ai" },
];

const people = [
  {
    photo: "/images/founder-erwan.jpg",
    name: "Erwan Lee Pesle",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/erwan-lee-pesle-32085463" },
      { label: "GitHub", url: "https://github.com/Casys-AI" },
    ],
  },
  {
    photo: "/images/simon-ducournau.jpg",
    name: "Simon Ducournau",
    links: [
      { label: "Imago Data", url: "https://github.com/imagodata" },
      { label: "Gispulse", url: "https://imagodata.github.io/gispulse/" },
    ],
  },
];

type Locale = "fr" | "en" | "zh-TW" | "zh-CN";

const copy: Record<
  Locale,
  {
    place: string;
    eyebrow: string;
    body: string;
    cta: string;
    kStudio: string;
    kProd: string;
    kContact: string;
    kLegal: string;
    cIntro: string;
    cEmail: string;
    cMessage: string;
    cSend: string;
    cSending: string;
    cOk: string;
    cErr: string;
    roleErwan: string;
    bioErwan: string;
    roleSimon: string;
    bioSimon: string;
    lForm: string;
    lOffice: string;
    lRcs: string;
    lSiret: string;
    lVat: string;
  }
> = {
  fr: {
    place: "Société · Clermont-Ferrand · Est. 2023",
    eyebrow: "Société d'ingénierie logicielle · Clermont-Ferrand",
    body: "Atelier indépendant. Nous concevons des logiciels sur mesure pour les bureaux d'études — modélisation des connaissances métier et réponse rapide aux appels d'offres.",
    cta: "Voir le travail sur casys.ai",
    kStudio: "L'atelier",
    kProd: "En production",
    kContact: "Contact",
    kLegal: "Mentions légales",
    cIntro: "Un projet, une consultation ? Écrivez-nous.",
    cEmail: "Votre email",
    cMessage: "Votre message",
    cSend: "Envoyer",
    cSending: "Envoi…",
    cOk: "Message envoyé. On revient vers vous vite.",
    cErr: "Erreur — réessayez ou écrivez à hello@casys.ai.",
    roleErwan: "The No Code Guy · Gérant",
    bioErwan: "Modélisation des connaissances, agents et systèmes en production.",
    roleSimon: "Imago Data · Partenaire géomatique",
    bioSimon: "Données spatiales, réseaux, données publiques. Auteur de Gispulse.",
    lForm: "Forme · Capital",
    lOffice: "Siège",
    lRcs: "RCS",
    lSiret: "SIRET",
    lVat: "TVA",
  },
  en: {
    place: "Company · Clermont-Ferrand, France · Est. 2023",
    eyebrow: "Software engineering company · Clermont-Ferrand, France",
    body: "Independent studio. We build custom software for engineering firms — modelling domain knowledge and answering tenders faster.",
    cta: "See the work on casys.ai",
    kStudio: "The studio",
    kProd: "In production",
    kContact: "Contact",
    kLegal: "Legal notice",
    cIntro: "A project, a consultation? Get in touch.",
    cEmail: "Your email",
    cMessage: "Your message",
    cSend: "Send",
    cSending: "Sending…",
    cOk: "Message sent. We'll get back to you soon.",
    cErr: "Something went wrong — retry or email hello@casys.ai.",
    roleErwan: "The No Code Guy · Director",
    bioErwan: "Knowledge modelling, agents and systems in production.",
    roleSimon: "Imago Data · Geospatial partner",
    bioSimon: "Spatial data, networks, public datasets. Author of Gispulse.",
    lForm: "Form · Capital",
    lOffice: "Office",
    lRcs: "Trade register",
    lSiret: "SIRET",
    lVat: "VAT",
  },
  "zh-TW": {
    place: "公司 · 法國克萊蒙費朗 · Est. 2023",
    eyebrow: "軟體工程公司 · 法國克萊蒙費朗",
    body: "獨立工作室。我們為工程顧問公司打造客製軟體——領域知識建模與更快的投標回應。",
    cta: "在 casys.ai 查看作品",
    kStudio: "工作室",
    kProd: "生產環境",
    kContact: "聯絡",
    kLegal: "法律聲明",
    cIntro: "有專案或想諮詢？與我們聯繫。",
    cEmail: "您的電子郵件",
    cMessage: "您的訊息",
    cSend: "送出",
    cSending: "傳送中…",
    cOk: "訊息已送出，我們會盡快回覆。",
    cErr: "發生錯誤——請重試或寄信至 hello@casys.ai。",
    roleErwan: "The No Code Guy · 負責人",
    bioErwan: "知識建模、智慧代理與生產系統。",
    roleSimon: "Imago Data · 地理空間夥伴",
    bioSimon: "空間資料、網路、公共資料集。Gispulse 作者。",
    lForm: "形式 · 資本",
    lOffice: "登記地址",
    lRcs: "商業登記",
    lSiret: "SIRET",
    lVat: "增值稅號",
  },
  "zh-CN": {
    place: "公司 · 法国克莱蒙费朗 · Est. 2023",
    eyebrow: "软件工程公司 · 法国克莱蒙费朗",
    body: "独立工作室。我们为工程设计院打造定制软件——领域知识建模与更快的投标响应。",
    cta: "在 casys.ai 查看作品",
    kStudio: "工作室",
    kProd: "生产环境",
    kContact: "联系",
    kLegal: "法律声明",
    cIntro: "有项目或想咨询？与我们联系。",
    cEmail: "您的电子邮箱",
    cMessage: "您的留言",
    cSend: "发送",
    cSending: "发送中…",
    cOk: "消息已发送，我们会尽快回复。",
    cErr: "出错了——请重试或发邮件至 hello@casys.ai。",
    roleErwan: "The No Code Guy · 负责人",
    bioErwan: "知识建模、智能体与生产系统。",
    roleSimon: "Imago Data · 地理空间伙伴",
    bioSimon: "空间数据、网络、公共数据集。Gispulse 作者。",
    lForm: "形式 · 资本",
    lOffice: "登记地址",
    lRcs: "商业登记",
    lSiret: "SIRET",
    lVat: "增值税号",
  },
};

const LOCALES: { code: Locale; short: string }[] = [
  { code: "fr", short: "FR" },
  { code: "en", short: "EN" },
  { code: "zh-TW", short: "繁" },
  { code: "zh-CN", short: "简" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[locale as Locale] ?? copy.fr;
  return {
    title: "The No Code Guy",
    description: `${t.eyebrow}. RCS Clermont-Ferrand 952 473 288.`,
    alternates: { canonical: `/${locale}` },
    openGraph: {
      title: "The No Code Guy",
      description: t.eyebrow,
      url: `https://thenocodeguy.com/${locale}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[locale as Locale] ?? copy.fr;
  const roles = [t.roleErwan, t.roleSimon];
  const bios = [t.bioErwan, t.bioSimon];
  const legalLabels: Record<string, string> = {
    form: t.lForm,
    office: t.lOffice,
    rcs: t.lRcs,
    siret: t.lSiret,
    vat: t.lVat,
  };

  return (
    <div className={`tncg ${grotesk.variable} ${mono.variable}`}>
      <div className="tncg-wrap">
        <header className="tncg-rule">
          <span>{t.place}</span>
          <nav className="tncg-lang" aria-label="Language">
            {LOCALES.map((l) => (
              <a key={l.code} href={`/${l.code}`} className={l.code === locale ? "on" : ""}>
                {l.short}
              </a>
            ))}
          </nav>
        </header>

        <section className="tncg-hero">
          <p className="tncg-eyebrow">{t.eyebrow}</p>
          <h1 className="tncg-h1">{entity.name}</h1>
          <p className="tncg-body">{t.body}</p>
          <div className="tncg-actions">
            <a className="tncg-cta" href="https://casys.ai">
              {t.cta} <span className="tncg-arr" aria-hidden="true">→</span>
            </a>
            <a className="tncg-ghost" href={`mailto:${entity.email}`}>
              {entity.email}
            </a>
          </div>
        </section>

        <section className="tncg-sec">
          <p className="tncg-k">{t.kStudio}</p>
          <div className="tncg-people">
            {people.map((p, i) => (
              <div className="tncg-person" key={p.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.name} width={64} height={64} />
                <div>
                  <div className="tncg-p-name">{p.name}</div>
                  <div className="tncg-p-role">{roles[i]}</div>
                  <p className="tncg-p-bio">{bios[i]}</p>
                  <div className="tncg-p-links">
                    {p.links.map((lk) => (
                      <a key={lk.label} href={lk.url} target="_blank" rel="noopener">
                        {lk.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tncg-sec">
          <p className="tncg-k">{t.kProd}</p>
          <div className="tncg-links">
            {links.map((lk) => (
              <a className="tncg-lrow" href={lk.url} target="_blank" rel="noopener" key={lk.name}>
                <span className="tncg-l-name">{lk.name}</span>
                <span className="tncg-l-host">{lk.host} ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="tncg-sec">
          <p className="tncg-k">{t.kContact}</p>
          <ContactForm
            endpoint={FORMSPREE_ENDPOINT}
            labels={{
              intro: t.cIntro,
              email: t.cEmail,
              message: t.cMessage,
              send: t.cSend,
              sending: t.cSending,
              ok: t.cOk,
              err: t.cErr,
            }}
          />
        </section>

        <section className="tncg-sec">
          <p className="tncg-k">{t.kLegal}</p>
          <dl className="tncg-dl">
            {entity.ledger.map(([value, key]) => (
              <div className="tncg-drow" key={key}>
                <dt>{legalLabels[key]}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="tncg-foot">
          <span>The No Code Guy — EURL</span>
          <a href="https://casys.ai">casys.ai ↗</a>
        </footer>
      </div>

      <style>{`
        .tncg{
          --paper:#F7F8FB; --navy:#05004b; --yellow:#FFDE59;
          --muted:#5B6472; --hair:rgba(5,0,75,.13); --hair2:rgba(5,0,75,.08); --card:#fff;
          background:var(--paper); color:var(--navy); min-height:100vh;
        }
        .dark .tncg{
          --paper:#080816; --navy:#EEF0F6; --yellow:#FFDE59;
          --muted:#8B93A7; --hair:rgba(255,222,89,.16); --hair2:rgba(255,255,255,.08); --card:#0F0F26;
        }
        .tncg-wrap{max-width:820px;margin:0 auto;padding:0 40px}
        .tncg-rule{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid var(--hair);font-family:var(--font-mono),ui-monospace,monospace;font-size:.66rem;text-transform:uppercase;letter-spacing:.16em;color:var(--muted)}
        .tncg-lang{display:flex;gap:14px}
        .tncg-lang a{text-decoration:none;color:var(--muted);transition:color .2s}
        .tncg-lang a:hover{color:var(--navy)}
        .tncg-lang a.on{color:var(--navy);font-weight:500;border-bottom:2px solid var(--yellow)}
        .tncg-hero{padding:76px 0 60px}
        .tncg-eyebrow{font-family:var(--font-mono),ui-monospace,monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.18em;color:var(--muted);margin-bottom:22px}
        .tncg-h1{font-family:var(--font-grotesk),sans-serif;font-weight:600;font-size:clamp(2.8rem,6.5vw,4.4rem);line-height:1;letter-spacing:-.03em;color:var(--navy);display:inline;background:linear-gradient(transparent 62%,var(--yellow) 62%,var(--yellow) 92%,transparent 92%);padding:0 .04em}
        .tncg-body{max-width:36rem;color:var(--muted);font-size:1.02rem;line-height:1.65;margin:30px 0 34px}
        .tncg-actions{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
        .tncg-cta{display:inline-flex;align-items:center;gap:9px;background:var(--navy);color:var(--paper);border-radius:999px;padding:13px 22px;font-size:.92rem;font-weight:600;text-decoration:none;transition:transform .18s}
        .tncg-cta:hover{transform:translateY(-1px)}
        .tncg-arr{color:var(--yellow)}
        .tncg-ghost{font-size:.92rem;color:var(--muted);text-decoration:underline;text-underline-offset:3px;transition:color .2s}
        .tncg-ghost:hover{color:var(--navy)}
        .tncg-sec{padding:44px 0;border-top:1px solid var(--hair)}
        .tncg-k{font-family:var(--font-mono),ui-monospace,monospace;font-size:.66rem;text-transform:uppercase;letter-spacing:.2em;color:var(--muted);margin-bottom:26px;display:flex;align-items:center;gap:9px}
        .tncg-k::before{content:"";width:7px;height:7px;background:var(--yellow);border-radius:50%}
        .tncg-people{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .tncg-person{display:flex;gap:16px;background:var(--card);border:1px solid var(--hair2);border-radius:16px;padding:20px}
        .tncg-person img{width:64px;height:64px;border-radius:12px;object-fit:cover;flex-shrink:0}
        .tncg-p-name{font-family:var(--font-grotesk),sans-serif;font-weight:600;font-size:1.08rem;letter-spacing:-.01em;color:var(--navy)}
        .tncg-p-role{font-family:var(--font-mono),ui-monospace,monospace;font-size:.63rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:3px 0 9px}
        .tncg-p-bio{font-size:.86rem;color:var(--muted);line-height:1.5;margin-bottom:10px}
        .tncg-p-links{display:flex;gap:12px;font-size:.78rem}
        .tncg-p-links a{color:var(--navy);text-decoration:none;border-bottom:2px solid var(--yellow);padding-bottom:1px}
        .tncg-links{display:grid;grid-template-columns:1fr 1fr;gap:2px 40px}
        .tncg-lrow{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:12px 0;border-bottom:1px solid var(--hair2);text-decoration:none}
        .tncg-l-name{font-weight:500;font-size:.95rem;color:var(--navy)}
        .tncg-l-host{font-family:var(--font-mono),ui-monospace,monospace;font-size:.7rem;color:var(--muted)}
        .tncg-lrow:hover .tncg-l-host{color:var(--navy)}
        .tncg-cform{max-width:34rem;display:flex;flex-direction:column;gap:12px}
        .tncg-cform-intro{color:var(--muted);font-size:.95rem;margin:0 0 4px}
        .tncg-input{width:100%;background:var(--card);border:1px solid var(--hair);border-radius:12px;padding:12px 14px;font:inherit;font-size:.92rem;color:var(--navy);transition:border-color .2s}
        .tncg-input::placeholder{color:var(--muted)}
        .tncg-input:focus{outline:none;border-color:var(--navy)}
        .tncg-textarea{resize:vertical;min-height:96px;line-height:1.5}
        .tncg-cform-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:4px}
        .tncg-cform .tncg-cta{border:none;cursor:pointer;font:inherit;font-weight:600}
        .tncg-cform .tncg-cta:disabled{opacity:.6;cursor:default}
        .tncg-cform-err{font-size:.82rem;color:#c0392b}
        .dark .tncg-cform-err{color:#ff8a7a}
        .tncg-cform-ok{max-width:34rem;font-family:var(--font-grotesk),sans-serif;font-weight:500;font-size:1.05rem;color:var(--navy);border-left:3px solid var(--yellow);padding:6px 0 6px 16px}
        .tncg-dl{border-top:1px solid var(--hair);max-width:34rem}
        .tncg-drow{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:12px 0;border-bottom:1px solid var(--hair2)}
        .tncg-drow dt{font-family:var(--font-mono),ui-monospace,monospace;font-size:.63rem;text-transform:uppercase;letter-spacing:.11em;color:var(--muted);white-space:nowrap}
        .tncg-drow dd{margin:0;font-size:.88rem;text-align:right;color:var(--navy)}
        .tncg-foot{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:22px 0;border-top:1px solid var(--hair);font-family:var(--font-mono),ui-monospace,monospace;font-size:.63rem;text-transform:uppercase;letter-spacing:.14em;color:var(--muted)}
        .tncg-foot a{text-decoration:none;transition:color .2s}
        .tncg-foot a:hover{color:var(--yellow)}
        @media (max-width:640px){
          .tncg-wrap{padding:0 24px}
          .tncg-people{grid-template-columns:1fr}
          .tncg-links{grid-template-columns:1fr}
          .tncg-drow{flex-direction:column;align-items:flex-start;gap:2px}
          .tncg-drow dd{text-align:left}
        }
      `}</style>
    </div>
  );
}
