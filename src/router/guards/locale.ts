import { type NavigationGuard } from 'vue-router';
import { useLanguageStore, type SupportedLanguage } from '@/stores/language';

export const localeGuard: NavigationGuard = (to) => {
  const languageStore = useLanguageStore();

  if (to.params.locale) {
    languageStore.language = to.params.locale as SupportedLanguage;
  }
  else {
    return { ...to, params: { ...to.params, locale: languageStore.language } };
  }
};
