import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useManglersStore = defineStore('manglers', () => {
  const type = ref<string | null>(null);
  const classMethod = ref<string | null>(null);
  const classIdentifier = ref<string | null>(null);
  const classConstructor = ref<string | null>(null);
  return { type, classMethod, classIdentifier, classConstructor };
});
