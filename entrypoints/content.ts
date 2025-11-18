import "../assets/styles.css";
import { defineContentScript } from "wxt/utils/define-content-script";
import { MatchPattern } from "wxt/utils/match-patterns";
import { updateThumbnail } from "@/lib/inject";

const watchPattern = new MatchPattern("*://www.youtube.com/watch*");

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  main: (ctx) => {
    // initial injection
    const url = new URL(window.location.href);
    if (watchPattern.includes(url)) {
      updateThumbnail(ctx);
    }

    // listen for client-side URL changes
    ctx.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      if (watchPattern.includes(newUrl)) {
        updateThumbnail(ctx);
      }
    });
  },
});
