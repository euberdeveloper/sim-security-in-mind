import { computed, ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRoute , useRouter} from 'vue-router';

export const usePageInfoStore = defineStore('page-info', () => {
  const infoText = ref<string | null>(null);
  const showInfoButton = computed(() => !!infoText.value);
  const showInfoDialog = ref(false);

  return { infoText, showInfoButton, showInfoDialog };
});


export function syncInfoQueryParam() {
  const pageInfoStore = usePageInfoStore();
  const {showInfoButton,
    showInfoDialog} = storeToRefs(pageInfoStore);

  const router = useRouter();
  const route = useRoute();

  watch([showInfoButton, () => route.query.pageInfo], () => {
    showInfoDialog.value = showInfoButton && route.query.pageInfo === 'true';
  });

  watch(showInfoDialog, (value) => {
    if (value) {
      router.replace({ query: { ...route.query, pageInfo: 'true' } });
    }
    else {
      router.replace({ query: { ...route.query, pageInfo: undefined } });
    }
  });
}