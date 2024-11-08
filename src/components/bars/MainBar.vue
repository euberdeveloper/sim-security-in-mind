<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';

import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';

import NetworkStatusProvider from '@/components/gears/NetworkStatusProvider.vue';

import DarkModeAction from './actions/DarkModeAction.vue';
import ThemePrimaryColorAction from './actions/ThemePrimaryColorAction.vue';
import TransitionAction from './actions/TransitionAction.vue';
import InfoAction from './actions/InfoAction.vue';
import OptionsAction from './actions/OptionsAction.vue';
import LanguageAction from './actions/LanguageAction.vue';
import NetworkStatusAction from './actions/NetworkStatusAction.vue';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;

const themeStore = useThemeStore();
const {
  showDarkMode,
  showPrimaryColor,
  showRouteTransition,
  showNetwork,
  showPageInfo,
  showLanguage
} = storeToRefs(themeStore);

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);
const title = computed(() => (isMobile.value ? 'SIM' : 'SIM - Security in Mind'));
</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template #append>
      <DarkModeAction v-if="showDarkMode" />
      <ThemePrimaryColorAction v-if="showPrimaryColor" />
      <TransitionAction v-if="showRouteTransition" />
      <InfoAction v-if="showPageInfo" />
      <LanguageAction v-if="showLanguage" />
      <!-- <NetworkStatusProvider>
        <template #default="{ networkStatus }">
          <NetworkStatusAction :network-status="networkStatus" v-if="showNetwork" />
          <OptionsAction :network-status="networkStatus" />
        </template>
      </NetworkStatusProvider> -->
    </template>
  </v-app-bar>
</template>
