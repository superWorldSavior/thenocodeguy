"use client";

import { useState, useRef } from "react";
import NextLink from "next/link";
import { Menu, X, Globe, Check, ChevronDown, HardHat, ShoppingCart, FileStack } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";
import CalPopupButton from "@/components/molecules/CalPopupButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DOMAINES = [
  { id: "btp", href: "/domaines/btp" as const, icon: HardHat, titleKey: "btpTitle" as const, featured: true },
  { id: "commerce", href: "/domaines/commerce" as const, icon: ShoppingCart, titleKey: "commerceTitle" as const, featured: false },
  { id: "admin", href: "/domaines/admin" as const, icon: FileStack, titleKey: "adminTitle" as const, featured: false },
  { id: "web", href: "/domaines/web" as const, icon: Globe, titleKey: "webTitle" as const, featured: false },
] as const;

const LOCALES = [
  { code: "fr", label: "FR", name: "langFr" },
  { code: "en", label: "EN", name: "langEn" },
  { code: "zh-TW", label: "繁中", name: "langZhTw" },
  { code: "zh-CN", label: "简中", name: "langZhCn" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const tDomaines = useTranslations("domaines");
  const [open, setOpen] = useState(false);
  const [domainesOpen, setDomainesOpen] = useState(false);
  const [domainesExpanded, setDomainesExpanded] = useState(false);
  const domainesTimeout = useRef<NodeJS.Timeout>(undefined);
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <span className="text-foreground">
            TheNoCode<span className="text-primary">Guy</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <DropdownMenu open={domainesOpen} onOpenChange={setDomainesOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                onPointerEnter={() => {
                  clearTimeout(domainesTimeout.current);
                  setDomainesOpen(true);
                }}
                onPointerLeave={() => {
                  domainesTimeout.current = setTimeout(() => setDomainesOpen(false), 150);
                }}
              >
                {t("ourAgents")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64"
              onPointerEnter={() => clearTimeout(domainesTimeout.current)}
              onPointerLeave={() => {
                domainesTimeout.current = setTimeout(() => setDomainesOpen(false), 150);
              }}
            >
              <DropdownMenuLabel>{t("ourAgents")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DOMAINES.map((d) => {
                const Icon = d.icon;
                return (
                  <DropdownMenuItem key={d.id} asChild>
                    <Link href={d.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{tDomaines(d.titleKey)}</span>
                      {d.featured && (
                        <span className="ml-auto rounded-full bg-brand-yellow px-1.5 py-0.5 text-[9px] font-bold text-primary">
                          {tDomaines("featured")}
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NextLink href="/#domaines" className="text-xs text-muted-foreground">
                  {t("allDomaines")}
                </NextLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CalPopupButton
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary"
          >
            {t("startProject")}
          </CalPopupButton>

          {/* Locale switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-xs font-medium">{LOCALES.find(l => l.code === locale)?.label}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((loc) => (
                <DropdownMenuItem key={loc.code} asChild>
                  <Link
                    href={pathname}
                    locale={loc.code}
                    className="flex w-full items-center justify-between gap-6"
                  >
                    <span>{t(loc.name)}</span>
                    {locale === loc.code && <Check className="h-4 w-4 text-primary" />}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <div>
            <button
              onClick={() => setDomainesExpanded(!domainesExpanded)}
              className="flex w-full items-center justify-between py-3 text-foreground transition-colors hover:text-primary"
            >
              {t("ourAgents")}
              <ChevronDown className={`h-4 w-4 transition-transform ${domainesExpanded ? "rotate-180" : ""}`} />
            </button>
            {domainesExpanded && (
              <div className="ml-4 border-l border-border pl-4 pb-2">
                {DOMAINES.map((d) => {
                  const Icon = d.icon;
                  return (
                    <Link
                      key={d.id}
                      href={d.href}
                      onClick={() => { setOpen(false); setDomainesExpanded(false); }}
                      className="flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {tDomaines(d.titleKey)}
                    </Link>
                  );
                })}
                <NextLink
                  href="/#domaines"
                  onClick={() => { setOpen(false); setDomainesExpanded(false); }}
                  className="block py-2 text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("allDomaines")}
                </NextLink>
              </div>
            )}
          </div>
          <CalPopupButton
            className="mt-2 block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("startProject")}
          </CalPopupButton>

          {/* Mobile locale switcher */}
          <div className="mt-4 border-t border-border pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{t("switchLanguage")}</span>
                  <span className="ml-auto text-xs font-medium text-primary">{LOCALES.find(l => l.code === locale)?.label}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {LOCALES.map((loc) => (
                  <DropdownMenuItem key={loc.code} asChild>
                    <Link
                      href={pathname}
                      locale={loc.code}
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-between gap-6"
                    >
                      <span>{t(loc.name)}</span>
                      {locale === loc.code && <Check className="h-4 w-4 text-primary" />}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </nav>
  );
}
