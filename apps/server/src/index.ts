import { createServer } from 'http';
import { Server } from 'socket.io';

const {
  MODE,
  SERVER_HOST_NAME,
  SERVER_HOST_PORT,
  SERVER_HOST_PATH,
  CLIENT_HOST_PROTOCOL,
  CLIENT_HOST_NAME
} = process.env;

const httpServer = createServer();
const ioServer = new Server(httpServer, {
  path: SERVER_HOST_PATH,
  cors: {
    origin: `${ CLIENT_HOST_PROTOCOL }://${ CLIENT_HOST_NAME }`,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

ioServer.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('url:start', (data) => {
    console.log(data);
  });
});

httpServer.listen(SERVER_HOST_PORT, () => {
  console.log(`Server is running on ${ SERVER_HOST_NAME }:${ SERVER_HOST_PORT }`);
});