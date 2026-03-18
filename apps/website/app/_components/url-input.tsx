"use client";

import { ArrowLeftToLine, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function parseVideoId(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  // Plain video ID (11 chars, alphanumeric + - _)
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);

    // https://www.youtube.com/watch?v=...
    const v = url.searchParams.get("v");
    if (v) return v;

    // https://youtu.be/...
    if (url.hostname === "youtu.be") return url.pathname.slice(1);

    // https://www.youtube.com/embed/...
    const embedMatch = url.pathname.match(/^\/embed\/([\w-]{11})/);
    if (embedMatch) return embedMatch[1];
  } catch {
    // not a URL
  }

  return null;
}

const EXAMPLES = [
  { id: "fLexgOxsZu0", title: "The Lazy Song", author: "Bruno Mars" },
  {
    id: "0e3GPea1Tyg",
    title: "$456,000 Squid Game In Real Life!",
    author: "MrBeast",
  },
  { id: "rokGy0huYEA", title: "2020 — Year in Search", author: "Google" },
] as const;

interface UrlInputProps {
  initialValue: string | null;
  onVideoId: (id: string | null) => unknown;
}

export function UrlInput({ initialValue, onVideoId }: UrlInputProps) {
  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onVideoId(parseVideoId(value));
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onVideoId]);

  const hasInput = value.trim().length > 0;
  const invalid = hasInput && !parseVideoId(value);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="YouTube URL or video ID"
          aria-invalid={invalid}
        />
        <Button
          onClick={async () => {
            const text = await navigator.clipboard.readText();
            setValue(text);
          }}
        >
          <ArrowLeftToLine />
          Paste
        </Button>
      </div>
      {!value && (
        <div className="flex flex-col gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setValue(ex.id)}
              className="flex items-center gap-3 rounded-xl border border-border p-2 text-left hover:bg-muted/50 transition-colors"
            >
              {/* biome-ignore lint/performance/noImgElement: external dynamic URL */}
              <img
                src={`https://img.youtube.com/vi/${ex.id}/mqdefault.jpg`}
                alt={ex.title}
                className="h-14 aspect-video rounded-md object-cover shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  {ex.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {ex.author}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
