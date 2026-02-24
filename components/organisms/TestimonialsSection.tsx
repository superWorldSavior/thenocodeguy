import { Star, Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Testimonial {
  nameKey: string;
  roleKey: string;
  companyKey: string;
  quoteKey: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  { nameKey: "t1Name", roleKey: "t1Role", companyKey: "t1Company", quoteKey: "t1Quote", initials: "AL" },
  { nameKey: "t2Name", roleKey: "t2Role", companyKey: "t2Company", quoteKey: "t2Quote", initials: "KM" },
  { nameKey: "t3Name", roleKey: "t3Role", companyKey: "t3Company", quoteKey: "t3Quote", initials: "JC" },
];

export default async function TestimonialsSection() {
  const t = await getTranslations("testimonials");

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.nameKey}
              className="card-hover relative rounded-2xl border border-border bg-card p-8"
            >
              {/* Decorative quote */}
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />

              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote text */}
              <p className="mb-8 text-base leading-relaxed text-muted-foreground italic">
                &ldquo;{t(item.quoteKey as "t1Quote")}&rdquo;
              </p>

              {/* Separator */}
              <div className="mb-5 h-px w-12 bg-border" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-bold text-primary ring-2 ring-primary/10">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t(item.nameKey as "t1Name")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t(item.roleKey as "t1Role")}
                  </div>
                  <div className="text-xs font-medium text-primary">
                    {t(item.companyKey as "t1Company")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
