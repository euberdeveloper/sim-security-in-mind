<script setup lang="ts">
import { computed } from 'vue';

import { useDisplay } from 'vuetify';
import { useMenuStore } from '@/stores/menu';

import DarkModeAction from './actions/DarkModeAction.vue';
import ThemePrimaryColorAction from './actions/ThemePrimaryColorAction.vue';
import TransitionAction from './actions/TransitionAction.vue';
import InfoAction from './actions/InfoAction.vue';
import OptionsAction from './actions/OptionsAction.vue';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);
const title = computed(() => (isMobile.value ? 'LwJavaMangle' : 'Lifeware Java Mangler'));
</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template #append>
      <DarkModeAction />
      <ThemePrimaryColorAction />
      <TransitionAction />
      <InfoAction />
      <OptionsAction />
    </template>
  </v-app-bar>
</template>
