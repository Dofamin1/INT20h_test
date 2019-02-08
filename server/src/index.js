const promiseFinally = require('promise.prototype.finally');
const express = require('express');
const faceAnalyzer = require('./services/facepp.js');

const app = express();
const port = 3000;

promiseFinally.shim();

faceAnalyzer.getPhotosInfo();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
