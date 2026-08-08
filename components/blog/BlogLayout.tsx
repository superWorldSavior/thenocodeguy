import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import CalPopupButton from "@/components/molecules/CalPopupButton";
import type { BlogFrontmatter } from "@/lib/blog";

interface BlogLayoutProps {
  frontmatter: BlogFrontmatter;
  children: React.ReactNode;
  bottomNav: {
    backText: string;
    nextText: string;
    useCal?: boolean;
  };
}

export default function BlogLayout({
  frontmatter,
  children,
  bottomNav,
}: BlogLayoutProps) {
  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au blog
        </Link>

        {/* Hero */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-widest">
              {frontmatter.badge}
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {frontmatter.title}
          </h1>
          {frontmatter.subtitle && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {frontmatter.subtitle}
            </p>
          )}
          <div
            className={`${frontmatter.subtitle ? "mt-6" : "mt-0"} flex flex-wrap items-center gap-4 text-sm text-muted-foreground`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                TN
              </div>
              <span className="text-card-foreground">{frontmatter.author}</span>
            </div>
            <span aria-hidden="true">·</span>
            <span>{frontmatter.date}</span>
            <span aria-hidden="true">·</span>
            <span>{frontmatter.readTime}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-12 h-px bg-border" />

        {/* Article body */}
        <article className="space-y-14 text-card-foreground">
          {children}
        </article>

        {/* Signature */}
        <div className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            TN
          </div>
          <div>
            <p className="font-semibold text-foreground">TheNoCodeGuy</p>
            <p className="text-sm text-muted-foreground">
              Agence d&apos;intérim IA
            </p>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-12 sm:flex-row sm:justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> {bottomNav.backText}
          </Link>
          {bottomNav.useCal ? (
            <CalPopupButton className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary">
              {bottomNav.nextText} <ArrowRight className="h-4 w-4" />
            </CalPopupButton>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-yellow hover:text-primary"
            >
              {bottomNav.nextText} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
