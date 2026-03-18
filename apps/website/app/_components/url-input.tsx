"use client";

import { CornerDownLeftIcon } from "lucide-react";
import { useState } from "react";
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
  onVideoId: (id: string) => void;
}

export function UrlInput({ onVideoId }: UrlInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = parseVideoId(value);
    if (!id) {
      setError(true);
      return;
    }
    setError(false);
    onVideoId(id);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder="YouTube URL or video ID"
        aria-invalid={error}
      />
      <Button type="submit" className="shrink-0">
        View
        <CornerDownLeftIcon className="opacity-80" />
      </Button>
    </form>
  );
}
