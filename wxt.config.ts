import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  webExt: {
    startUrls: ["https://www.youtube.com/watch?v=jNQXAC9IVRw"],
  },
  manifest: {
    version: "0.0.4",
    name: "__MSG_extName__",
    short_name: "__MSG_extShortName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    host_permissions: ["https://www.youtube.com/*"],
  },
});
