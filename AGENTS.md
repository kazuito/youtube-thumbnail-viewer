# YouTube Thumbnail Viewer

Monorepo containing the Chrome extension and its marketing website.

## Workspace

- Package manager: `pnpm`
- Workspace pattern: `apps/*`
- Main apps:
  - `apps/chrome`: WXT-based browser extension
  - `apps/website`: Next.js 16 marketing site and online thumbnail viewer

## Documentation Layout

- Root `README.md` is a symlink to `apps/chrome/README.md`
- Chrome extension docs live in `apps/chrome/README.md`
- Website docs live in `apps/website/README.md`
- Keep these docs aligned with code changes when behavior, scripts, or structure changes

## `apps/chrome`

- Framework: [WXT](https://wxt.dev/)
- Language: TypeScript
- Styling: injected CSS in `assets/styles.css`
- Linter/Formatter: Biome
- Runtime: content script on `https://www.youtube.com/*`

### Behavior

- Injects a clickable thumbnail into the YouTube watch page description area
- Only acts on `/watch*` pages
- Handles YouTube SPA navigation via `wxt:locationchange`
- Resolves thumbnails from `img.youtube.com` with `HEAD` requests

### Important Files

- `entrypoints/content.ts`: content script entrypoint
- `lib/inject.ts`: DOM mount, image swap, cleanup
- `lib/youtube.ts`: video ID parsing and thumbnail URL resolution
- `assets/styles.css`: injected styles and YouTube-specific overrides
- `wxt.config.ts`: WXT config, manifest, and dev browser settings

## `apps/website`

- Framework: Next.js 16 App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI: shadcn/ui primitives with `lucide-react`
- URL state: `nuqs`
- Env validation: `@t3-oss/env-nextjs` with Zod

### Main Routes

- `/`: thumbnail viewer tool
- `/chrome`: Chrome extension landing page

### Important Files

- `app/layout.tsx`: shared layout, metadata, analytics, header/footer
- `app/page.tsx`: viewer page
- `app/chrome/page.tsx`: landing page and JSON-LD
- `app/_components/thumbnail-viewer.tsx`: client-side viewer state
- `app/_components/url-input.tsx`: YouTube URL and video ID input handling
- `app/_components/thumbnail-gallery.tsx`: thumbnail variant grid
- `lib/env.ts`: typed environment variables
- `lib/site.ts`: site constants

## Commands

From the repo root:

```bash
pnpm install
pnpm --filter chrome dev
pnpm --filter chrome build
pnpm --filter chrome zip
pnpm --filter chrome typecheck
pnpm --filter website dev
pnpm --filter website build
pnpm --filter website typecheck
pnpm --filter website lint
```

You can also run app-local scripts from inside each app directory.

## Working Rules

- Use `pnpm`
- Run `pnpm typecheck` in the relevant app after edits
- Use Biome, not ESLint or Prettier, for formatting and linting workflows
- Prefer updating the app-specific README when changing app behavior
- Be careful with generated output under `apps/chrome/.output`, `apps/chrome/.wxt`, and `apps/website/.next`
