# YouTube Thumbnail Viewer

Monorepo containing a Chrome Extension and its marketing website.

## Apps

| App | Path | Description |
|---|---|---|
| Chrome Extension | `apps/chrome` | Injects thumbnails inline on YouTube watch pages |
| Website | `apps/website` | Marketing site + online thumbnail viewer tool |

## Workspace

pnpm workspaces. Root `pnpm-workspace.yaml` includes `apps/*`.

Each app manages its own `node_modules` and scripts.

## Commands

```bash
# Install all workspaces
pnpm install

# Chrome extension
pnpm --filter chrome dev          # dev mode
pnpm --filter chrome build        # production build
pnpm --filter chrome zip          # package for Chrome Web Store
pnpm --filter chrome typecheck    # type check

# Website
pnpm --filter website dev         # dev server
pnpm --filter website build       # production build
pnpm --filter website typecheck   # type check
pnpm --filter website lint        # biome check
```

## Stack

- **Monorepo**: pnpm workspaces
- **Linter/Formatter**: Biome (both apps)
- **Language**: TypeScript (both apps)
