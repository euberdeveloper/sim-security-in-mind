import { computed, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import { syncBooleanQueryParam } from '@/compositions/syncQueryParam';

export const usePageInfoStore = defineStore('page-info', () => {
  const infoText = ref<string | null>(null);
  const showInfoButton = computed(() => !!infoText.value);
  const showInfoDialog = ref(false);

  return { infoText, showInfoButton, showInfoDialog };
});

export function syncInfoQueryParam() {
  const pageInfoStore = usePageInfoStore();
  const { showInfoDialog } = storeToRefs(pageInfoStore);
  const router = useRouter();
  const route = useRoute();

  syncBooleanQueryParam(showInfoDialog, router, route, 'pageInfo');
}
