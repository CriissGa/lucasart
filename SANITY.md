# Managing portfolio photos

The standalone Studio lives in `studio-lucas-art-test/` and uses project
`dlsh5m3v`, dataset `production`. Astro reads published content only; no secret
token is needed for this public dataset.

- Create one collection per category: `concerts`, `portraits`, `street`.
- Choose a cover, upload gallery photos, and drag them into the desired order.
- Create one BookHero document with exactly 10 ordered photos.
- Image descriptions are optional. The frontend uses a generic label when absent.
- Publish changes in Studio. Draft edits do not appear on the website.

Sanity is the only source for collection and photobook photos. Sections without
published content show an empty state. Original local photo folders are preserved
but are not imported by these sections.
Connection failures fail the request/build so a broken connection is visible.

Sanity images are served from its CDN with width, quality and format transforms.
The book uses portrait crops; set the image hotspot in Studio to choose its focus.

## Development and publishing

Run `npm run dev` inside `studio-lucas-art-test/` to edit the Studio locally.
Run `npm run deploy` there to publish the Studio when ready.

Start the Astro development server from the repository root using
`npm run dev -- --background`. Manage it with `npm run astro -- dev status`,
`npm run astro -- dev logs`, and `npm run astro -- dev stop`.

Development reads Sanity again on page reload. Production is static: run
`npm run build` and deploy the result to publish updated website content.
Automatic updates require a Sanity webhook connected to the hosting provider's
build hook. Configure this after choosing the website host; it is not yet set up.

Project/dataset identifiers are public and configured in `sanity.config.mjs`.
The Studio has its own configuration; update both if switching projects.
