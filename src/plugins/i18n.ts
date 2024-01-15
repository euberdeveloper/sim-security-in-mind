import { createI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import locales from '@/locales';

import { useLanguageStore } from '@/stores/language';
import config from '@/config';

export let i18n: ReturnType<typeof createI18n>;

function setupI18n() {
  const languageStore = useLanguageStore();
  const { supportedLanguages, language } = storeToRefs(languageStore);

  const messages = supportedLanguages.value.reduce<Record<string, any>>((acc, lang) => {
    acc[lang] = locales[lang];
    return acc;
  }, {});

  i18n = createI18n({
    legacy: false,
    locale: language.value,
    fallbackLocale: config.i18n.fallbackLocale,
    messages
  });

  return i18n;
}

export default setupI18n;
