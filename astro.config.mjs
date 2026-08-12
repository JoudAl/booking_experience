// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves project sites from /<repo-name>/.
// The deploy workflow sets SITE and BASE_PATH; locally we fall back to root.
const site = process.env.SITE || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
