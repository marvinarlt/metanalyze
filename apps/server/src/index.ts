import { createServer } from 'http';
import { Server } from 'socket.io';
import events from '@app/configs/events';
import socketConfig from '@app/configs/socket';

const { SERVER_HOST_NAME, SERVER_HOST_PORT } = process.env;
const httpServer = createServer();
const ioServer = new Server(httpServer, socketConfig);

ioServer.on('connection', (socket) => {
  for (const [ event, handler ] of Object.entries(events)) {
    socket.on(event, handler.bind(socket, socket));
  }
});

httpServer.listen(SERVER_HOST_PORT, () => {
  console.log(`Server is running on ${ SERVER_HOST_NAME }:${ SERVER_HOST_PORT }`);
});