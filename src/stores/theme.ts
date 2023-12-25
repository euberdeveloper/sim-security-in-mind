import { computed, ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';

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

  return { isDark, currentTheme, applyTheme, toggleTheme };
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
