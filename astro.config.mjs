// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind(), react()],
  i18n: {
    defaultLocale: "pt-br",
    locales: ["pt-br", "en"],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      "en": "pt-br"
    }
  },
  vite: {
    envDir: './',
    envPrefix: [
      'PUBLIC_',
      'MONGODB_',
      'GITHUB_',
      'GOOGLE_',
      'JWT_',
    ]
  }
});