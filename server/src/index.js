const promiseFinally = require('promise.prototype.finally');
const path = require('path');
const express = require('express');

const server = express();
const config = require('./config').general;
const app = require('./app/main.js');
const db = require('./app/db/main.js');

promiseFinally.shim();

server.get('/', (req, res) => {
  server.use(express.static(path.join(__dirname, '../public')));
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.get('/photos', async (req, res) => {
  await db.getPhotos().then((photos) => {
    res.send(JSON.stringify(photos));
  });
});

server.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))

app.start();
