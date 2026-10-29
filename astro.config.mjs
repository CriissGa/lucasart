// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import { sanitySettings } from './sanity.config.mjs';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [sanity(sanitySettings)],
  vite: {
    plugins: [tailwindcss()]
  }
});
