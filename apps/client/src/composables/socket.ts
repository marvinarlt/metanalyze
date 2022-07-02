import { io } from 'socket.io-client';
import { useNotifications } from '@app/composables/notifications';

export function useSocket() {
  const {
    VITE_SOCKET_PROTOCOL,
    VITE_SOCKET_HOST,
    VITE_SOCKET_PATH
  } = import.meta.env;

  const notifications = useNotifications();
  let connection = null;

  /**
   * Connects to the websocket server.
   * 
   * @returns {void}
   */
  const connect = (): void => {
    connection = io(`${ VITE_SOCKET_PROTOCOL }://${ VITE_SOCKET_HOST }`, {
      path: VITE_SOCKET_PATH
    });

    connection.on('disconnect', () => {
      notifications.add({
        type: 'error',
        title: 'notifications.disconnected.title',
        body: 'notifications.disconnected.body'
      }, 10000);
    });
  }

  return {
    connect,
    connection
  }
}