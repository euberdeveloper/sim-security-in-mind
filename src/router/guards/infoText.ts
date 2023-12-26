import { type NavigationGuard } from 'vue-router';
import { useMenuStore } from '@/stores/menu';

export const infoTextGuard: NavigationGuard = (to, _from, next) => {
    const menuStore = useMenuStore();
    menuStore.infoText = to.meta.infoText ?? null;
  next();
}