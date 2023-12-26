import { computed, ref, watchEffect, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import {
  VFadeTransition,
  VScaleTransition,
  VExpandTransition,
  VSlideXTransition,
  VSlideYTransition
} from 'vuetify/components';

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const isDark = ref(theme.current.value.dark);
  const themeColors = ref({ ...theme.current.value.colors });
  const currentThemeName = computed(() => (isDark.value ? 'dark' : 'light'));
  const primaryColor = computed({
    get: () => themeColors.value.primary,
    set: (value) => (themeColors.value.primary = value)
  });
  function applyTheme() {
    theme.global.name.value = currentThemeName.value;
    theme.themes.value[currentThemeName.value].colors = themeColors.value;
  }
  function toggleDarkMode() {
    isDark.value = !isDark.value;
  }
  const darkComponents = { isDark, currentThemeName, themeColors, primaryColor, toggleDarkMode, applyTheme };

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
  const { isDark, themeColors } = storeToRefs(themeStore);
  const localTheme = localStorage.getItem(localStorageKey);

  if (localTheme) {
    themeStore.$patch(JSON.parse(localTheme));
    themeStore.applyTheme();
  }

  watchEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(themeStore.$state));
  });
  watch([isDark, themeColors], () => {
    themeStore.applyTheme();
  });
}
