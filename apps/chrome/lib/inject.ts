import type { ContentScriptContext } from "wxt/utils/content-script-context";
import { createIntegratedUi } from "wxt/utils/content-script-ui/integrated";
import { sleep } from "./utils";
import { getAvailableThumbnailUrl } from "./youtube";

const FADEOUT_DURATION = 240;

export const containerTagName = "ytv-thumbnail-preview";

export const classNames = {
  anchor: "ytv-anchor",
  image: "ytv-image",
} as const;

export const selectors = {
  anchor: `${containerTagName} .${classNames.anchor}`,
  image: `${containerTagName} .${classNames.image}`,
} as const;

export async function updateThumbnail(
  context: ContentScriptContext,
  videoId: string | null,
) {
  const anchor = document.querySelector<HTMLAnchorElement>(selectors.anchor);
  const image = document.querySelector<HTMLImageElement>(selectors.image);

  // start hide animation for existing image
  image?.setAttribute("data-hidden", "true");

  if (!videoId) {
    clean();
    return;
  }

  const [newImageUrl] = await Promise.all([
    await getAvailableThumbnailUrl(videoId),
    sleep(FADEOUT_DURATION), // wait for fadeout animation of previous image
  ]);

  if (!newImageUrl) {
    clean();
    return;
  }

  if (anchor && image) {
    if (image.getAttribute("src") === newImageUrl) {
      alert("Thumbnail is already up to date.");
      return;
    }

    const newImage = createImage(newImageUrl);

    // remove old image then append new one. reuse existing anchor element.
    newImage.onload = () => {
      image.remove();
      anchor.appendChild(newImage);
      anchor.setAttribute("href", newImageUrl);
    };

    return;
  }

  clean();
  injectThumbnail(context, newImageUrl);
}

function injectThumbnail(context: ContentScriptContext, imageUrl: string) {
  const onMount = async (container: HTMLElement) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", imageUrl);
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.className = classNames.anchor;

    const image = createImage(imageUrl);
    image.onload = () => {
      anchor.appendChild(image);
      container.append(anchor);
    };
  };

  const ui = createIntegratedUi(context, {
    position: "inline",
    anchor: "#description-inline-expander",
    append: "first",
    tag: containerTagName,
    onMount,
  });

  ui.autoMount();
}

function createImage(imageUrl: string): HTMLImageElement {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.className = classNames.image;
  return image;
}

/**
 * Remove existing injected containers
 */
export function clean() {
  document.querySelectorAll(containerTagName).forEach((el) => {
    el.remove();
  });
}
