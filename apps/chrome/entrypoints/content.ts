import { defineContentScript } from "wxt/utils/define-content-script";
import { clean, updateThumbnail } from "@/lib/inject";
import "../assets/styles.css";
import { parseVideoId } from "@/lib/youtube";

const isWatchPage = (url: URL) => url.pathname === "/watch";

export default defineContentScript({
  matches: ["https://www.youtube.com/*"],
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
