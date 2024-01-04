import { createI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import locales from '@/locales';

import { useLanguageStore } from '@/stores/language';
import config from '@/config';

function i18n() {
  const languageStore = useLanguageStore();
  const { languages, language } = storeToRefs(languageStore);

  const messages = languages.value.reduce<Record<string, any>>((acc, lang) => {
    acc[lang.name] = locales[lang.name];
    return acc;
  }, {});

  return createI18n({
    legacy: false,
    locale: language.value,
    fallbackLocale: config.i18n.fallbackLocale,
    messages
  });
}

export default i18n;
