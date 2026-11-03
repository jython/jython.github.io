// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jython.org',
  build: {
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});