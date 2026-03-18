import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const extensionPath = path.resolve(
  __dirname,
  "../../.output/chrome-mv3",
);

export default defineConfig({
  testDir: ".",
  use: {
    headless: false,
  },
});
