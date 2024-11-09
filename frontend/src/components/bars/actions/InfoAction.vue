<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageInfoStore } from '@/stores/pageInfo';

const pageInfoStore = usePageInfoStore();
const { showInfoButton, showInfoDialog } = storeToRefs(pageInfoStore);
</script>

<template>
  <v-tooltip :text="$t('preferences.barButtons.pageInfo')" location="bottom" v-if="showInfoButton">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-information-outline" @click="showInfoDialog = true" />
    </template>
  </v-tooltip>
</template>

<style scoped>
.markdown-container {
  overflow-y: auto;
  overflow-x: auto;
}
</style>
