<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import { usePageInfoStore } from '@/stores/pageInfo';

import CardDialog from '@/components/gears/CardDialog.vue';

const pageInfoStore = usePageInfoStore();
const { infoText, showInfoDialog } = storeToRefs(pageInfoStore);

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

<style lang="scss" scoped>
.markdown-container {
  overflow-y: auto;
  overflow-x: auto;

  margin-top: -0.67em;

  :deep(h1) h1 {
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }

  :deep(h2) {
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  :deep(h3) {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  :deep(p) {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  :deep(ul, ol) {
    margin-top: 1em;
    margin-bottom: 1em;
    padding-inline-start: 22px;
  }
}
</style>
