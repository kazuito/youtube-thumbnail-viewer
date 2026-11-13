import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContentScriptContext } from "wxt/utils/content-script-context";

vi.mock("wxt/utils/content-script-ui/integrated", () => ({
  createIntegratedUi: vi.fn(),
}));
const { clean, updateThumbnail, selectors } = await import("../../lib/inject");
const { createIntegratedUi } = await import(
  "wxt/utils/content-script-ui/integrated"
);
let images: HTMLImageElement[];
let remove: ReturnType<typeof vi.fn>;
let invalidated: () => void;
let mount: () => void;
let unmount: () => void;
let context: ContentScriptContext;

beforeEach(() => {
  vi.useFakeTimers();
  images = [];
  context = {
    onInvalidated: vi.fn((callback) => {
      invalidated = callback;
    }),
  } as unknown as ContentScriptContext;
  const create = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation((tag, options) => {
    const element = create(tag, options);
    if (tag === "img") images.push(element as HTMLImageElement);
    return element;
  });
  vi.mocked(createIntegratedUi).mockImplementation((_ctx, options) => {
    const wrapper = create("ytv-thumbnail-preview");
    let mounted: unknown;
    mount = () => {
      document.body.append(wrapper);
      mounted = options.onMount?.(wrapper);
    };
    unmount = () => {
      options.onRemove?.(mounted);
      wrapper.replaceChildren();
      wrapper.remove();
    };
    remove = vi.fn(unmount);
    return {
      wrapper,
      autoMount: mount,
      mount,
      remove,
    } as unknown as ReturnType<typeof createIntegratedUi>;
  });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
});
afterEach(() => {
  clean();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  vi.useRealTimers();
  document.body.replaceChildren();
});
async function update(id: string | null) {
  const promise = updateThumbnail(context, id);
  await vi.advanceTimersByTimeAsync(240);
  await promise;
}
function load() {
  images.at(-1)?.dispatchEvent(new Event("load"));
}

describe("thumbnail lifecycle", () => {
  it("mounts the loaded image and matching link", async () => {
    await update("videoA");
    load();
    expect(
      document.querySelector(selectors.image)?.getAttribute("src"),
    ).toContain("/videoA/maxresdefault.jpg");
    expect(
      document.querySelector(selectors.anchor)?.getAttribute("href"),
    ).toContain("/videoA/maxresdefault.jpg");
  });
  it("keeps the same video visible without another request", async () => {
    await update("videoA");
    load();
    await update("videoA");
    expect(fetch).toHaveBeenCalledOnce();
    expect(
      document.querySelector(selectors.image)?.hasAttribute("data-hidden"),
    ).toBe(false);
  });
  it("replaces the old video after the new image loads", async () => {
    await update("videoA");
    load();
    const oldRemove = remove;
    await update("videoB");
    load();
    expect(oldRemove).toHaveBeenCalledOnce();
    expect(document.querySelectorAll(selectors.image)).toHaveLength(1);
    expect(
      document.querySelector(selectors.anchor)?.getAttribute("href"),
    ).toContain("/videoB/");
  });
  it("does not mount a late response after leaving watch", async () => {
    let resolve!: (value: { ok: boolean }) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise((r) => {
          resolve = r as typeof resolve;
        }),
    );
    const pending = updateThumbnail(context, "videoA");
    clean();
    resolve({ ok: true });
    await vi.advanceTimersByTimeAsync(240);
    await pending;
    expect(createIntegratedUi).not.toHaveBeenCalled();
  });
  it("ignores A when B finishes first", async () => {
    let resolve!: (value: { ok: boolean }) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise((r) => {
          resolve = r as typeof resolve;
        }),
    );
    const pending = updateThumbnail(context, "videoA");
    await update("videoB");
    load();
    resolve({ ok: true });
    await pending;
    expect(
      document.querySelector(selectors.anchor)?.getAttribute("href"),
    ).toContain("/videoB/");
  });
  it("removes the UI and observer on cleanup", async () => {
    await update("videoA");
    load();
    clean();
    expect(remove).toHaveBeenCalledOnce();
    expect(document.querySelector(selectors.anchor)).toBeNull();
  });
  it("ignores image load after navigation", async () => {
    await update("videoA");
    const image = images.at(-1);
    await update(null);
    image?.dispatchEvent(new Event("load"));
    expect(document.querySelector(selectors.anchor)).toBeNull();
  });
  it("cleans up on image error", async () => {
    await update("videoA");
    images.at(-1)?.dispatchEvent(new Event("error"));
    expect(remove).toHaveBeenCalledOnce();
  });
  it("cleans up on image timeout", async () => {
    await update("videoA");
    await vi.advanceTimersByTimeAsync(10_000);
    expect(remove).toHaveBeenCalledOnce();
  });
  it("remounts the current image when YouTube replaces the description", async () => {
    await update("videoA");
    load();
    unmount();
    mount();
    load();
    expect(document.querySelectorAll(selectors.image)).toHaveLength(1);
    expect(
      document.querySelector(selectors.anchor)?.getAttribute("href"),
    ).toContain("/videoA/");
  });
  it("cleans up when the context is invalidated", async () => {
    await update("videoA");
    invalidated();
    expect(remove).toHaveBeenCalledOnce();
  });
  it("removes an existing UI when every probe fails", async () => {
    await update("videoA");
    load();
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
    await update("videoB");
    expect(document.querySelector(selectors.anchor)).toBeNull();
  });
});
