import Link from "next/link";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-foreground">
                TheNoCode<span className="text-primary">Guy</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/agents" className="transition-colors hover:text-primary">
              {t("agents")}
            </Link>
            <Link href="/lab" className="transition-colors hover:text-primary">
              {t("lab")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary">
              {t("contact")}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
          <div className="flex gap-4">
            <Link href="/legal" className="transition-colors hover:text-primary">
              {t("legal")}
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link href="/privacy" className="transition-colors hover:text-primary">
              {t("privacy")}
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} TheNoCodeGuy. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
