import { createApp } from 'vue';
import { createPinia } from 'pinia';


import VueGtag from "vue-gtag";

import vuetify from '@/plugins/vuetify';
import { vMarkdown } from '@/directives/VMarkdown';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGtag, {
    config: { id: "G-B5PQ10HS0B" }
}, router);
app.use(vuetify);
app.directive('markdown', vMarkdown);

app.mount('#app');
