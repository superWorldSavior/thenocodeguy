"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];


export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Zap className="h-6 w-6 text-emerald-400" />
          <span className="text-white">
            TheNoCode<span className="text-emerald-400">Guy</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 transition-colors hover:text-emerald-400"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/audit"
            className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-300"
          >
            Audit gratuit →
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer un projet
          </Link>
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
          {links.map((l) => (
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
            href="/audit"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-center text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            Audit gratuit →
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-emerald-500 px-4 py-2 text-center text-sm font-medium text-gray-950 transition-colors hover:bg-emerald-400"
          >
            Démarrer un projet
          </Link>
        </div>
      )}
    </nav>
  );
}
