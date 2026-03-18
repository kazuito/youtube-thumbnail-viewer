"use client";

import { ArrowLeftToLine, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

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
  const [_, setUrlVid] = useQueryState("vid", {
    history: "push",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onVideoId(parseVideoId(value));
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onVideoId]);

  const hasInput = value.trim().length > 0;
  const invalid = hasInput && !parseVideoId(value);

  const handleClear = () => {
    setValue("");
    setUrlVid(null);
  };

  return (
    <div className="flex gap-2">
      <InputGroup>
        <InputGroupInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="YouTube URL or video ID"
          aria-invalid={invalid}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={handleClear}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
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
