const http = require('http');
const app = require('./app');
const { port } = require('./config');
const logger = require('./utilities/winston');

const server = http.createServer(app);

server.listen(port, (error) => {
    logger.put('info',`Server listening on port ${port}`);
});