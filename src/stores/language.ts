import { ref } from 'vue';
import { defineStore } from 'pinia';

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
