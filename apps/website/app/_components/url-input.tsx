"use client";

import { ArrowRightToLineIcon, CornerDownLeft, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { parseVideoId } from "@/lib/youtube";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function UrlInput({ value, onChange }: UrlInputProps) {
  const hasInput = value.trim().length > 0;
  const invalid = hasInput && !parseVideoId(value);

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          onChange(text);
        }}
        variant="secondary"
      >
        Paste
        <ArrowRightToLineIcon />
      </Button>
      <InputGroup>
        <InputGroupInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="YouTube URL or video ID"
          aria-invalid={invalid}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={handleClear}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button>
        Submit
        <CornerDownLeft />
      </Button>
    </div>
  );
}
