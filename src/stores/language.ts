import { ref, watchEffect } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

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

  const i18n = useI18n({ useScope: 'global' });

  watchEffect(() => {
    i18n.locale.value = language.value;
  });
}
