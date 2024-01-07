import clipboard from 'clipboardy';
import { useI18n } from 'vue-i18n';
import { useNotificationsStore } from '@/stores/notifications';

export function useClipboard() {
  const notificationsStore = useNotificationsStore();
  const { t } = useI18n();

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await clipboard.write(text);
      notificationsStore.notify(t('notifications.clipboard.success'));
    } catch (err) {
      console.error('Error in copying to clipboard', err);
      notificationsStore.notify(t('notifications.clipboard.error'), true);
    }
  }

  return { copyToClipboard };
}
