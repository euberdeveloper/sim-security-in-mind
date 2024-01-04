<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useThemeStore } from '@/stores/theme';
import { useLanguageStore } from '@/stores/language';

const themeStore = useThemeStore();
const { languages } = storeToRefs(themeStore);

const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-tooltip :text="$t('preferences.barButtons.language')" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-web" />
        </template>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="{ name, icon, label } of languages" :key="icon" @click="language = name">
        <v-list-item-title :class="{ 'font-weight-bold': language === name }">
          <v-icon class="rounded-lg" :icon="`fi:${icon}`" />
          <span class="ml-3">{{ label }}</span></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
