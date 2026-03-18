"use client";

import {
  ClipboardCopyIcon,
  CopyIcon,
  DownloadIcon,
  ImageIcon,
  LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THUMBNAILS = [
  { name: "maxresdefault", label: "Max res", width: 1280, height: 720 },
  { name: "sddefault", label: "SD", width: 640, height: 480 },
  { name: "hqdefault", label: "HQ", width: 480, height: 360 },
  { name: "mqdefault", label: "MQ", width: 320, height: 180 },
  { name: "default", label: "Default", width: 120, height: 90 },
  { name: "0", label: "Frame 0", width: 480, height: 360 },
  { name: "1", label: "Frame 1", width: 120, height: 90 },
  { name: "2", label: "Frame 2", width: 120, height: 90 },
  { name: "3", label: "Frame 3", width: 120, height: 90 },
] as const;

async function fetchImageBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  return res.blob();
}

function ThumbnailCard({
  videoId,
  name,
  label,
  width,
  height,
}: {
  videoId: string;
  name: string;
  label: string;
  width: number;
  height: number;
}) {
  const [hidden, setHidden] = useState(false);
  const url = `https://img.youtube.com/vi/${videoId}/${name}.jpg`;

  if (hidden) return null;

  const handleDownload = async () => {
    const blob = await fetchImageBlob(url);
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = `${videoId}-${name}.jpg`;
    a.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleCopyImage = async () => {
    const blob = await fetchImageBlob(url);
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
    const pngBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        "image/png",
      ),
    );
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": pngBlob }),
    ]);
    toast.success("Image copied to clipboard", {
      description: `${label} (${width}×${height})`,
    });
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard", {
      description: `${label} (${width}×${height})`,
    });
  };

  return (
    <div className="flex flex-col gap-1.5 group/card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg overflow-hidden border border-border hover:brightness-110 transition-all"
      >
        {/* biome-ignore lint/performance/noImgElement: external dynamic URL */}
        <img
          src={url}
          alt={`${label} thumbnail`}
          className="w-full h-auto"
          onError={() => setHidden(true)}
        />
      </a>
      <div className="flex items-center justify-between px-0.5">
        <div className="flex flex-col">
          <span className="text-xs font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">
            {width}×{height}
          </span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={handleDownload}
            className="sm:opacity-0 group-hover/card:opacity-100 transition-opacity sm:size-8"
          >
            <DownloadIcon />
            <span className="sm:sr-only">Download</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="sm:opacity-0 group-hover/card:opacity-100 transition-opacity sm:size-8 data-open:opacity-100"
              >
                <CopyIcon />
                <span className="sm:sr-only">Copy</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyImage}>
                <CopyIcon />
                Copy Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyUrl}>
                <CopyIcon />
                Copy Image URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

interface ThumbnailGalleryProps {
  videoId: string;
}

export function ThumbnailGallery({ videoId }: ThumbnailGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-muted-foreground">Thumbnails</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {THUMBNAILS.map((t) => (
          <ThumbnailCard key={t.name} videoId={videoId} {...t} />
        ))}
      </div>
    </div>
  );
}
