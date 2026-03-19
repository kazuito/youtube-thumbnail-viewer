# YouTube Thumbnail Viewer - Chrome Extension

Chrome extension that injects the current video's thumbnail into the YouTube watch page description.

## Stack

- Framework: WXT
- Language: TypeScript
- Styling: plain CSS injected by the content script
- Linter/Formatter: Biome
- Browser targets: Chromium by default, Firefox scripts also exist

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
   Uses WXT's `createIntegratedUi` to mount a `<ytv-thumbnail-preview>` element before `#description-inline-expander`, reuse the existing anchor on video changes, and remove stale UI when leaving watch pages.

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
pnpm zip:firefox    # Package Firefox zip
pnpm check          # Biome check with --write
pnpm typecheck      # TypeScript check
```

## Notes

- The extension relies on YouTube DOM selectors like `#description-inline-expander` and `#snippet`, so markup changes on YouTube can break injection.
- Chrome Web Store metadata ships in 55 locales via `public/_locales/`.
- Local build artifacts are generated under `.output/` and `.wxt/`.
- The marketing website lives in `../website` and imports this package's version from `package.json` for the `/chrome` landing page.
