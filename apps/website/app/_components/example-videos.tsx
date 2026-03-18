"use client";

import { EXAMPLES } from "@/lib/examples";

interface ExampleVideosProps {
  onSelect: (id: string) => void;
}

export function ExampleVideos({ onSelect }: ExampleVideosProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Try one of these popular videos
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => onSelect(ex.id)}
            className="flex flex-col rounded-xl border border-border overflow-hidden text-left hover:bg-muted/50 transition-colors"
          >
            {/* biome-ignore lint/performance/noImgElement: external dynamic URL */}
            <img
              src={`https://img.youtube.com/vi/${ex.id}/mqdefault.jpg`}
              alt={ex.title}
              className="w-full aspect-video object-cover"
            />
            <div className="flex flex-col gap-0.5 p-2 min-w-0">
              <span className="text-xs font-medium text-foreground line-clamp-2 leading-snug">
                {ex.title}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {ex.author}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
