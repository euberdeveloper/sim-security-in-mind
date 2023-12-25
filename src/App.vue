<script setup lang="ts">
import { RouterView } from 'vue-router';

import MainBar from '@/components/bars/MainBar.vue';
import MainMenu from '@/components/menus/MainMenu.vue';

import { syncThemeStoreWithLocalStorage } from '@/stores/theme';
import config from '@/config';

syncThemeStoreWithLocalStorage(`${config.localStoragePrefix}_theme`);
</script>

<template>
  <v-app id="app">
    <MainBar />
    <MainMenu />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
</style>
