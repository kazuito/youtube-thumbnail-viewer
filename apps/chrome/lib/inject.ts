import type { ContentScriptContext } from "wxt/utils/content-script-context";
import { createIntegratedUi } from "wxt/utils/content-script-ui/integrated";
import { sleep } from "./utils";
import { getAvailableThumbnailUrl, getVideoId } from "./youtube";

const FADEOUT_DURATION = 240;

const containerTagName = "ytv-thumbnail-preview";

const classNames = {
  link: "ytv-link",
  img: "ytv-img",
} as const;

const selectors = {
  link: `${containerTagName} .${classNames.link}`,
  img: `${containerTagName} .${classNames.img}`,
} as const;

export async function updateThumbnail(ctx: ContentScriptContext) {
  const link = document.querySelector(selectors.link);
  const img = document.querySelector(selectors.img);

  // start hide animation for existing image
  img?.setAttribute("data-hidden", "true");

  const videoId = getVideoId();

  if (!videoId) {
    clean();
    return;
  }

  const [imageUrl] = await Promise.all([
    await getAvailableThumbnailUrl(videoId),
    sleep(FADEOUT_DURATION), // wait for fadeout animation of previous image
  ]);

  if (!imageUrl) {
    clean();
    return;
  }

  if (link && img) {
    if (img.getAttribute("src") === imageUrl) return;

    const newImage = makeImageElement(imageUrl);

    // remove old image then append new one. reuse existing link element.
    newImage.onload = () => {
      img.remove();
      link.appendChild(newImage);
      link.setAttribute("href", imageUrl);
    };

    return;
  }

  clean();
  injectThumbnail(ctx, imageUrl);
}

function injectThumbnail(ctx: ContentScriptContext, imageUrl: string) {
  const ui = createIntegratedUi(ctx, {
    position: "inline",
    anchor: "#description-inline-expander",
    append: "first",
    tag: containerTagName,
    onMount: async (container) => {
      const link = document.createElement("a");
      link.setAttribute("href", imageUrl);
      link.target = "_blank";
      link.className = classNames.link;

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
  img.className = classNames.img;
  return img;
}

/**
 * Remove existing injected containers
 */
export function clean() {
  document.querySelectorAll(containerTagName).forEach((el) => {
    el.remove();
  });
}
