# Feed Blocker

A browser extension that hides the distracting parts of YouTube, Instagram and Facebook — recommended feeds, Shorts, stories, comments — so you can use the sites for what you actually came for.

Everything is toggleable per rule from the popup, and changes apply live without reloading the page.

## What it hides

| Site | Rules |
| --- | --- |
| YouTube | Home: recommended videos, Shorts shelf, filter chips · Video page: comments, suggestions |
| Instagram | Home: feed, stories |
| Facebook | Home: news feed, stories |

All rules are on by default and apply only on the relevant pages (e.g. the home page), so search, profiles, messages and the video player keep working.

## Install (from source)

Requires [Bun](https://bun.sh) (or Node.js).

```bash
bun install
bun run build
```

Then open `chrome://extensions`, enable **Developer mode**, click **Load unpacked** and select `output/chrome-mv3`.

For Firefox use `bun run build:firefox`.

## Development

```bash
bun run dev           # dev mode with hot reload (Chrome)
bun run dev:firefox   # same for Firefox
bun run check         # type-check Svelte/TS
bun run zip           # package for the store
```

Built with [WXT](https://wxt.dev), Svelte 5 and TypeScript.

## Adding a rule

Rules live in `src/lib/rules/<site>.ts`. A rule is a plain object:

```ts
{
  id: 'youtube.watch-comments',   // unique, used as the storage key
  site: 'youtube',
  label: 'Video: comments',
  default: true,
  when: (url) => url.pathname === '/watch',
  hide: ['ytd-comments'],         // CSS selectors set to display: none
}
```

For a new site, add it to `src/lib/sites.ts`, create a rules file and register it in `src/lib/rules/index.ts`.

## Limitations

Rules rely on CSS selectors, so they can break when a site changes its markup. Instagram and Facebook use obfuscated class names, so their rules target stable attributes (`data-pagelet`, `aria-label`) and may need updating. Instagram selectors are unverified against the live site.
