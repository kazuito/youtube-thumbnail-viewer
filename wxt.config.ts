import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: false,
  webExt: {
    startUrls: ["https://www.youtube.com/watch?v=LmZD-TU96q4"],
    chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],
  },
  manifest: {
    name: "__MSG_extName__",
    short_name: "__MSG_extShortName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    host_permissions: ["https://www.youtube.com/*"],
  },
});
