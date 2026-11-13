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
    artifactTemplate:
      "youtube-thumbnail-viewer-{{packageVersion}}-{{browser}}{{modeSuffix}}.zip",
    sourcesTemplate:
      "youtube-thumbnail-viewer-{{packageVersion}}-sources{{modeSuffix}}.zip",
    sourcesRoot: fileURLToPath(new URL("../../", import.meta.url)),
    includeSources: [
      "package.json",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "apps/browser/package.json",
      "apps/browser/wxt.config.ts",
      "apps/browser/tsconfig.json",
      "apps/browser/README.md",
      "apps/browser/SOURCE_CODE_REVIEW.md",
      "apps/browser/entrypoints/**",
      "apps/browser/lib/**",
      "apps/browser/assets/**",
      "apps/browser/public/**",
    ],
  },
});
