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
  );
}
