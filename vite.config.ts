import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  /*build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'preferences': [
            './src/views/PreferencesView.vue'
          ],
          'not-found': [
            './src/views/NotFoundView.vue'
          ]
        },
      },
    },
  },*/
  plugins: [
    vue(),
    vuetify({ styles: { configFile: './src/styles/vuetify-settings.scss' } }),
    svgLoader(),
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
