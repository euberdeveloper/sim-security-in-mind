import { ref, onMounted, onUnmounted } from 'vue';

import config from '@/config';

export type NetworkStatus = 'online' | 'offline' | 'unknown';

export function useNetworkStatus(
  pingUrl = config.networkMonitoring.uncachedUrl,
  milliseconds = config.networkMonitoring.interval
) {
  const networkStatus = ref<NetworkStatus>('unknown');
  let detectionInProgress = false;

  async function handleConnection() {
    if (!detectionInProgress) {
      try {
        detectionInProgress = true;
        const answer = await fetch(pingUrl, {
          cache: 'no-store',
          redirect: 'manual'
        });
        networkStatus.value = answer.ok ? 'online' : 'offline';
      } catch (error) {
        networkStatus.value = 'offline';
      } finally {
        detectionInProgress = false;
      }
    }
  }

  let interval: undefined | NodeJS.Timeout = undefined;
  onMounted(() => {
    handleConnection();
    interval = setInterval(handleConnection, milliseconds);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });

  return { networkStatus };
}
