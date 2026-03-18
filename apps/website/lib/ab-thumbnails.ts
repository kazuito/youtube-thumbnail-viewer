const CORS_PROXY = "https://corsmirror.com/v1?url=";

export interface AbThumbnail {
  url: string;
  index: number;
}

export async function fetchAbThumbnails(
  videoId: string,
): Promise<AbThumbnail[]> {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const res = await fetch(`${CORS_PROXY}${encodeURIComponent(youtubeUrl)}`);
  if (!res.ok) return [];

  const html = await res.text();
  // YouTube JSON-encodes & as \u0026 — normalize before matching
  const normalized = html.replace(/\\u0026/g, "&");

  const regex =
    /https:\/\/i9\.ytimg\.com\/vi\/[\w-]+\/hqdefault_custom_(\d+)\.jpg\?[^"\\<\s]+/g;
  const seen = new Set<string>();
  const results: AbThumbnail[] = [];

  for (const match of normalized.matchAll(regex)) {
    const url = match[0];
    if (!seen.has(url)) {
      seen.add(url);
      results.push({ url, index: parseInt(match[1], 10) });
    }
  }

  return results.sort((a, b) => a.index - b.index);
}
