"use client";

import { ArrowLeftToLine, XIcon } from "lucide-react";
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
  setValue: (value: string) => void;
}

export function UrlInput({ value, setValue }: UrlInputProps) {
  const hasInput = value.trim().length > 0;
  const invalid = hasInput && !parseVideoId(value);

  const handleClear = () => {
    setValue("");
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
