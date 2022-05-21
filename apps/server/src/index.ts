import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const { ENVIRONMENT, HOST_DEVELOPMENT, HOST_PRODUCTION, HOST_PORT, HOST_NAME } = process.env;

const serverConfig = {
  cors: {
    origin: ENVIRONMENT === 'development' ? HOST_DEVELOPMENT : HOST_PRODUCTION,
    methods: ['GET', 'POST']
  }
};

const httpServer = createServer();
const ioServer = new Server(httpServer, serverConfig);

ioServer.on('connection', () => console.log('Client connected'));
httpServer.listen(HOST_PORT, () => console.log(`Server is running on ${ HOST_NAME }:${ HOST_PORT }`));