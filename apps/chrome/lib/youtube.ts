export function parseVideoId(url: string) {
  return new URL(url).searchParams.get("v");
}

const THUMBNAIL_NAMES = ["maxresdefault", "mqdefault"] as const;

export async function getAvailableThumbnailUrl(videoId: string) {
  const imageUrl = (name: string) =>
    `https://img.youtube.com/vi/${videoId}/${name}.jpg`;

  for (const name of THUMBNAIL_NAMES) {
    const url = imageUrl(name);
    const res = await fetch(url, { method: "HEAD" });

    if (res.ok) {
      return url;
    }
  }

  return null;
}
