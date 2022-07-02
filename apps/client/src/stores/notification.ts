import { reactive } from 'vue';

export type Notification = {
  type: 'info' | 'success' | 'warning' | 'error',
  title: string,
  body: string,
}

export type Notifications = {
  [id: string]: Notification
}

export const notificationStore = reactive({
  state: <any> {
    notifications: {}
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

    this.state.notifications = {
      [randomId]: notification,
      ...this.state.notifications
    };
    
    setTimeout(this.remove.bind(this, randomId), timeout);
  },

  /**
   * Removes the first notification item from the stack.
   * 
   * @param {string} randomId
   * @returns {void}
   */
  remove(randomId: string): void {
    delete this.state.notifications[randomId];
  }
});