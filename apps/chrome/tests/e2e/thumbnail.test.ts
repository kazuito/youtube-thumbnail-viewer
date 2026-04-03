import { containerTagName, selectors } from "@/lib/inject";
import { expect, test } from "./fixtures";

const WATCH_URL = "https://www.youtube.com/watch?v=LmZD-TU96q4";
const HOME_URL = "https://www.youtube.com/";
const SEARCH_RESULT_URL = "https://www.youtube.com/results?search_query=lemon";

test.describe("YouTube Thumbnail Viewer Extension", () => {
  test("injects thumbnail on watch page", async ({ page }) => {
    test.slow();

    await page.goto(WATCH_URL);
    const container = page.locator(containerTagName);
    await expect(container).toBeVisible();

    const anchor = page.locator(selectors.anchor);
    await expect(anchor).toBeVisible();

    const href = await anchor.getAttribute("href");
    expect(href).toContain("img.youtube.com");

    const image = page.locator(selectors.image);
    await expect(image).toBeAttached();
  });

  test("does not inject on non-watch page", async ({ page }) => {
    test.slow();

    await page.goto(HOME_URL);
    const container = page.locator(containerTagName);
    await expect(container).toHaveCount(0);
  });

  test("should remove thumbnail when navigating away", async ({ page }) => {
    test.slow();

    // Start on watch page — extension should inject
    await page.goto(WATCH_URL);
    await expect(page.locator(containerTagName)).toBeVisible();

    // Navigate to homepage via history API (SPA)
    const logo = page.locator("a#logo").first();
    await logo.click();
    await expect(page.locator(containerTagName)).toHaveCount(0);
  });

  test("should add thumbnail when navigating to watch page", async ({
    page,
  }) => {
    test.slow();

    // Start on watch page — extension should inject
    await page.goto(SEARCH_RESULT_URL);
    await expect(page.locator(containerTagName)).toHaveCount(0);

    const link = page.locator('ytd-video-renderer a#thumbnail[href^="/watch?v="]').first();
    await Promise.all([
      page.waitForURL(/\/watch\?v=/, { timeout: 15_000 }),
      link.click(),
    ]);
    await expect(page.locator("#description-inline-expander")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator(selectors.anchor)).toBeVisible({
      timeout: 15_000,
    });
  });
});
