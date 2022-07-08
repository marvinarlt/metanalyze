import { io, Socket } from 'socket.io-client';
import { useNotification } from '@app/composables/notification';
import { socketStore } from '@app/stores/socket';
import events from '@app/configs/events';
import emits from '@app/configs/emits';

export function useSocket() {
  const {
    VITE_SOCKET_PROTOCOL,
    VITE_SOCKET_HOST,
    VITE_SOCKET_PATH
  } = import.meta.env;

  const notifications = useNotification();
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

    connection.on(events.DISCONNECT, () => {
      notifications.add({
        type: 'error',
        title: 'notifications.disconnected.title',
        body: 'notifications.disconnected.body'
      }, 10000);
    });

    socketStore.set(connection as Socket);
  }

  return {
    events,
    emits,
    connection,
    connect
  }
}