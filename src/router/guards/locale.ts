import { type NavigationGuard } from 'vue-router';
import { useLanguageStore } from '@/stores/language';

export const localeGuard: NavigationGuard = (to, _from, next) => {
  const languageStore = useLanguageStore();

  if (to.params.locale) {
    return next();
  }
  return next({ ...to, params: { ...to.params, locale: languageStore.language } });
};
