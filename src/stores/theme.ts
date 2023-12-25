import { computed, ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';
import { VFadeTransition, VScaleTransition, VExpandTransition, VSlideXTransition, VSlideYTransition } from 'vuetify/components';

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const isDark = ref(false);
  const currentTheme = computed(() => (isDark.value ? 'dark' : 'light'));
  function applyTheme() {
    theme.global.name.value = isDark.value ? 'dark' : 'light';
  }
  function toggleTheme() {
    isDark.value = !isDark.value;
  }
  const darkComponents = { isDark, currentTheme, applyTheme, toggleTheme };

  const transitionMapping = {
    VFadeTransition,
    VScaleTransition,
    VExpandTransition,
    VSlideXTransition,
    VSlideYTransition
  };
  type TransitionType = keyof typeof transitionMapping;
  const transitionNames = ref<Record<TransitionType, string>>({
    VFadeTransition: 'Fade',
    VScaleTransition: 'Scale',
    VExpandTransition: 'Expand',
    VSlideXTransition: 'Slide X',
    VSlideYTransition: 'Slide Y'
  });
  const routeTransition = ref<TransitionType>('VFadeTransition');
  function setRouteTransition(transition: TransitionType) {
    routeTransition.value = transition;
  }
  const transitionComponents = { routeTransition, transitionNames, setRouteTransition };

  return { ...darkComponents, ...transitionComponents };
});

export function syncThemeStoreWithLocalStorage(localStorageKey: string) {
  const themeStore = useThemeStore();
  const localTheme = localStorage.getItem(localStorageKey);

  if (localTheme) {
    themeStore.$patch(JSON.parse(localTheme));
  }

  watchEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(themeStore.$state));
    themeStore.applyTheme();
  });
}
