import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const usePageInfoStore = defineStore('page-info', () => {
  const infoText = ref<string | null>(null);
  const showInfoButton = computed(() => !!infoText.value);
  const showInfoDialog = ref(false);

  return { infoText, showInfoButton, showInfoDialog };
});
