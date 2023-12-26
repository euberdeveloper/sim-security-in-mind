import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const showMenu = ref(true);
  function toggleMenu() {
    showMenu.value = !showMenu.value;
  }

  const infoText = ref<string | null>(null);
  const showInfo = ref(false);
  const showInfoButton = computed(() => !!infoText.value);

  return { showMenu, toggleMenu, infoText, showInfo, showInfoButton };
});
