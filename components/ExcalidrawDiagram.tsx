"use client";

import "@excalidraw/excalidraw/index.css";
import { useEffect, useState } from "react";

interface ExcalidrawDiagramProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: readonly any[];
  caption?: string;
  height?: number;
  background?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>;

export default function ExcalidrawDiagram({
  elements,
  caption,
  height = 400,
  background = "#1a1a2e",
}: ExcalidrawDiagramProps) {
  const [ExcalidrawComp, setExcalidrawComp] = useState<AnyComponent | null>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((mod) => {
      setExcalidrawComp(() => mod.Excalidraw as AnyComponent);
    });
  }, []);

  return (
    <figure className="my-8">
      <div
        className="overflow-hidden rounded-xl border border-gray-800"
        style={{ height }}
      >
        {ExcalidrawComp ? (
          <ExcalidrawComp
            initialData={{
              elements,
              appState: {
                viewBackgroundColor: background,
                theme: "dark",
              },
            }}
            viewModeEnabled={true}
            zenModeEnabled={true}
            gridModeEnabled={false}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-gray-600 text-sm"
            style={{ background }}
          >
            Chargement du diagramme…
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
