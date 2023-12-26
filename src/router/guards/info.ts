import { type NavigationGuard } from 'vue-router';
import infoTexts from '@/markdowns';
import { useMenuStore } from '@/stores/menu';

export const infoGuard: NavigationGuard = (to, _from, next) => {
  const menuStore = useMenuStore();
  const infoTextKey = to.meta.info ?? null;
  menuStore.infoText = infoTextKey ? infoTexts[infoTextKey] : null;
  next();
};
