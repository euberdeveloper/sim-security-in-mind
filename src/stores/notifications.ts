import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', () => {
  const showSnackbar = ref(false);
  const snackbarText = ref('');
  const snackbarFailed = ref(false);

  const snackbarColor = computed(() => {
    return snackbarFailed.value ? 'red' : 'green';
  });

  function notify(text: string, failed = false) {
    showSnackbar.value = true;
    snackbarText.value = text;
    snackbarFailed.value = failed;
  }

  return { showSnackbar, snackbarText, snackbarFailed, snackbarColor, notify };
});
