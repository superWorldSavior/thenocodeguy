import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { key: "t1", initials: "MD" },
  { key: "t2", initials: "TC" },
  { key: "t3", initials: "SW" },
] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map(({ key, initials }) => (
            <Card key={key} className="border-border">
              <CardContent className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: "hsl(var(--primary) / 0.15)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t(`${key}Name` as "t1Name")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t(`${key}Role` as "t1Role")}
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4"
                      style={{
                        fill: "hsl(var(--primary))",
                        color: "hsl(var(--primary))",
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t(`${key}Quote` as "t1Quote")}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
