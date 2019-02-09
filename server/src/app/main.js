
const flickr = require('../api/flickr.js');
const firebase = require('../api/firebase.js');
const facepp = require('../api/facepp.js')(firebase);

flickr.getAllPhotos()
  .then((photos) => {
    facepp.analyzePhotos(photos);
  })
  .catch(e => console.log(e));

const start = () => {
  console.log('afd');
};

module.exports = { start };
