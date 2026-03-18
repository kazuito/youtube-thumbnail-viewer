import { defineContentScript } from "wxt/utils/define-content-script";
import { MatchPattern } from "wxt/utils/match-patterns";
import { clean, updateThumbnail } from "@/lib/inject";
import "../assets/styles.css";
import { parseVideoId } from "@/lib/youtube";

const watchPattern = new MatchPattern("*://www.youtube.com/watch*");
const isWatchPage = (url: URL) => watchPattern.includes(url);

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  main: (context) => {
    // Initial injection
    const href = window.location.href;
    if (isWatchPage(new URL(href))) {
      updateThumbnail(context, parseVideoId(href));
    }

    // Listen for client-side URL changes
    context.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      if (!isWatchPage(newUrl)) {
        clean();
        return;
      }
      updateThumbnail(context, parseVideoId(newUrl.href));
    });
  },
});
