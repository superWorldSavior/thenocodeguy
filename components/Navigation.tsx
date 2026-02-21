"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const LOCALES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "zh-TW", label: "繁中" },
  { code: "zh-CN", label: "简中" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) ?? "fr";

  const getCleanPath = () => {
    if (currentLocale === "fr") return pathname || "/";
    const prefix = `/${currentLocale}`;
    if (pathname.startsWith(prefix)) {
      return pathname.slice(prefix.length) || "/";
    }
    return pathname || "/";
  };

  const buildLocaleUrl = (locale: string) => {
    const clean = getCleanPath();
    if (locale === "fr") return clean || "/";
    return `/${locale}${clean === "/" ? "" : clean}`;
  };

  const prefixHref = (href: string) =>
    href.startsWith("#")
      ? href
      : currentLocale === "fr"
        ? href
        : `/${currentLocale}${href === "/" ? "" : href}`;

  const links = [
    { href: "/", label: t("home") },
    { href: "#profiles", label: t("ourAgents") },
    { href: "/contact", label: t("contact") },
  ];

  const prefixedLinks = links.map((l) => ({ ...l, href: prefixHref(l.href) }));

  const contactHref = prefixHref("/contact");

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={currentLocale === "fr" ? "/" : `/${currentLocale}`}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-foreground">
            TheNoCode<span className="text-primary">Guy</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {prefixedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("startProject")}
          </Link>

          {/* Locale switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted px-1.5 py-1">
            {LOCALES.map((loc, idx) => (
              <span key={loc.code} className="flex items-center">
                <Link
                  href={buildLocaleUrl(loc.code)}
                  className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
                    currentLocale === loc.code
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {loc.label}
                </Link>
                {idx < LOCALES.length - 1 && (
                  <span className="text-muted-foreground/40 text-xs">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {prefixedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("startProject")}
          </Link>

          {/* Mobile locale switcher */}
          <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border">
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={buildLocaleUrl(loc.code)}
                onClick={() => setOpen(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  currentLocale === loc.code
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
