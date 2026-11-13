import { afterEach, describe, expect, it, vi } from "vitest";
import { getAvailableThumbnailUrl, parseVideoId } from "../../lib/youtube";

describe("parseVideoId", () => {
  it("extracts ID from standard ?v= URL", () => {
    expect(parseVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("extracts ID when URL has multiple params", () => {
    expect(
      parseVideoId(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42&list=PL123",
      ),
    ).toBe("dQw4w9WgXcQ");
  });

  it("extracts ID when URL has a hash", () => {
    expect(
      parseVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=30"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("returns null when v param is absent", () => {
    expect(parseVideoId("https://www.youtube.com/")).toBeNull();
  });

  it("returns null for URL with no query params", () => {
    expect(parseVideoId("https://www.youtube.com/channel/UCxyz")).toBeNull();
  });
});

describe("getAvailableThumbnailUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns maxresdefault URL when it responds 200", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    const result = await getAvailableThumbnailUrl("dQw4w9WgXcQ");
    expect(result).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
  });

  it("returns mqdefault URL when maxresdefault 404s", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false }) // maxresdefault
        .mockResolvedValueOnce({ ok: true }), // mqdefault
    );

    const result = await getAvailableThumbnailUrl("dQw4w9WgXcQ");
    expect(result).toBe("https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg");
  });

  it("returns null when all thumbnails 404", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const result = await getAvailableThumbnailUrl("dQw4w9WgXcQ");
    expect(result).toBeNull();
  });
});

describe("thumbnail network failures", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("falls back after a rejected request", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new TypeError("offline"))
        .mockResolvedValueOnce({ ok: true }),
    );
    expect(await getAvailableThumbnailUrl("video")).toContain("mqdefault.jpg");
  });

  it("returns null after all requests reject", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    expect(await getAvailableThumbnailUrl("video")).toBeNull();
  });

  it("does not request anything after cancellation", async () => {
    const controller = new AbortController();
    controller.abort();
    vi.stubGlobal("fetch", vi.fn());
    expect(
      await getAvailableThumbnailUrl("video", controller.signal),
    ).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("omits credentials and referrers", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    await getAvailableThumbnailUrl("video");
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "HEAD",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        signal: expect.any(AbortSignal),
      }),
    );
  });
});
