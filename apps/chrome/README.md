# YouTube Thumbnail Viewer - Browser Extension

Chrome and desktop Firefox extension that injects the current video's thumbnail into the YouTube watch page description.

## Stack

- Framework: WXT
- Language: TypeScript
- Styling: plain CSS injected by the content script
- Linter/Formatter: Biome
- Browser targets: Chrome MV3 and desktop Firefox 140+ MV3

## What It Does

- Runs on `https://www.youtube.com/*`
- Detects YouTube watch pages at `/watch?v=...`
- Resolves the best available thumbnail for the current video
- Injects a clickable preview into the description area
- Animates the thumbnail out and back in during SPA video navigation

## How It Works

1. `entrypoints/content.ts`
   Watches all YouTube pages, injects on initial load for watch URLs, and listens for `wxt:locationchange` so navigation inside YouTube updates or removes the preview.

2. `lib/youtube.ts`
   Reads the current `v` query param and probes `img.youtube.com` with `HEAD` requests. It currently tries `maxresdefault.jpg` first, then `mqdefault.jpg`.

3. `lib/inject.ts`
   Uses WXT's `createIntegratedUi` to mount a `<ytv-thumbnail-preview>` element as the first child of `#description-inline-expander`. Cancels stale requests on navigation and removes both the UI and its observer when leaving watch pages.

4. `assets/styles.css`
   Floats the preview to the right, enforces a 16:9 frame, handles fade-in and fade-out transitions, and applies a couple of YouTube-specific overrides so the injected thumbnail behaves like part of the page.

## Project Structure

```text
assets/
  styles.css            Injected UI styles and YouTube overrides
entrypoints/
  content.ts            Content script entrypoint
lib/
  inject.ts             DOM mount, image swap, cleanup
  youtube.ts            Video ID parsing and thumbnail URL probing
  utils.ts              Small shared helpers
public/
  icon/                 Extension icons
wxt.config.ts           WXT config and manifest settings
```

## Commands

Run these from `apps/chrome` or from the repo root with `pnpm --filter chrome ...`.

```bash
pnpm dev            # Launch Chromium dev mode with WXT
pnpm dev:firefox    # Launch Firefox dev mode
pnpm build          # Build production extension output
pnpm build:firefox  # Build Firefox output
pnpm zip            # Package Chromium zip for distribution
pnpm zip:firefox    # Package Firefox extension and review sources
pnpm check          # Biome check with --write
pnpm typecheck      # TypeScript check
pnpm lint:firefox   # Validate production Firefox output
pnpm verify:packages # Check manifests and rebuild Firefox from sources (build/zip both first)
```

## Notes

- The extension relies on YouTube DOM selectors like `#description-inline-expander` and `#snippet`, so markup changes on YouTube can break injection.
- Chrome Web Store metadata ships in 55 locales via `public/_locales/`.
- Local build artifacts are generated under `.output/` and `.wxt/`.
- The marketing website lives in `../website` and imports this package's version from `package.json` for the `/chrome` landing page.

## GitHub Releases

Push a version tag matching `apps/chrome/package.json` (for example, `0.0.8`
or `v0.0.8`) to create a GitHub Release automatically. The release workflow
runs extension lint, type checks, unit tests, Firefox validation, and the
source rebuild check before publishing. It attaches the Chrome ZIP, Firefox
ZIP, and Firefox review source ZIP, with automatically generated release notes.
Store submission and Firefox signing remain separate steps.

## Firefox testing and distribution

Install dependencies from the repository root with `pnpm install --frozen-lockfile`.
The root `pnpm-lock.yaml` is the only extension dependency lockfile.

Use `pnpm dev:firefox` for development. To test the production extension, run
`pnpm build:firefox`, open `about:debugging#/runtime/this-firefox` in Firefox,
choose **Load Temporary Add-on**, and select `.output/firefox-mv3/manifest.json`.
Allow the extension access to YouTube. Test initial load, watch-to-watch
navigation, home-to-watch navigation, back/forward, and opening the preview.

`pnpm zip:firefox` creates `.output/chrome-<version>-firefox.zip` and
`.output/chrome-<version>-sources.zip`. Submit both to Mozilla Add-ons (AMO),
with the build instructions in [SOURCE_CODE_REVIEW.md](SOURCE_CODE_REVIEW.md).
AMO signing is required for normal distribution. The extension ID is
`youtube-thumbnail-viewer@kazuito`; keep it stable across releases.
Android distribution is not supported.

The extension sends the current video ID to YouTube's image server to retrieve
its thumbnail. Firefox declares required browsing activity transmission in its
installation consent. The developer collects no analytics and operates no
collection server. See the review document for the complete network disclosure;
use the same disclosure in the AMO listing.

Chrome E2E tests use Playwright's bundled Chromium. Firefox production builds
must also be tested in Firefox itself; adding a Playwright Firefox project does
not load the extension. CI validates Firefox manifests, packages and source
rebuilds; live YouTube E2E tests run separately with `pnpm test:e2e`.
