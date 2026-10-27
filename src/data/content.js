import {collections as defaults} from './portfolio';
import {getSanityContent} from '../lib/sanity.js';

export async function getPortfolio() {
  const content = await getSanityContent();
  const collections = defaults.map((fallback) => {
    const published = content.collections.find((item) => item.category === fallback.id);
    if (!published) return fallback;
    return {
      ...fallback,
      title: published.title || fallback.title,
      description: published.description ?? fallback.description,
      cover: published.cover?.asset ? published.cover : published.photos?.[0] ?? fallback.cover,
      photos: published.photos ?? [],
    };
  });
  return {collections, book: content.book, siteImages: content.siteImages ?? {}};
}
