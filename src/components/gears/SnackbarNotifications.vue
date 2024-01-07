<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '@/stores/notifications';

const { showSnackbar, snackbarText, snackbarColor } = storeToRefs(useNotificationsStore());
</script>

<template>
  <v-snackbar :color="snackbarColor" v-model="showSnackbar">
    {{ snackbarText }}
    <template #actions>
      <v-btn variant="text" @click="showSnackbar = false">{{
        $t('notifications.actions.close')
      }}</v-btn>
    </template>
  </v-snackbar>
</template>
