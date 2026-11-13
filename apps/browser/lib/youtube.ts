export function parseVideoId(url: string) {
  return new URL(url).searchParams.get("v");
}

const THUMBNAIL_NAMES = ["maxresdefault", "mqdefault"] as const;

export async function getAvailableThumbnailUrl(
  videoId: string,
  signal?: AbortSignal,
) {
  for (const name of THUMBNAIL_NAMES) {
    if (signal?.aborted) return null;
    const url = `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/${name}.jpg`;
    try {
      const response = await fetch(url, {
        method: "HEAD",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        signal: signal
          ? AbortSignal.any([signal, AbortSignal.timeout(10_000)])
          : AbortSignal.timeout(10_000),
      });
      if (response.ok) return url;
    } catch {
      if (signal?.aborted) return null;
    }
  }
  return null;
}
