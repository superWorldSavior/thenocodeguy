import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Zap className="h-5 w-5 text-emerald-400" />
            <span className="text-white">
              TheNoCode<span className="text-emerald-400">Guy</span>
            </span>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-emerald-400">
              Accueil
            </Link>
            <Link href="/services" className="transition-colors hover:text-emerald-400">
              Services
            </Link>
            <Link href="/a-propos" className="transition-colors hover:text-emerald-400">
              À propos
            </Link>
            <Link href="/contact" className="transition-colors hover:text-emerald-400">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TheNoCodeGuy. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
