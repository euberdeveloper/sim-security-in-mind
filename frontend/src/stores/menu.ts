import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const showMenu = ref(true);
  function toggleMenu() {
    showMenu.value = !showMenu.value;
  }

  return { showMenu, toggleMenu };
});
