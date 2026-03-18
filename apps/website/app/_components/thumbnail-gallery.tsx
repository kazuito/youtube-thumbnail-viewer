"use client";

import { useState } from "react";

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

  return (
    <div className="flex flex-col gap-1.5">
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
      <div className="flex items-center justify-between px-0.5 text-xs text-muted-foreground">
        <span className="font-medium">{label}</span>
        <span>
          {width}×{height}
        </span>
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
      <h2 className="text-sm font-medium text-muted-foreground">
        Thumbnails
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {THUMBNAILS.map((t) => (
          <ThumbnailCard key={t.name} videoId={videoId} {...t} />
        ))}
      </div>
    </div>
  );
}
