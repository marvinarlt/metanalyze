import { reactive } from 'vue';
import { Socket } from 'socket.io-client';

export const socketStore = reactive({
  state: <any> {
    connection: null as Socket | null
  },

  /**
   * Set the websocket connection.
   * 
   * @param {Socket} connection
   * @returns {void}
   */
  set(connection: Socket): void {
    this.state.connection = connection;
  },

  /**
   * Get the websocket connection.
   * 
   * @returns {Socket | null}
   */
  get(): Socket | null {
    return this.state.connection;
  }
});