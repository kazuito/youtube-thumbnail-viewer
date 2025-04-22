



export function getVideoId(url: string) {
  return new URL(url).searchParams.get("v");
}
