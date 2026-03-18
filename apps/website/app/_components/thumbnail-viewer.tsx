"use client";

import { useQueryState } from "nuqs";
import { ThumbnailGallery } from "./thumbnail-gallery";
import { UrlInput } from "./url-input";
import { VideoEmbed } from "./video-embed";

export function ThumbnailViewer() {
  const [videoId, setVideoId] = useQueryState("vid");

  return (
    <div className="flex flex-col gap-8">
      <UrlInput initialValue={videoId} onVideoId={setVideoId} />
      {videoId && (
        <>
          <VideoEmbed videoId={videoId} />
          <ThumbnailGallery videoId={videoId} />
        </>
      )}
    </div>
  );
}
