"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { trackUmamiEvent } from "@/lib/umami";

const calLinks: Record<string, string> = {
  fr: "thenocodeguy/decouverte",
  en: "thenocodeguy/discovery-call",
  "zh-TW": "thenocodeguy/discovery-call-zh-tw",
  "zh-CN": "thenocodeguy/discovery-call-zh-cn",
};

interface CalPopupButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalPopupButton({
  children,
  className,
}: CalPopupButtonProps) {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const calLink = calLinks[locale] || calLinks.fr;
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const [tz, setTz] = useState<string>("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "popup" });
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [theme]);

  return (
    <button
      type="button"
      data-cal-namespace="popup"
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({
        layout: "month_view",
        theme,
        ...(tz && { timezone: tz }),
      })}
      className={className}
      onClick={() => {
        trackUmamiEvent("booking_opened", {
          calLink,
          locale,
          theme,
        });
      }}
    >
      {children}
    </button>
  );
}
