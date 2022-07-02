import { notificationStore, Notification } from '@app/stores/notification';

export function useNotification() {

  /**
   * Add notification to store and remove after timeout.
   * 
   * @param {Notification} notification
   * @param {number} timeout
   * @returns {void}
   */
  const add = (notification: Notification, timeout: number = 5000): void => {
    let randomId = Math.random().toString(36).slice(2);

    notificationStore.add({
      id: randomId,
      ...notification
    });

    setTimeout(notificationStore.remove.bind(notificationStore), timeout);
  }

  return {
    notifications: notificationStore.state.notifications,
    remove: notificationStore.remove,
    add
  }
}