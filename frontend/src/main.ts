import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueMark } from '@eubereveloper/vuemark';

import i18n from '@/plugins/i18n';
import vuetify from '@/plugins/vuetify';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(i18n());
app.use(router);
app.use(vuetify);
app.use(VueMark);

app.mount('#app');
