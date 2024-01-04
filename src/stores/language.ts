import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import config from '@/config';

export type SupportedLanguage = 'it' | 'en';
export interface Language {
  name: SupportedLanguage;
  icon: string;
  label: string;
}

export const useLanguageStore = defineStore('language', () => {
  const languages = ref<Language[]>([
    {
      name: 'it',
      icon: 'it',
      label: 'Italiano'
    },
    { name: 'en', icon: 'gb', label: 'English' }
  ]);
  const language = ref(
    config.i18n.defaultLocale === 'local'
      ? navigator.language.split('-')[0]
      : config.i18n.defaultLocale
  );
  const currentLanguage = computed(() => languages.value.find((l) => l.name === language.value));

  return {
    languages,
    language,
    currentLanguage
  };
});
