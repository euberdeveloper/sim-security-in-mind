<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import MainBar from '@/components/bars/MainBar.vue';
import MainMenu from '@/components/menus/MainMenu.vue';
import CardLayout from '@/components/layouts/CardLayout.vue';

import { syncThemeStoreWithLocalStorage } from '@/stores/theme';
import config from '@/config';

syncThemeStoreWithLocalStorage(`${config.localStoragePrefix}_theme`);

const route = useRoute();
const title = computed(() => {
  return route.meta.title ?? '';
})
</script>

<template>
  <v-app id="app">
    <MainBar />
    <MainMenu />

    <v-main>
      <CardLayout :title="title">
        <RouterView />
      </CardLayout>
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
</style>
