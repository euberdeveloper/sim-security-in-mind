import { computed, ref, watchEffect, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useTheme, type ThemeDefinition } from 'vuetify';
import {
  VFadeTransition,
  VScaleTransition,
  VExpandTransition,
  VSlideXTransition,
  VSlideYTransition
} from 'vuetify/components';
import { getRandomColor } from '@/utils/colors';

export interface VuetifyThemeBaseColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}
export interface VuetifyThemeOnColors {
  'on-background': string;
  'on-surface': string;
  'on-primary': string;
  'on-secondary': string;
  'on-success': string;
  'on-warning': string;
  'on-error': string;
  'on-info': string;
}
export interface VuetifyThemeColors extends VuetifyThemeBaseColors, VuetifyThemeOnColors {
  [key: string]: string;
}

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const isDark = ref(theme.current.value.dark);
  const currentThemeName = computed(() => (isDark.value ? 'dark' : 'light'));
  const themes = ref<Record<string, ThemeDefinition>>({ ...theme.themes.value });
  const themeColors = computed<VuetifyThemeColors>(
    () => themes.value[currentThemeName.value].colors as VuetifyThemeColors
  );
  const primaryColor = computed({
    get: () => themeColors.value.primary,
    set: (value) => (themeColors.value.primary = value)
  });
  function toggleDarkMode() {
    isDark.value = !isDark.value;
  }
  function randomPrimaryColor() {
    primaryColor.value = getRandomColor();
  }
  function applyThemeDarkMode() {
    theme.global.name.value = currentThemeName.value;
  }
  function applyThemeColors() {
    theme.themes.value[currentThemeName.value].colors = themeColors.value;
  }
  const paletteComponents = {
    isDark,
    currentThemeName,
    themes,
    themeColors,
    primaryColor,
    toggleDarkMode,
    randomPrimaryColor,
    applyThemeDarkMode,
    applyThemeColors
  };

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

  return { ...paletteComponents, ...transitionComponents };
});

export function syncThemeStoreWithLocalStorage(localStorageKey: string) {
  const themeStore = useThemeStore();
  const { isDark, currentThemeName, themeColors } = storeToRefs(themeStore);
  const localTheme = localStorage.getItem(localStorageKey);

  if (localTheme) {
    themeStore.$patch(JSON.parse(localTheme));
    themeStore.applyThemeDarkMode();
  }

  watchEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(themeStore.$state));
  });
  watch([isDark, currentThemeName], () => {
    themeStore.applyThemeDarkMode();
  });
  watch(themeColors, () => {
    themeStore.applyThemeColors();
  });
}
