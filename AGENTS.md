# YouTube Thumbnail Viewer

Monorepo containing a Chrome Extension and its marketing website.

## Apps

### `apps/chrome` — Chrome Extension
- Framework: [WXT](https://wxt.dev/) (web extension framework)
- Language: TypeScript
- Linter/Formatter: Biome
- Permissions: `host_permissions` on `https://www.youtube.com/*`

#### What it does
Injects a thumbnail image into the YouTube watch page (`/watch?v=...`) description area. The thumbnail floats right inside `#description-inline-expander`, is clickable (opens full-size image in a new tab), and animates in/out on video navigation.

#### How it works
1. **Content script** (`entrypoints/content.ts`) runs on all `youtube.com` pages.
   - On load, checks if the URL matches `/watch*` and calls `updateThumbnail`.
   - Listens for `wxt:locationchange` (SPA navigation) to call `updateThumbnail` or `clean` as the user navigates between pages.

2. **Thumbnail resolution** (`lib/youtube.ts`)
   - Extracts `?v=` param from the URL for the video ID.
   - Tries thumbnail URLs in order of quality: `maxresdefault.jpg` → `mqdefault.jpg` (via `HEAD` requests to `img.youtube.com`).
   - Returns the first URL that responds with HTTP 200.

3. **DOM injection** (`lib/inject.ts`)
   - Uses WXT's `createIntegratedUi` to mount a custom element `<ytv-thumbnail-preview>` anchored before `#description-inline-expander`.
   - On video change, fades out the old image (240 ms), then swaps in the new `<img>` once loaded — reusing the existing `<a>` link element if present.
   - `clean()` removes all `<ytv-thumbnail-preview>` elements (called when navigating away from a watch page).

4. **Styles** (`assets/styles.css`)
   - `<ytv-thumbnail-preview>` floats right, 16:9 aspect ratio, height `12rem`.
   - Fade-in uses CSS `@starting-style` (opacity + blur + scale). Fade-out is a `ytv-fadeout` keyframe animation triggered via `data-hidden="true"`.
   - Overrides YouTube's `#snippet` max-height and suppresses the ripple effect on description click-through.

### `apps/website` — Marketing Website
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI: shadcn/ui (Radix UI primitives), lucide-react icons
- Linter/Formatter: Biome
- Key pages/components in `app/`:
  - `page.tsx` — landing page
  - `_components/` — hero, features, how-it-works, reviews, FAQ sections
  - `layout.tsx` — root layout with metadata/SEO
  - `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` — SEO utilities
- Env validation: `@t3-oss/env-nextjs` + Zod (see `lib/env.ts`)

## Workspace

pnpm workspaces. Root `pnpm-workspace.yaml` includes `apps/*`.

Each app manages its own `node_modules`, `pnpm-lock.yaml`, and scripts.

## Commands

```bash
# From repo root
pnpm install            # install all workspaces

# Chrome extension (from apps/chrome or via -F flag)
pnpm --filter chrome dev          # dev mode (Chrome)
pnpm --filter chrome build        # production build
pnpm --filter chrome zip          # package for Chrome Web Store
pnpm --filter chrome typecheck    # type check

# Website (from apps/website or via -F flag)
pnpm --filter website dev         # dev server
pnpm --filter website build       # production build
pnpm --filter website typecheck   # type check
pnpm --filter website lint        # biome check
```

## Instructions

- Use `pnpm`
- Run `pnpm typecheck` after edits (in the relevant app directory)
- Biome is used for linting/formatting in both apps — not ESLint/Prettier
