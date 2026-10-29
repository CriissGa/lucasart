# Managing portfolio photos

The standalone Studio lives in `studio-lucas-art-test/` and uses project
`dlsh5m3v`, dataset `production`. Astro reads published content only; no secret
token is needed for this public dataset.

- Create any number of collections. Enter a name, generate a unique Website URL, and publish. Existing category URLs continue working.
- Choose a cover, upload gallery photos, and drag them into the desired order.
- Create one BookHero document with exactly 10 ordered photos.
- Image descriptions are optional. The frontend uses a generic label when absent.
- Publish changes in Studio. Draft edits do not appear on the website.

Sanity is the primary source. Local WebP images provide a backup if the query or
individual CDN images fail. Empty or unpublished original categories use the
local selection; new collection drafts remain hidden until published.

Sanity images are served from its CDN with width, quality and format transforms.
The book uses portrait crops; set the image hotspot in Studio to choose its focus.

## Development and publishing

Run `npm run dev` inside `studio-lucas-art-test/` to edit the Studio locally.
Run `npm run deploy` there to publish the Studio when ready.

Start the Astro development server from the repository root using
`npm run dev -- --background`. Manage it with `npm run astro -- dev status`,
`npm run astro -- dev logs`, and `npm run astro -- dev stop`.

Production uses server rendering with `@astrojs/vercel`. GitHub pushes deploy
code to Vercel; published photos and new collections are fetched on page reload,
without another push, webhook or rebuild. One request is shared among each page's
components, never cached indefinitely between visitors. Use the Astro preset and
adapter output (`.vercel/output`), not a static `dist` override.

The existing SMTP handler is exposed through an Astro route at `/api/contact`,
using the same SMTP environment variables configured on Vercel. Verify locally
with `node scripts/test-portfolio.mjs` and `node scripts/test-contact.mjs`.

Project/dataset identifiers are public and configured in `sanity.config.mjs`.
The Studio has its own configuration; update both if switching projects.
