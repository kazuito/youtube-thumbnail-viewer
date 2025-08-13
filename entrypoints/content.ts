import { ContentScriptContext } from "#imports";
import { getAvailableThumbnail, getVideoId } from "@/lib/youtube";
import "../assets/styles.css";

const watchPattern = new MatchPattern("*://*.youtube.com/watch*");

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main(ctx) {
    // initial image injection
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

async function updateThumbnail(ctx: ContentScriptContext) {
  // start hide animation for existing image
  document
    .querySelector("yt-thumbnail-preview .ytv-img")
    ?.setAttribute("data-hidden", "true");

  const videoId = getVideoId();
  if (!videoId) {
    removeAllThumbnails();
    return;
  }

  const [imageUrl] = await Promise.all([
    await getAvailableThumbnail(videoId),
    sleep(240), // wait for hide animation of previous image
  ]);
  if (!imageUrl) {
    removeAllThumbnails();
    return;
  }

  const link = document.querySelector("yt-thumbnail-preview .ytv-link");
  const img = document.querySelector("yt-thumbnail-preview .ytv-img");

  // remove old image then append new one. reuse existing link element.
  if (link && img) {
    const newImage = makeImageElement(imageUrl);

    if (img.getAttribute("src") === imageUrl) return;

    newImage.onload = () => {
      img.remove();
      link.appendChild(newImage);
      link.setAttribute("href", imageUrl);
    };
    return;
  }

  injectThumbnail(ctx, imageUrl);
}

function injectThumbnail(ctx: ContentScriptContext, imageUrl: string) {
  const ui = createIntegratedUi(ctx, {
    position: "inline",
    anchor: "#description-inline-expander",
    append: "first",
    tag: "yt-thumbnail-preview",
    onMount: async (container) => {
      const link = document.createElement("a");
      link.setAttribute("href", imageUrl);
      link.className = "ytv-link";
      link.target = "_blank";

      const img = makeImageElement(imageUrl);
      img.onload = () => {
        link.appendChild(img);
        container.append(link);
      };
    },
  });
  ui.autoMount();
}

function makeImageElement(imageUrl: string): HTMLImageElement {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.className = "ytv-img";
  return img;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeAllThumbnails() {
  document
    .querySelectorAll("yt-thumbnail-preview")
    .forEach((el) => el.remove());
}
