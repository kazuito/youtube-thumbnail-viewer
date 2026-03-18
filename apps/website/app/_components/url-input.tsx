"use client";

import {
  ArrowLeftIcon,
  ClipboardIcon,
  CopyIcon,
  CornerDownLeftIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { parseVideoId } from "@/lib/youtube";

const copyOptions = [
  {
    label: "Video ID",
    getValue: (videoId: string) => videoId,
  },
  {
    label: "YouTube URL",
    getValue: (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`,
  },
  {
    label: "Embed URL",
    getValue: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
  },
];

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function UrlInput({ value, onChange }: UrlInputProps) {
  const hasInput = value.trim().length > 0;
  const invalid = hasInput && !parseVideoId(value);
  const videoId = parseVideoId(value);

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="flex gap-2">
      {videoId && (
        <Button variant="outline" size="icon" onClick={() => onChange("")}>
          <ArrowLeftIcon />
        </Button>
      )}
      <Button
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          if (!text) {
            toast.info("Nothing to paste", {
              id: "clipboard-empty",
              description: "Your clipboard is empty.",
            });
            return;
          }
          onChange(text);
        }}
        variant="secondary"
        size="lg"
      >
        <ClipboardIcon />
        Paste
      </Button>
      <InputGroup className="h-9">
        <InputGroupInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="YouTube URL or video ID"
          aria-invalid={invalid}
          className="text-base!"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={handleClear}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button size="lg" onClick={() => onChange(value)}>
        Submit
        <CornerDownLeftIcon className="opacity-80" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-lg" disabled={!videoId}>
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
            >
              <ExternalLinkIcon />
              Watch on YouTube
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {copyOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={async () => {
                if (videoId) {
                  await navigator.clipboard.writeText(option.getValue(videoId));
                  toast.success(`${option.label} copied to clipboard`);
                }
              }}
            >
              <CopyIcon />
              Copy {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
