import type { ContentScriptContext } from "wxt/utils/content-script-context";
import { createIntegratedUi } from "wxt/utils/content-script-ui/integrated";
import { sleep } from "./utils";
import { getAvailableThumbnailUrl } from "./youtube";

const FADEOUT_DURATION = 240;
export const containerTagName = "ytv-thumbnail-preview";
export const classNames = { anchor: "ytv-anchor", image: "ytv-image" } as const;
export const selectors = {
  anchor: `${containerTagName} .${classNames.anchor}`,
  image: `${containerTagName} .${classNames.image}`,
} as const;

let ui: ReturnType<typeof createIntegratedUi> | undefined;
let request: AbortController | undefined;
let currentVideoId: string | undefined;
const contexts = new WeakSet<ContentScriptContext>();

export async function updateThumbnail(
  context: ContentScriptContext,
  videoId: string | null,
) {
  if (!contexts.has(context)) {
    contexts.add(context);
    context.onInvalidated(clean);
  }
  if (!videoId) {
    clean();
    return;
  }
  if (currentVideoId === videoId) return;

  request?.abort();
  const controller = new AbortController();
  request = controller;
  currentVideoId = videoId;
  const isCurrent = () => request === controller && !controller.signal.aborted;
  document.querySelector(selectors.image)?.setAttribute("data-hidden", "true");

  const [imageUrl] = await Promise.all([
    getAvailableThumbnailUrl(videoId, controller.signal),
    sleep(FADEOUT_DURATION),
  ]);
  if (!isCurrent()) return;
  if (!imageUrl) {
    clean();
    return;
  }

  ui?.remove();
  ui = createIntegratedUi(context, {
    position: "inline",
    anchor: "#description-inline-expander",
    append: "first",
    tag: containerTagName,
    onMount: (container) => {
      if (!isCurrent()) return;
      const anchor = document.createElement("a");
      anchor.href = imageUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.className = classNames.anchor;
      const image = document.createElement("img");
      image.className = classNames.image;
      image.alt = "Video thumbnail";
      image.referrerPolicy = "no-referrer";
      const timeout = setTimeout(() => {
        if (isCurrent() && container.isConnected) clean();
      }, 10_000);
      const cancel = () => {
        clearTimeout(timeout);
        image.onload = null;
        image.onerror = null;
        controller.signal.removeEventListener("abort", cancel);
      };
      controller.signal.addEventListener("abort", cancel, { once: true });
      image.onload = () => {
        cancel();
        if (!isCurrent() || !container.isConnected) return;
        anchor.append(image);
        container.replaceChildren(anchor);
      };
      image.onerror = () => {
        cancel();
        if (isCurrent() && container.isConnected) clean();
      };
      image.src = imageUrl;
      return cancel;
    },
    onRemove: (cancel) => cancel?.(),
  });
  ui.autoMount();
}

export function clean() {
  request?.abort();
  request = undefined;
  currentVideoId = undefined;
  ui?.remove();
  ui = undefined;
  document.querySelectorAll(containerTagName).forEach((element) => {
    element.remove();
  });
}
