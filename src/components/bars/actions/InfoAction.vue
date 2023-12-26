<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';

import CardDialog from '@/components/gears/CardDialog.vue';

const menuStore = useMenuStore();
const { infoText, showInfoButton } = storeToRefs(menuStore);
</script>

<template>

  <CardDialog title="Informazioni pagina" :width="650" v-if="showInfoButton">
    <template #activator="{ props: dialogProps }">
      <v-tooltip text="Info pagina" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="{...tooltipProps, ...dialogProps}" icon="mdi-information-outline" />
        </template>
      </v-tooltip>
    </template>

    <div v-markdown="infoText" class="markdown-container"></div>
    </CardDialog>
</template>

<style scoped>
.markdown-container {
  overflow-y: auto;
  overflow-x: auto;
}
</style>