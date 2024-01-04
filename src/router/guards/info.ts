import { type NavigationGuard } from 'vue-router';

import infoTexts from '@/markdowns';
import { useMenuStore } from '@/stores/menu';
import { useLanguageStore } from '@/stores/language';

export const infoGuard: NavigationGuard = (to, _from, next) => {
  const languageStore = useLanguageStore();

  const menuStore = useMenuStore();
  const infoTextKey = to.meta.info ?? null;
  menuStore.infoText = infoTextKey ? infoTexts[infoTextKey][languageStore.language] : null;
  next();
};
