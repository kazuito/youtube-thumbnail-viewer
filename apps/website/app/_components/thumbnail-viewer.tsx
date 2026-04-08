"use client";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { parseVideoId } from "@/lib/youtube";
import { ExampleVideos } from "./example-videos";
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
    scrollTo({ top: 0, behavior: "smooth" });
  }, [videoId]);

  return (
    <div className="flex flex-col gap-8">
      <HeroSection className={cn(videoId && "hidden")} />
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
        <ExampleVideos onSelect={handleSelectExample} />
      )}
    </div>
  );
}
