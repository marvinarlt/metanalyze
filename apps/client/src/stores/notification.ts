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
   * @param {number} timeout
   * @returns {void} 
   */
  add(notification: Notification, timeout: number = 5000): void {
    let randomId = Math.random().toString(36).slice(2);

    this.state.notifications.unshift({
      id: randomId,
      ...notification
    });
    
    setTimeout(this.remove.bind(this), timeout);
  },

  /**
   * Removes the first notification item from the stack.
   * 
   * @param {string} randomId
   * @returns {Notification | undefined}
   */
  remove(): Notification | undefined {
    return this.state.notifications.pop();
  }
});