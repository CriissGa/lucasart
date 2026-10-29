export function collectionPath(collection) {
  const value = collection.slug || collection.category || collection.title || '';
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const withFallback = (image, fallback) => image?.asset?._ref ? {...image, fallback} : fallback;

export function mergeCollections(published, defaults) {
  const byPath = new Map();
  for (const item of published) {
    if (item._id?.startsWith('drafts.') || item._id?.startsWith('versions.')) continue;
    const id = collectionPath(item);
    if (id && !byPath.has(id)) byPath.set(id, item);
  }
  const ids = [...defaults.map((item) => item.id), ...[...byPath.keys()].filter((id) => !defaults.some((item) => item.id === id))];
  return ids.map((id, index) => {
    const fallback = defaults.find((item) => item.id === id);
    const item = byPath.get(id);
    if (!item) return fallback;
    const local = fallback ?? defaults[0];
    return {
      id, title: item.title || fallback?.title || id,
      description: item.description ?? fallback?.description ?? '',
      eyebrow: fallback?.eyebrow ?? `${String(index + 1).padStart(2, '0')} / ${item.title || id}`,
      cover: withFallback(item.cover?.asset ? item.cover : item.photos?.[0], local.cover),
      photos: item.photos?.length
        ? item.photos.map((image, i) => withFallback(image, local.photos[i % local.photos.length]))
        : local.photos,
    };
  });
}
