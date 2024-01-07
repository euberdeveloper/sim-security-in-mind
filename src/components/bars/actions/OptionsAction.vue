<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import { usePageInfoStore } from '@/stores/pageInfo';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const pageInfoStore = usePageInfoStore();
const { showInfoButton, showInfoDialog } = storeToRefs(pageInfoStore);

const themeStore = useThemeStore();
const { showPageInfo } = storeToRefs(themeStore);

const display = useDisplay();
const isMobile = computed(() => display.mobile.value);
</script>

<template>
  <v-menu :open-on-hover="!isMobile">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-dots-vertical" />
    </template>
    <v-list>
      <v-list-item
        :title="$t('preferences.title')"
        prepend-icon="mdi-tune-vertical-variant"
        :to="{ name: 'preferences' }"
      />
      <v-list-item
        :title="$t('preferences.barButtons.pageInfo')"
        prepend-icon="mdi-information-outline"
        @click="showInfoDialog = true"
        v-if="showInfoButton && !showPageInfo"
      />
    </v-list>
  </v-menu>
</template>
