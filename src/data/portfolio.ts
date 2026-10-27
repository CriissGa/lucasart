import type { ImageMetadata } from 'astro';

// Cambia estas rutas para editar la selección y el orden sin tocar los componentes.
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/collections/**/*.{jpeg,jpg,png,gif,webp,JPEG,JPG,PNG,GIF,WEBP}', { eager: true });
const photo = (path: string) => {
  const image = images[`/src/assets/collections/${path}`]?.default;
  if (!image) throw new Error(`No se encontró la foto: ${path}`);
  return image;
};

export const collections = [
  {
    id: 'concerts', title: 'Concerts', eyebrow: '01 / Music & stage',
    description: 'The heat, the lights, the seconds that make a show unforgettable.',
    cover: photo('concerts/DSC09979.webp'),
    photos: ['DSC09979.webp', 'DSC09894.webp', 'DSC08835.webp', 'DSC08057.webp', 'DSC07974.webp', 'DSC07593.webp', 'DSC07103.webp', 'DSC06776.webp', 'DSC06261.webp', 'DSC06186.webp', 'DSC06010.webp', 'DSC05645.webp'].map((name) => photo(`concerts/${name}`)),
  },
  {
    id: 'portraits', title: 'Portraits', eyebrow: '02 / People & presence',
    description: 'Portraits with atmosphere, personality and room to feel.',
    cover: photo('portraits/DSC03613.webp'),
    photos: ['DSC03613.webp', 'DSC03547.webp', 'DSC06152.webp', 'DSC06130.webp', 'DSC06086.webp', 'DSC05807.webp', 'DSC05603.webp', 'DSC05551.webp', 'DSC05428.webp'].map((name) => photo(`portraits/${name}`)),
  },
  {
    id: 'street', title: 'Street', eyebrow: '03 / Motion & city',
    description: 'Unscripted movement and the energy found between places.',
    cover: photo('street/IMG_9221 - Copy.webp'),
    photos: ['IMG_9221 - Copy.webp', 'IMG_9215 - Copy.webp', 'IMG_9178 - Copy.webp', 'IMG_9171 - Copy.webp', 'IMG_9161 - Copy.webp', 'IMG_9368 - Copy.webp', 'IMG_9278 - Copy.webp', 'IMG_9264 - Copy.webp', 'IMG_9259 - Copy.webp', 'IMG_9380 - Copy.webp', 'IMG_9379 - Copy.webp', 'IMG_9381 - Copy.webp'].map((name) => photo(`street/${name}`)),
  },
] as const;
