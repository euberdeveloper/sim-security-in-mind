import { createApp } from 'vue';
import { createPinia } from 'pinia';

import vuetify from '@/plugins/vuetify';
import { useAnalytics } from '@/plugins/analytics';
import { vMarkdown } from '@/directives/VMarkdown';

import '@/plugins/flags';

import App from './App.vue';
import router from './router';
import config from './config';

const app = createApp(App);

app.use(createPinia());
app.use(router);
if (config.gtag.enabled) {
  useAnalytics(app, router);
}
app.use(vuetify);
app.directive('markdown', vMarkdown);

app.mount('#app');
