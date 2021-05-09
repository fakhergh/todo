import { Server, createServer } from 'http';

import { app } from './app';

const server: Server = createServer(app);

server.listen(app.get('port'));

server.on('listening', () =>
  console.log('Server is running at port %d', app.get('port')),
);

server.on('error', console.log);
