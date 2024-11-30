// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import path from 'path';

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
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@features': path.resolve('./src/components/features'),
        '@ui': path.resolve('./src/components/ui'),
        '@layout': path.resolve('./src/components/layout'),
        '@utils': path.resolve('./src/utils'),
        '@stores': path.resolve('./src/stores'),
        '@assets': path.resolve('./src/assets'),
        '@styles': path.resolve('./src/styles'),
        '@lib': path.resolve('./src/lib'),
        '@hooks': path.resolve('./src/hooks'),
        '@i18n': path.resolve('./src/i18n'),
        '@models': path.resolve('./src/models'),
        '@pages': path.resolve('./src/pages'),
        '@middleware': path.resolve('./src/middleware'),
        '@constants': path.resolve('./src/constants'),
        '@layouts': path.resolve('./src/layouts')
      }
    }
  }
});