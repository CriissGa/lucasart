import {sanityClient} from 'sanity:client';
import {defineQuery} from 'groq';

const contentQuery = defineQuery(`{
  "siteImages": *[_type == "siteImages"] | order(_updatedAt desc)[0]{heroBackground, heroFeatured, profilePortrait, aboutPortrait},
  "collections": *[_type == "collection" && category in ["concerts", "portraits", "street"]] | order(_updatedAt desc) {
    _id, title, category, description, cover,
    "photos": photos[defined(asset._ref)]{_key, asset, crop, hotspot, alt, title, category}
  },
  "book": *[_type == "bookHero"] | order(_updatedAt desc)[0] {
    "photos": photos[defined(asset._ref)]{_key, asset, crop, hotspot, alt, title, category}
  }
}`);

// Share one request during a build; development fetches again on each page load.
let buildContent;
async function fetchContent() {
  try {
    return await sanityClient.fetch(contentQuery, {}, {timeout: 10000, maxRetries: 1});
  } catch (error) {
    console.warn('[Sanity] No se pudo cargar el contenido; se usarán las fotos locales.', error.message);
    return {collections: [], book: null, siteImages: null};
  }
}
export function getSanityContent() {
  if (import.meta.env.DEV) return fetchContent();
  return buildContent ??= fetchContent();
}

export async function getCollection(category) {
  const content = await getSanityContent();
  const matches = content.collections.filter((item) => item.category === category);
  if (matches.length > 1) {
    console.warn(`[Sanity] Multiple published collections for ${category}; using the most recently updated.`);
  }
  return matches[0];
}
