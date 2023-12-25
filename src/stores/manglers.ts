import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useManglersStore = defineStore('manglers', () => {
  const type = ref('');
  const classMethod = ref('');
  const classIdentifier = ref('');
  const classConstructor = ref('');
  return { type, classMethod, classIdentifier, classConstructor };
});
