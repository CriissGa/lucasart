import {collections as defaults} from './portfolio';
import {getSanityContent} from '../lib/sanity.js';
import profilePortrait from '../assets/images/lucas1.webp';
import aboutPortrait from '../assets/images/lucas2.webp';
import {mergeCollections, withFallback} from '../lib/portfolio-content.js';

export async function getPortfolio(locals) {
  const content = await getSanityContent(locals);
  const collections = mergeCollections(content.collections, defaults);
  const localImages = {heroBackground: defaults[0].cover, heroFeatured: defaults[1].cover, profilePortrait, aboutPortrait};
  const siteImages = Object.fromEntries(Object.entries(localImages).map(([key, fallback]) => [key, withFallback(content.siteImages?.[key], fallback)]));
  return {collections, book: content.book, siteImages};
}
