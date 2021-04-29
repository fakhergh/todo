const { createServer } = require('http');
require('dotenv/config');

const { app } = require('./src/app');

const port = process.env.PORT || 5000;
const server = createServer(app);

server.on('listening', () => console.log(`Server is running at port ${port}`));
server.on('error', console.log);

server.listen(port);
