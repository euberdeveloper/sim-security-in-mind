<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useThemeStore } from '@/stores/theme';

const { locale } = useI18n({ useScope: 'global' });

const themeStore = useThemeStore();
const { languages } = storeToRefs(themeStore);

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
      <v-list-item v-for="{ name, icon, label } of languages" :key="icon" @click="locale = name">
        <v-list-item-title :class="{ 'font-weight-bold': locale === name }">
          <v-icon class="rounded-lg" :icon="`fi:${icon}`" />
          <span class="ml-3">{{ label }}</span></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
