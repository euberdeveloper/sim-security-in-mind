<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const { language, languages } = storeToRefs(themeStore);
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-tooltip text="Language" location="bottom">
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
