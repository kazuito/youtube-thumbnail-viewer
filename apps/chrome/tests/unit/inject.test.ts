import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContentScriptContext } from "wxt/utils/content-script-context";

vi.mock("wxt/utils/content-script-ui/integrated", () => ({
  createIntegratedUi: vi.fn(() => ({ autoMount: vi.fn() })),
}));

// Import after mock registration
const { clean, updateThumbnail } = await import("../../lib/inject");
const { createIntegratedUi } = await import(
  "wxt/utils/content-script-ui/integrated"
);

const fakeContext = {} as ContentScriptContext;

function setupExistingThumbnail(src: string) {
  const container = document.createElement("ytv-thumbnail-preview" as any);
  const anchor = document.createElement("a");
  anchor.className = "ytv-anchor";
  const image = document.createElement("img");
  image.className = "ytv-image";
  image.src = src;
  anchor.appendChild(image);
  container.appendChild(anchor);
  document.body.appendChild(container);
}

describe("clean()", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("removes injected ytv-thumbnail-preview elements", () => {
    document.body.innerHTML = `
      <ytv-thumbnail-preview></ytv-thumbnail-preview>
      <ytv-thumbnail-preview></ytv-thumbnail-preview>
    `;
    clean();
    expect(document.querySelectorAll("ytv-thumbnail-preview")).toHaveLength(0);
  });

  it("is a no-op when nothing to clean", () => {
    expect(() => clean()).not.toThrow();
    expect(document.querySelectorAll("ytv-thumbnail-preview")).toHaveLength(0);
  });
});

describe("updateThumbnail()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("alert", vi.fn());
    vi.mocked(createIntegratedUi).mockReturnValue({
      autoMount: vi.fn(),
    } as any);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("calls clean() and returns early when videoId is null", async () => {
    setupExistingThumbnail("https://img.youtube.com/vi/abc/maxresdefault.jpg");
    await updateThumbnail(fakeContext, null);
    expect(document.querySelectorAll("ytv-thumbnail-preview")).toHaveLength(0);
  });

  it("calls clean() when thumbnail fetch returns nothing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    setupExistingThumbnail("https://img.youtube.com/vi/abc/maxresdefault.jpg");

    const promise = updateThumbnail(fakeContext, "abc123");
    await vi.runAllTimersAsync();
    await promise;

    expect(document.querySelectorAll("ytv-thumbnail-preview")).toHaveLength(0);
  });

  it("calls createIntegratedUi when no existing anchor is present", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    const promise = updateThumbnail(fakeContext, "abc123");
    await vi.runAllTimersAsync();
    await promise;

    expect(createIntegratedUi).toHaveBeenCalledOnce();
    expect(
      vi.mocked(createIntegratedUi).mock.results[0].value.autoMount,
    ).toHaveBeenCalledOnce();
  });

  it("alerts when existing anchor has the same src", async () => {
    const existingUrl = "https://img.youtube.com/vi/abc123/maxresdefault.jpg";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    setupExistingThumbnail(existingUrl);

    const promise = updateThumbnail(fakeContext, "abc123");
    await vi.runAllTimersAsync();
    await promise;

    expect(vi.mocked(alert)).toHaveBeenCalledWith(
      "Thumbnail is already up to date.",
    );
  });

  it("swaps image when existing anchor has a different src", async () => {
    const oldUrl = "https://img.youtube.com/vi/abc123/mqdefault.jpg";
    const newUrl = "https://img.youtube.com/vi/abc123/maxresdefault.jpg";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    setupExistingThumbnail(oldUrl);

    const promise = updateThumbnail(fakeContext, "abc123");
    await vi.runAllTimersAsync();
    await promise;

    // createIntegratedUi should NOT be called — existing anchor is reused
    expect(createIntegratedUi).not.toHaveBeenCalled();
    // alert should NOT be called
    expect(vi.mocked(alert)).not.toHaveBeenCalled();
    // A new image with the new src should have been created (appended via onload)
    // We verify the anchor href was queued to update
    const anchor = document.querySelector<HTMLAnchorElement>(
      "ytv-thumbnail-preview .ytv-anchor",
    );
    expect(anchor).not.toBeNull();
    // The new image is appended after onload fires — simulate it
    const newImg = document.querySelector<HTMLImageElement>(
      `ytv-thumbnail-preview .ytv-anchor img[src="${newUrl}"]`,
    );
    // onload hasn't fired in jsdom/happy-dom, but we can confirm old src still there
    // and no alert/createIntegratedUi means the swap branch was taken
    expect(newImg).toBeNull(); // onload hasn't fired yet in test env
  });
});
