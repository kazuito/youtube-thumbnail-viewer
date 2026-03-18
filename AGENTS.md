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
- URL state: nuqs (`useQueryState`) — video ID is persisted as `?vid=` query param
- Env validation: `@t3-oss/env-nextjs` + Zod (see `lib/env.ts`)

#### Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Thumbnail viewer tool |
| `/chrome` | `app/chrome/page.tsx` | Chrome extension landing page |

#### Layout (`app/layout.tsx`)
- Root layout shared across all routes
- Contains the sticky header (logo + "Add to Chrome" button) and footer
- Wraps children in `NuqsAdapter` (required for `useQueryState`)
- Metadata, OpenGraph, Twitter card, and Google Analytics

#### Thumbnail viewer (`/`) — `app/_components/`
- `thumbnail-viewer.tsx` — client component; owns `?vid=` query state via `useQueryState("vid")`
- `url-input.tsx` — text input accepting YouTube URL or bare video ID; parses on change (300 ms debounce) and updates `?vid=`; Paste button reads from clipboard; shows example suggestion cards when empty
- `video-embed.tsx` — YouTube `<iframe>` embed (16:9)
- `thumbnail-gallery.tsx` — grid of all available resolutions (`maxresdefault` → `default`, plus frame thumbnails 0–3); each card hides itself via `onError` if the image doesn't exist; clicking opens full-size in a new tab

#### Chrome LP (`/chrome`) — `app/chrome/_components/`
- `hero-section.tsx`, `features-section.tsx`, `how-it-works-section.tsx`, `reviews-section.tsx`, `faq-section.tsx`
- JSON-LD structured data (SoftwareApplication + FAQ) injected via `<script>` in `chrome/page.tsx`

#### SEO utilities (`app/`)
- `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`

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
