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

  // Compute the clean path (without locale prefix) to build locale-switch URLs
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

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/workflows", label: t("workflows") },
    { href: "/lab", label: t("lab") },
    { href: "/a-propos", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  // For non-FR locales, prefix hrefs
  const prefixedLinks = links.map((l) => ({
    ...l,
    href: currentLocale === "fr" ? l.href : `/${currentLocale}${l.href === "/" ? "" : l.href}`,
  }));

  const auditHref = currentLocale === "fr" ? "/audit" : `/${currentLocale}/audit`;
  const contactHref = currentLocale === "fr" ? "/contact" : `/${currentLocale}/contact`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={currentLocale === "fr" ? "/" : `/${currentLocale}`}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Zap className="h-6 w-6 text-emerald-400" />
          <span className="text-white">
            TheNoCode<span className="text-emerald-400">Guy</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {prefixedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 transition-colors hover:text-emerald-400"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={auditHref}
            className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-300"
          >
            {t("audit")}
          </Link>
          <Link
            href={contactHref}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("startProject")}
          </Link>

          {/* Locale switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1.5 py-1">
            {LOCALES.map((loc, idx) => (
              <span key={loc.code} className="flex items-center">
                <Link
                  href={buildLocaleUrl(loc.code)}
                  className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
                    currentLocale === loc.code
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {loc.label}
                </Link>
                {idx < LOCALES.length - 1 && (
                  <span className="text-gray-700 text-xs">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-gray-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-gray-950 px-4 pb-4 md:hidden">
          {prefixedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 transition-colors hover:text-emerald-400"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={auditHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-center text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            {t("audit")}
          </Link>
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-emerald-500 px-4 py-2 text-center text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            {t("startProject")}
          </Link>

          {/* Mobile locale switcher */}
          <div className="mt-4 flex items-center gap-2 pt-2 border-t border-white/10">
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={buildLocaleUrl(loc.code)}
                onClick={() => setOpen(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  currentLocale === loc.code
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 text-gray-500 hover:text-gray-300"
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
