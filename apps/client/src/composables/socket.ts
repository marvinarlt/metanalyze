import { io, Socket } from 'socket.io-client';
import { useNotifications } from '@app/composables/notifications';
import { socketStore } from '@app/stores/socket';

export function useSocket() {
  const {
    VITE_SOCKET_PROTOCOL,
    VITE_SOCKET_HOST,
    VITE_SOCKET_PATH
  } = import.meta.env;

  const notifications = useNotifications();
  let connection = socketStore.get();

  /**
   * Connects to the websocket server.
   * 
   * @returns {Socket}
   */
  const connect = (): Socket => {
    return io(`${ VITE_SOCKET_PROTOCOL }://${ VITE_SOCKET_HOST }`, {
      path: VITE_SOCKET_PATH
    });
  }

  if (null === connection) {
    connection = connect();

    connection.on('disconnect', () => {
      notifications.add({
        type: 'error',
        title: 'notifications.disconnected.title',
        body: 'notifications.disconnected.body'
      }, 10000);
    });

    socketStore.set(connection as Socket);
  }

  return {
    connection,
    connect
  }
}