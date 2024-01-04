import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';
import svgLoader from 'vite-svg-loader';

import manifest from './manifest';

export default defineConfig({
  plugins: [
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest
    }),
    vue(),
    vuetify({ styles: { configFile: './src/styles/vuetify-settings.scss' } }),
    svgLoader()
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
