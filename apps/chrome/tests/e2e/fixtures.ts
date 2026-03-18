import { type BrowserContext, test as base, chromium } from "@playwright/test";
import { extensionPath } from "./playwright.config";

export const test = base.extend<{ context: BrowserContext }>({
  context: async (_, use) => {
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect } from "@playwright/test";
