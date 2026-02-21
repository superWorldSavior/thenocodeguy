import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Testimonial {
  nameKey: string;
  roleKey: string;
  companyKey: string;
  quoteKey: string;
  initials: string;
  avatarClass: string;
}

const testimonials: Testimonial[] = [
  { nameKey: "t1Name", roleKey: "t1Role", companyKey: "t1Company", quoteKey: "t1Quote", initials: "AL", avatarClass: "bg-primary/10 text-primary" },
  { nameKey: "t2Name", roleKey: "t2Role", companyKey: "t2Company", quoteKey: "t2Quote", initials: "KM", avatarClass: "bg-primary/20 text-primary" },
  { nameKey: "t3Name", roleKey: "t3Role", companyKey: "t3Company", quoteKey: "t3Quote", initials: "JC", avatarClass: "bg-primary/30 text-primary" },
];

export default async function TestimonialsSection() {
  const t = await getTranslations("testimonials");

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.nameKey} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="mb-6 text-sm text-muted-foreground italic">
                &ldquo;{t(item.quoteKey as "t1Quote")}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item.avatarClass}`}>
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t(item.nameKey as "t1Name")}</div>
                  <div className="text-xs text-muted-foreground">{t(item.roleKey as "t1Role")}</div>
                  <div className="text-xs text-muted-foreground/80">{t(item.companyKey as "t1Company")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
