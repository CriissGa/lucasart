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
    cover: photo('concerts/DSC09979.jpg'),
    photos: ['DSC09979.jpg', 'DSC09894.jpg', 'DSC08835.jpg', 'DSC08057.jpg', 'DSC07974.jpg', 'DSC07593.jpg', 'DSC07103.jpg', 'DSC06776.jpg', 'DSC06261.jpg', 'DSC06186.jpg', 'DSC06010.jpg', 'DSC05645.jpg'].map((name) => photo(`concerts/${name}`)),
  },
  {
    id: 'portraits', title: 'Portraits', eyebrow: '02 / People & presence',
    description: 'Portraits with atmosphere, personality and room to feel.',
    cover: photo('portraits/DSC03613.jpg'),
    photos: ['DSC03613.jpg', 'DSC03577.jpg', 'DSC03547.jpg', 'DSC03826.jpg', 'DSC06152.jpg', 'DSC06130.jpg', 'DSC06086.jpg', 'DSC05957.jpg', 'DSC05807.jpg', 'DSC05603.jpg', 'DSC05551.jpg', 'DSC05428.jpg'].map((name) => photo(`portraits/${name}`)),
  },
  {
    id: 'street', title: 'Street', eyebrow: '03 / Motion & city',
    description: 'Unscripted movement and the energy found between places.',
    cover: photo('street/IMG_9221 - Copy.jpg'),
    photos: ['IMG_9221 - Copy.jpg', 'IMG_9215 - Copy.jpg', 'IMG_9178 - Copy.jpg', 'IMG_9171 - Copy.jpg', 'IMG_9161 - Copy.jpg', 'IMG_9368 - Copy.jpg', 'IMG_9278 - Copy.jpg', 'IMG_9264 - Copy.jpg', 'IMG_9259 - Copy.jpg', 'IMG_9380 - Copy.jpg', 'IMG_9379 - Copy.jpg', 'IMG_9381 - Copy.jpg'].map((name) => photo(`street/${name}`)),
  },
] as const;
