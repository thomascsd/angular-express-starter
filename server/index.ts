import Server from './server';
const server = new Server();
server.run(process.env.PORT || 3000);
