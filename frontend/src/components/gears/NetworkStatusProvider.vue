<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useNotificationsStore } from '@/stores/notifications';
import { useNetworkStatus } from '@/compositions/networkStatus';

const { t } = useI18n({ useScope: 'global' });

const notificationsStore = useNotificationsStore();
const { notify } = notificationsStore;

const { networkStatus } = useNetworkStatus();

watch(networkStatus, (current, previous) => {
  switch (current) {
    case 'offline':
      notify(t('notifications.networkStatus.messages.error'), true);
      break;
    case 'online':
      if (previous !== 'unknown') {
        notify(t('notifications.networkStatus.messages.success'), false);
      }
      break;
  }
});
</script>

<template>
  <slot :networkStatus="networkStatus"></slot>
</template>
