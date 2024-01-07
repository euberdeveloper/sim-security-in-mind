import { type NavigationGuard } from 'vue-router';

import infoTexts from '@/markdowns';
import { usePageInfoStore } from '@/stores/pageInfo';
import { useLanguageStore } from '@/stores/language';

export const infoGuard: NavigationGuard = (to, _from, next) => {
  const languageStore = useLanguageStore();

  const pageInfoStore = usePageInfoStore();
  const infoTextKey = to.meta.info ?? null;
  pageInfoStore.infoText = infoTextKey ? infoTexts[infoTextKey][languageStore.language] : null;
  next();
};
