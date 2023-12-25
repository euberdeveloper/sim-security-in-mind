import clipboard from 'clipboardy';
import { useNotificationsStore } from '@/stores/notifications';

export function useClipboard() {
  const notificationsStore = useNotificationsStore();

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await clipboard.write(text);
      notificationsStore.notify('Text copied to clipboard');
    } catch (err) {
      console.error('Error in copying to clipboard', err);
      notificationsStore.notify('Failed to copy to clipboard', true);
    }
  }

  return { copyToClipboard };
}
