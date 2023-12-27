import { createApp } from 'vue';
import { createPinia } from 'pinia';


import { createGtm } from '@gtm-support/vue-gtm';

import vuetify from '@/plugins/vuetify';
import { vMarkdown } from '@/directives/VMarkdown';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
    createGtm({
      id: 'GTM-KGMJMB6W',
      vueRouter: router
    }),
  );
app.use(vuetify);
app.directive('markdown', vMarkdown);

app.mount('#app');
