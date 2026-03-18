import { env } from "@/lib/env";

export const SITE_URL =
  env.NEXT_PUBLIC_SITE_URL ?? "https://youtubethumbnailviewer.vercel.app/";

export const SITE_NAME = "YouTube Thumbnail Viewer";

export const SITE_DESCRIPTION =
  "A lightweight Chrome extension that displays a video's thumbnail directly in the description area on YouTube — without leaving the page.";

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/youtube-thumbnail-viewer/gepipnmhdeemppokommnippgeeagabio";
