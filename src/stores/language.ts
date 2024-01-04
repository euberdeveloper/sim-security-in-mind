import { ref, watchEffect, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import config from '@/config';

export type SupportedLanguage = 'it' | 'en';

export const useLanguageStore = defineStore('language', () => {
  const supportedLanguages = ref<SupportedLanguage[]>(['it', 'en']);

  const language = ref(
    config.i18n.defaultLocale === 'local'
      ? navigator.language.split('-')[0]
      : config.i18n.defaultLocale
  );

  return {
    supportedLanguages,
    language
  };
});

export function syncLanguage() {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);

  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n({ useScope: 'global' });

  watch(language, () => {
    i18n.locale.value = language.value;
    router.push({ params: { locale: language.value } });
  });
  watchEffect(() => {
    if (route.params.locale) {
      language.value = route.params.locale as SupportedLanguage;
    }
  });
}
