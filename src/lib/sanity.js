import {sanityClient} from 'sanity:client';
import {defineQuery} from 'groq';

const contentQuery = defineQuery(`{
  "siteImages": *[_type == "siteImages"] | order(_updatedAt desc)[0]{heroBackground, heroFeatured, profilePortrait, aboutPortrait},
  "collections": *[_type == "collection"] | order(_updatedAt desc, _id asc) {
    _id, title, category, "slug": slug.current, description, cover,
    "photos": photos[defined(asset._ref)]{_key, asset, crop, hotspot, alt, title, category}
  },
  "book": *[_type == "bookHero"] | order(_updatedAt desc)[0] {
    "photos": photos[defined(asset._ref)]{_key, asset, crop, hotspot, alt, title, category}
  }
}`);

async function fetchContent() {
  try {
    return await sanityClient.fetch(contentQuery, {}, {timeout: 10000, maxRetries: 1});
  } catch (error) {
    console.warn('[Sanity] No se pudo cargar el contenido; se usarán las fotos locales.', error.message);
    return {collections: [], book: null, siteImages: null};
  }
}
// Share a request between components on this page, never between visitors.
export function getSanityContent(locals) {
  if (!locals) return fetchContent();
  return locals.sanityContent ??= fetchContent();
}

export async function getCollection(category) {
  const content = await getSanityContent();
  const matches = content.collections.filter((item) => item.category === category);
  if (matches.length > 1) {
    console.warn(`[Sanity] Multiple published collections for ${category}; using the most recently updated.`);
  }
  return matches[0];
}
