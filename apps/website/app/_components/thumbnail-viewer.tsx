"use client";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { EXAMPLES } from "@/lib/examples";
import { parseVideoId } from "@/lib/youtube";
import { HeroSection } from "./hero-section";
import { ThumbnailGallery } from "./thumbnail-gallery";
import { UrlInput } from "./url-input";
import { VideoEmbed } from "./video-embed";

export function ThumbnailViewer() {
  const [videoId, setVideoId] = useQueryState("vid", {
    history: "push",
  });
  const [value, setValue] = useState(videoId ?? "");

  const handleSelectExample = (id: string) => {
    setVideoId(id);
    setValue(id);
  };

  useEffect(() => {
    if (!videoId || value.trim() === videoId) return;

    const timer = setTimeout(() => {
      setVideoId(parseVideoId(value));
    }, 300);
    return () => clearTimeout(timer);
  }, [value, setVideoId, videoId]);

  useEffect(() => {
    if (!videoId) return;
    window.scrollTo({ top: 0 });
  }, [videoId]);

  return (
    <div className="flex flex-col gap-8">
      {!value && <HeroSection />}
      <UrlInput
        value={value}
        onChange={(value) => {
          setValue(value);
          setVideoId(parseVideoId(value));
        }}
      />
      {videoId ? (
        <>
          <ThumbnailGallery videoId={videoId} />
          <VideoEmbed videoId={videoId} />
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Try one of these popular videos
          </p>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => handleSelectExample(ex.id)}
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
