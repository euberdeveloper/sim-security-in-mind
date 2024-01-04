import { createApp } from 'vue';
import { createPinia } from 'pinia';

import i18n from '@/plugins/i18n';

import vuetify from '@/plugins/vuetify';
import { useAnalytics } from '@/plugins/analytics';
import { vMarkdown } from '@/directives/VMarkdown';

import App from './App.vue';
import router from './router';
import config from './config';

const app = createApp(App);

app.use(createPinia());
app.use(i18n());
app.use(router);
if (config.gtag.enabled) {
  useAnalytics(app, router);
}
app.use(vuetify);
app.directive('markdown', vMarkdown);

app.mount('#app');
