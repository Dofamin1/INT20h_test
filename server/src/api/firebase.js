const fb = require('firebase');
const crypto = require('crypto');

const hash = crypto.createHash('sha1');
const config = require('../config').firebase;

// http://51.68.215.200:
const firebase = {
  savePhotos: (photos) => {
    console.log('saved', photos);
    const myHash = hash.update('fasfasdf', 'utf-8').digest('hex');
  },
};

module.exports = firebase;
