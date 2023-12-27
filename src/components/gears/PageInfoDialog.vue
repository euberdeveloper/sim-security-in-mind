<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import { useMenuStore } from '@/stores/menu';

import CardDialog from '@/components/gears/CardDialog.vue';

const menuStore = useMenuStore();
const { infoText, showInfoDialog } = storeToRefs(menuStore);

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);
const dialogWidth = computed(() => (isMobile.value ? 'auto' : 650));
</script>

<template>
  <CardDialog
    title="Page information"
    :width="dialogWidth"
    :fullscreen="isMobile"
    v-model="showInfoDialog"
  >
    <div v-markdown="infoText" class="markdown-container"></div>
  </CardDialog>
</template>

<style scoped>
.markdown-container {
  overflow-y: auto;
  overflow-x: auto;
}
</style>
