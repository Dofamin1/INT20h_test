const promiseFinally = require('promise.prototype.finally');
const http = require('http');
const config = require('./config').general;
const app = require('./app/main.js');
const db = require('./app/db/main.js');

promiseFinally.shim();

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/photos') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    await db.getPhotos().then((photos) => {
      res.end(JSON.stringify(photos));
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, %your_name%.');
  }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}!`);
});

app.start();
