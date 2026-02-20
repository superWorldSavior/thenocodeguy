"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    currentLocale === "fr" ? href : `/${currentLocale}${href === "/" ? "" : href}`;

  const links = [
    { href: "/", label: t("home") },
    { href: "/agents", label: t("agents") },
    { href: "/pricing", label: t("pricing") },
    { href: "/contact", label: t("contact") },
  ];

  const prefixedLinks = links.map((l) => ({ ...l, href: prefixHref(l.href) }));
  const contactHref = prefixHref("/contact");

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          ref={toggleRef}
          className="text-gray-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[65px] z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed left-0 right-0 top-[65px] z-50 border-b border-white/10 bg-gray-950 px-4 pb-6 pt-2 shadow-2xl transition-all duration-300 ease-out md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        {prefixedLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className="block py-3 text-lg text-gray-300 transition-colors hover:text-emerald-400"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href={contactHref}
          onClick={closeMenu}
          className="mt-3 block rounded-lg bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
        >
          {t("startProject")}
        </Link>

        {/* Mobile locale switcher */}
        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
          {LOCALES.map((loc) => (
            <Link
              key={loc.code}
              href={buildLocaleUrl(loc.code)}
              onClick={closeMenu}
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
    </nav>
  );
}
