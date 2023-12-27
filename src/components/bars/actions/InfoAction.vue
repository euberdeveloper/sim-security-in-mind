<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const { showInfoButton, showInfoDialog } = storeToRefs(menuStore);

</script>

<template>
  <v-tooltip text="Info pagina" location="bottom" v-if="showInfoButton">
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
