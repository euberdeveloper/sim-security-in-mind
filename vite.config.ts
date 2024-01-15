import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import vuetify from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';
import svgLoader from 'vite-svg-loader';
import UnheadVite from '@unhead/addons/vite';

import manifest from './manifest';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'manglers': [
            './src/views/MangleClassConstructorView.vue',
            './src/views/MangleClassIdentifierView.vue',
            './src/views/MangleClassMethodView.vue',
            './src/views/MangleTypeView.vue',
          ],
          'preferences': [
            './src/views/PreferencesView.vue'
          ],
          'not-found': [
            './src/views/NotFoundView.vue'
          ]
        },
      },
    },
  },
  plugins: [
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest,
      workbox: {
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://lifeware-java-mangler.euber.dev/assets/(?!exclude.txt)'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
            }
          }
        ]
      }
    }),
    vue(),
    vuetify({ styles: { configFile: './src/styles/vuetify-settings.scss' } }),
    svgLoader(),
    UnheadVite()
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
