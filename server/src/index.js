const promiseFinally = require('promise.prototype.finally');
const http = require('http');
const config = require('./config').general;
const app = require('./src/main.js');

promiseFinally.shim();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, %your_name%.');
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}!`);
});

app.start();
