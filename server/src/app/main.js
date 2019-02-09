const db = require('./db/main.js');
const facepp = require('../api/facepp.js')(db);
const flickr = require('../api/flickr.js');

flickr.getAllPhotos()
  .then((photos) => {
    facepp.analyzePhotos(photos);
  })
  .catch(e => console.log(e));

const start = () => {
  console.log('afd');
};

module.exports = { start };

