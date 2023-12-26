<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import { useMenuStore } from '@/stores/menu';

import CardDialog from '@/components/gears/CardDialog.vue';

const menuStore = useMenuStore();
const { infoText, showInfoButton } = storeToRefs(menuStore);

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);
const dialogWIdth = computed(() => (isMobile.value ? 'auto' : 650));
</script>

<template>
  <CardDialog
    title="Informazioni pagina"
    :width="dialogWIdth"
    :fullscreen="isMobile"
    v-if="showInfoButton"
  >
    <template #activator="{ props: dialogProps }">
      <v-tooltip text="Info pagina" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="{ ...tooltipProps, ...dialogProps }" icon="mdi-information-outline" />
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
