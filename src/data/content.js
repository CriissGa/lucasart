import {collections as defaults} from './portfolio';
import {getSanityContent} from '../lib/sanity.js';
import profilePortrait from '../assets/images/lucas1.webp';
import aboutPortrait from '../assets/images/lucas2.webp';

const withFallback = (image, fallback) => image?.asset?._ref ? {...image, fallback} : fallback;

export async function getPortfolio() {
  const content = await getSanityContent();
  const collections = defaults.map((fallback) => {
    const published = content.collections.find((item) => item.category === fallback.id);
    if (!published) return fallback;
    return {
      ...fallback,
      title: published.title || fallback.title,
      description: published.description ?? fallback.description,
      cover: withFallback(published.cover?.asset ? published.cover : published.photos?.[0], fallback.cover),
      photos: published.photos?.length
        ? published.photos.map((image, index) => withFallback(image, fallback.photos[index % fallback.photos.length]))
        : fallback.photos,
    };
  });
  const localImages = {heroBackground: defaults[0].cover, heroFeatured: defaults[1].cover, profilePortrait, aboutPortrait};
  const siteImages = Object.fromEntries(Object.entries(localImages).map(([key, fallback]) => [key, withFallback(content.siteImages?.[key], fallback)]));
  return {collections, book: content.book, siteImages};
}
