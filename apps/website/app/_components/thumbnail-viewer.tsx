"use client";

import { useState } from "react";
import { ThumbnailGallery } from "./thumbnail-gallery";
import { UrlInput } from "./url-input";
import { VideoEmbed } from "./video-embed";

export function ThumbnailViewer() {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <UrlInput onVideoId={setVideoId} />
      {videoId && (
        <>
          <VideoEmbed videoId={videoId} />
          <ThumbnailGallery videoId={videoId} />
        </>
      )}
    </div>
  );
}
