import { fileURLToPath } from "node:url";
import { defineConfig } from "wxt";

export default defineConfig({
  imports: false,
  manifestVersion: 3,
  webExt: {
    startUrls: ["https://www.youtube.com/watch?v=LmZD-TU96q4"],
    chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],
  },
  manifest: ({ browser }) => ({
    name: "__MSG_extName__",
    short_name: "__MSG_extShortName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    host_permissions: ["https://www.youtube.com/*"],
    ...(browser === "firefox"
      ? {
          browser_specific_settings: {
            gecko: {
              id: "youtube-thumbnail-viewer@kazuito",
              strict_min_version: "140.0",
              data_collection_permissions: { required: ["browsingActivity"] },
            },
            gecko_android: { strict_min_version: "142.0" },
          },
        }
      : {}),
  }),
  zip: {
    sourcesRoot: fileURLToPath(new URL("../../", import.meta.url)),
    includeSources: [
      "package.json",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "apps/chrome/package.json",
      "apps/chrome/wxt.config.ts",
      "apps/chrome/tsconfig.json",
      "apps/chrome/README.md",
      "apps/chrome/SOURCE_CODE_REVIEW.md",
      "apps/chrome/entrypoints/**",
      "apps/chrome/lib/**",
      "apps/chrome/assets/**",
      "apps/chrome/public/**",
    ],
  },
});
