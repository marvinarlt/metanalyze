import { reactive } from 'vue';

export type Notification = {
  id?: string,
  type: 'info' | 'success' | 'warning' | 'error',
  title: string,
  body: string,
}

export const notificationStore = reactive({
  state: <any> {
    notifications: [] as Notification[]
  },

  /**
   * Add a notification to the stack.
   * 
   * @param {Notification} notification 
   * @returns {void} 
   */
  add(notification: Notification): void {
    this.state.notifications.unshift(notification);
  },

  /**
   * Removes the first notification item from the stack.
   * 
   * @returns {Notification | undefined}
   */
  remove(): Notification | undefined {
    return this.state.notifications.pop();
  }
});