export function getVideoId() {
  return new URL(window.location.href).searchParams.get("v");
}

export async function getAvailableThumbnail(videoId: string) {
  const imageUrl = (filename: string) =>
    `https://img.youtube.com/vi/${videoId}/${filename}`;
  const filenames = ["maxresdefault.jpg", "mqdefault.jpg"];

  for (const filename of filenames) {
    const url = imageUrl(filename);
    const res = await fetch(url);
    if (res.ok) {
      return url;
    }
  }
  return null;
}
