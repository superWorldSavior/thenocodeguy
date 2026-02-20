"use client";

import { useEffect, useRef, useState } from "react";

interface DiagramProps {
  chart: string;
  caption?: string;
}

export default function Diagram({ chart, caption }: DiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#10b981",
          primaryTextColor: "#f9fafb",
          primaryBorderColor: "#059669",
          lineColor: "#6b7280",
          secondaryColor: "#1f2937",
          tertiaryColor: "#111827",
          background: "#030712",
          mainBkg: "#111827",
          nodeBorder: "#10b981",
          clusterBkg: "#1f2937",
          titleColor: "#f9fafb",
          edgeLabelBackground: "#1f2937",
          attributeBackgroundColorEven: "#1f2937",
          attributeBackgroundColorOdd: "#111827",
        },
      });
      m.default.render(id.current, chart).then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      });
    });
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <figure className="my-8">
      <div
        className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50 p-6"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
