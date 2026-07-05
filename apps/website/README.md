# YouTube Thumbnail Viewer — Website

Marketing website and online thumbnail viewer tool.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui (Radix UI primitives), lucide-react icons
- **Linter/Formatter**: Biome
- **URL state**: nuqs (`useQueryState`) — video ID persisted as `?vid=` query param
- **Env validation**: `@t3-oss/env-nextjs` + Zod (`lib/env.ts`)

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Online thumbnail viewer tool |
| `/chrome` | `app/chrome/page.tsx` | Chrome extension landing page |

## Project Structure

```
app/
├── _components/
│   ├── header.tsx           # Sticky site header (logo, nav, "Add to Chrome" button)
│   ├── footer.tsx           # Site footer (copyright, GitHub, Chrome Web Store links)
│   ├── thumbnail-viewer.tsx # Client component; owns ?vid= query state
│   ├── url-input.tsx        # YouTube URL / video ID input with debounce + paste button
│   ├── thumbnail-gallery.tsx# Grid of all thumbnail resolutions; hides missing via onError
│   ├── video-embed.tsx      # YouTube <iframe> embed (16:9)
│   ├── hero-section.tsx     # Hero used on / (shared with /chrome page)
│   ├── how-to-section.tsx   # "How to download a thumbnail" steps on /
│   ├── resolutions-section.tsx # Table of all thumbnail resolutions on /
│   ├── faq-section.tsx      # Viewer tool FAQ accordion on /
│   └── example-videos.tsx   # Example video suggestion cards shown when input is empty
├── _lib/                    # / route constants: metadata, FAQ/steps/resolutions data, JSON-LD objects
├── chrome/
│   ├── page.tsx             # Chrome extension landing page with JSON-LD structured data
│   ├── _components/
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── reviews-section.tsx
│   │   └── faq-section.tsx
│   └── _lib/                # /chrome route constants: metadata, locales, FAQ/features/reviews/steps data, JSON-LD objects
├── layout.tsx               # Root layout: fonts, metadata, NuqsAdapter, GA, Toaster
├── page.tsx                 # / route
├── opengraph-image.png      # OG image (1280×800) + opengraph-image.alt.txt
├── sitemap.ts               # /sitemap.xml
└── robots.ts                # /robots.txt
components/
└── json-ld.tsx              # Generic <JsonLd data={...}> script tag renderer
lib/
├── site.ts                  # SITE_URL, SITE_NAME, SITE_DESCRIPTION, CHROME_STORE_URL
├── env.ts                   # Type-safe env vars via @t3-oss/env-nextjs
├── json-ld.ts               # buildFaqJsonLd() helper
├── examples.ts              # Example video list for the URL input suggestions
└── utils.ts                 # cn() helper
```

## SEO

- Per-page `metadata` exports with canonical URLs, OpenGraph, and Twitter Card
- `app/opengraph-image.png` is served as the shared OG image for all routes
- `sitemap.ts` covers `/` and `/chrome`
- JSON-LD structured data: WebApplication + FAQPage on `/`, SoftwareApplication + FAQPage on `/chrome`, rendered via `components/json-ld.tsx`
- `SITE_URL` is normalized (no trailing slash) in `lib/site.ts`; join paths with a leading `/`
- Route-level constants (page titles/descriptions, section data, JSON-LD objects) live in each route's `_lib/` directory, separate from components

## Commands

```bash
pnpm dev         # dev server (http://localhost:3000)
pnpm build       # production build
pnpm typecheck   # TypeScript check
pnpm lint        # Biome check
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Production URL (defaults to Vercel URL) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |
| `CHROME_STORE_RATING_VALUE` | No | Rating value for JSON-LD structured data |
| `CHROME_STORE_RATING_COUNT` | No | Rating count for JSON-LD structured data |
