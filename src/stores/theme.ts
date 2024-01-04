import { computed, ref, watchEffect, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useTheme, useDisplay, type ThemeDefinition } from 'vuetify';
import {
  VFadeTransition,
  VScaleTransition,
  VExpandTransition,
  VSlideXTransition,
  VSlideYTransition
} from 'vuetify/components';
import { useI18n } from 'vue-i18n';

import { useLanguageStore } from '@/stores/language';

import { getRandomColor } from '@/utils/colors';
import { download } from '@/utils/download';

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

function cloneTheme(theme: ThemeDefinition): ThemeDefinition {
  return { ...theme, colors: { ...theme.colors } };
}
function cloneThemes(theme: Record<string, ThemeDefinition>): Record<string, ThemeDefinition> {
  return {
    ...theme,
    light: cloneTheme(theme.light),
    dark: cloneTheme(theme.dark)
  };
}

export interface Language {
  name: string;
  icon: string;
  label: string;
}

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();
  const display = useDisplay();
  const i18n = useI18n();
  const languageStore = useLanguageStore();

  const isDark = ref(theme.current.value.dark);
  const currentThemeName = computed(() => (isDark.value ? 'dark' : 'light'));
  const defaultThemes = ref<Record<string, ThemeDefinition>>(cloneThemes(theme.themes.value));
  const themes = ref<Record<string, ThemeDefinition>>(theme.themes.value);
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
  function resetCurrentTheme() {
    themes.value[currentThemeName.value] = cloneTheme(defaultThemes.value[currentThemeName.value]);
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
    resetCurrentTheme,
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
  const transitionNames = computed<Record<TransitionType, string>>(() => ({
    VFadeTransition: i18n.t('preferences.transitions.fade'),
    VScaleTransition: i18n.t('preferences.transitions.scale'),
    VExpandTransition: i18n.t('preferences.transitions.expand'),
    VSlideXTransition: i18n.t('preferences.transitions.slideX'),
    VSlideYTransition: i18n.t('preferences.transitions.slideY')
  }));
  const transitionSelectItems = computed(() =>
    Object.entries(transitionNames.value).map(([key, value]) => ({ title: value, value: key }))
  );
  const routeTransition = ref<TransitionType>('VFadeTransition');
  function setRouteTransition(transition: TransitionType) {
    routeTransition.value = transition;
  }
  const transitionComponents = {
    routeTransition,
    transitionNames,
    transitionSelectItems,
    setRouteTransition
  };

  const barButtonNames = ref<Record<string, string>>({
    darkMode: 'Dark Mode',
    primaryColor: 'Primary Color',
    routeTransition: 'Route Transition',
    pageInfo: 'Page Info',
    language: 'Language'
  });
  const defaultShownBarButtons = () =>
    display.mobile.value
      ? ['darkMode', 'pageInfo', 'language']
      : ['darkMode', 'primaryColor', 'routeTransition', 'pageInfo', 'language'];
  const shownBarButtons = ref<string[]>(defaultShownBarButtons());
  function resetShownBarButtons() {
    shownBarButtons.value = defaultShownBarButtons();
  }
  const showDarkMode = computed(() => shownBarButtons.value.includes('darkMode'));
  const showPrimaryColor = computed(() => shownBarButtons.value.includes('primaryColor'));
  const showRouteTransition = computed(() => shownBarButtons.value.includes('routeTransition'));
  const showPageInfo = computed(() => shownBarButtons.value.includes('pageInfo'));
  const showLanguage = computed(() => shownBarButtons.value.includes('language'));
  const barButtonsComponents = {
    barButtonNames,
    shownBarButtons,
    resetShownBarButtons,
    showDarkMode,
    showPrimaryColor,
    showRouteTransition,
    showPageInfo,
    showLanguage
  };

  const languages = computed<Language[]>(() => [
    {
      name: 'it',
      icon: 'it',
      label: i18n.t('preferences.language.it')
    },
    {
      name: 'en',
      icon: 'gb',
      label: i18n.t('preferences.language.en')
    }
  ]);
  const currentLanguage = computed(() =>
    languages.value.find((l) => l.name === languageStore.language.value)
  );
  const languageComponents = {
    languages,
    currentLanguage
  };

  return {
    ...paletteComponents,
    ...transitionComponents,
    ...barButtonsComponents,
    ...languageComponents
  };
});

export function syncThemeStoreWithLocalStorage(localStorageKey: string) {
  const themeStore = useThemeStore();
  const { isDark, currentThemeName, themes, themeColors } = storeToRefs(themeStore);
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
  watch([themes, themeColors], () => {
    themeStore.applyThemeColors();
  });
}

export function exportPreferences() {
  const themeStore = useThemeStore();
  const serializedState = JSON.stringify(themeStore.$state);
  const blob = new Blob([serializedState], { type: 'application/json' });
  download(blob, 'preferences.json');
}

export function importPreferences(fileList: FileList | null) {
  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const jsonPreferences = JSON.parse(reader.result as string);
      const themeStore = useThemeStore();
      themeStore.$patch(jsonPreferences);
      themeStore.applyThemeDarkMode();
    };
  }
}
