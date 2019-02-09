const crypto = require('crypto');
const mongoose = require('mongoose');

const hash = crypto.createHash('sha1');
const config = require('../config').db;

mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=${config.database}&w=1`, { useNewUrlParser: true }).then(() => {
  console.log('Connected to Database');
  // TODO: create production and development enviroments
  mongoose.set('debug', true); // turn on debug
}).catch((err) => {
  console.log('Not Connected to Database ERROR! ', err);
});

const db = {
  savePhotos: (photos) => {
    console.log('saved', photos);
    const myHash = hash.update('fasfasdf', 'utf-8').digest('hex');
  },
};

module.exports = db;
