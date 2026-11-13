# Rebuilding the Firefox extension

Build environment: macOS arm64, Node.js 26.13.0, pnpm 12.18.0.
The repository uses one root pnpm lockfile. The source archive preserves the
workspace paths but excludes the website and local browser profiles.

From the root of the extracted source archive:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm --filter browser exec wxt prepare
pnpm --filter browser build:firefox
```

The production extension is in `apps/browser/.output/firefox-mv3`.
No credentials, environment files, private packages, or remote build services
are required. Lifecycle scripts are skipped to avoid installing Git hooks in
the review archive; WXT type generation is run explicitly instead.

## Network and privacy

The extension reads the current YouTube video ID locally and uses it to request
thumbnail images from `https://img.youtube.com/vi/<video-id>/...`.
It probes image availability with HEAD requests, then displays the image with
an image GET. HEAD requests omit credentials and referrers; image requests also
use a no-referrer policy. Image requests follow the browser's normal cookie
policy. The image server receives the video ID and the client's IP address.
The developer operates no collection server, analytics, or persistent storage.

Firefox declares required `browsingActivity` transmission because the requested
image path identifies the video being viewed. Firefox 140 or later presents
this declaration in the built-in installation consent. The same disclosure
must be included in the AMO listing when publishing.

Only desktop Firefox is supported and tested. `gecko_android.strict_min_version`
is 142 solely to prevent installation on Android versions that cannot interpret
the data consent declaration; it is not a claim of Android support. Do not opt
into Android distribution on AMO.
