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
│   └── example-videos.tsx   # Example video suggestion cards shown when input is empty
├── chrome/
│   ├── page.tsx             # Chrome extension landing page with JSON-LD structured data
│   └── _components/
│       ├── hero-section.tsx
│       ├── features-section.tsx
│       ├── how-it-works-section.tsx
│       ├── reviews-section.tsx
│       └── faq-section.tsx
├── layout.tsx               # Root layout: fonts, metadata, NuqsAdapter, GA, Toaster
├── page.tsx                 # / route
├── opengraph-image.tsx      # Auto-generated OG image (1200×630)
├── sitemap.ts               # /sitemap.xml
└── robots.ts                # /robots.txt
lib/
├── site.ts                  # SITE_URL, SITE_NAME, SITE_DESCRIPTION, CHROME_STORE_URL
├── env.ts                   # Type-safe env vars via @t3-oss/env-nextjs
├── examples.ts              # Example video list for the URL input suggestions
└── utils.ts                 # cn() helper
```

## SEO

- Per-page `metadata` exports with canonical URLs, OpenGraph, and Twitter Card
- `opengraph-image.tsx` generates the shared OG image at build time
- `sitemap.ts` covers `/` and `/chrome`
- JSON-LD structured data (SoftwareApplication + FAQ) on `/chrome`

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
