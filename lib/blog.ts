import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime: string;
  badge: string;
  featured: boolean;
  draft: boolean;
  subtitle?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

const contentDir = path.join(process.cwd(), "content/blog");

export function getBlogPosts(locale: string): BlogPost[] {
  const dir = path.join(contentDir, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    if (data.date instanceof Date) {
      data.date = data.date.toISOString().split("T")[0];
    }
    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter: data as BlogFrontmatter,
      content,
    };
  });

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getBlogPost(
  slug: string,
  locale: string
): BlogPost | undefined {
  const filePath = path.join(contentDir, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split("T")[0];
  }

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function getAllSlugs(locale: string): string[] {
  const dir = path.join(contentDir, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllCanonicalSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  const slugs = new Set<string>();
  for (const localeDir of fs.readdirSync(contentDir)) {
    const dir = path.join(contentDir, localeDir);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".mdx")) slugs.add(file.replace(/\.mdx$/, ""));
    }
  }
  return Array.from(slugs);
}
