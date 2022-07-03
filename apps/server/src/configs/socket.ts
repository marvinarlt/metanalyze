const { SERVER_HOST_PATH, CLIENT_HOST_PROTOCOL, CLIENT_HOST_NAME } = process.env;

export default {
  path: SERVER_HOST_PATH,
  cors: {
    origin: `${ CLIENT_HOST_PROTOCOL }://${ CLIENT_HOST_NAME }`,
    methods: ['GET', 'POST'],
    credentials: true
  }
}