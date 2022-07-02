import { notificationStore } from '@app/stores/notification';

export function useNotifications() {
  return {
    state: notificationStore.state,
    add: notificationStore.add,
    remove: notificationStore.remove
  }
}