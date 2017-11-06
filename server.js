const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

connect();

const server = http.createServer(app.callback());
const port = process.env.PORT || 3000;

server.listen(port, () => {
    // eslint-disable-next-line
    console.log('server is running on: ', server.address().port);
});