// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import { sanitySettings } from './sanity.config.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [sanity(sanitySettings)],
  vite: {
    plugins: [tailwindcss()]
  }
});
