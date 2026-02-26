"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Menu, X, Globe, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";
import CalPopupButton from "@/components/molecules/CalPopupButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALES = [
  { code: "fr", label: "FR", name: "langFr" },
  { code: "en", label: "EN", name: "langEn" },
  { code: "zh-TW", label: "繁中", name: "langZhTw" },
  { code: "zh-CN", label: "简中", name: "langZhCn" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
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
          <NextLink
            href="#domaines"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t("ourAgents")}
          </NextLink>
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
          <NextLink
            href="#domaines"
            onClick={() => setOpen(false)}
            className="block py-3 text-foreground transition-colors hover:text-primary"
          >
            {t("ourAgents")}
          </NextLink>
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
