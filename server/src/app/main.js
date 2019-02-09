const db = require('./db/main.js');
const { reqFrequency } = require('../config').flickr;
const { getPhotoId } = require('../helpers.js');
const facepp = require('../api/facepp.js')(db);
const flickr = require('../api/flickr.js');

const mongodbPhotosIDList = [];

const fetchFlickrPhotos = async () => flickr.fetchAllPhotos();
const photoIsNew = photo => mongodbPhotosIDList.indexOf(getPhotoId(photo)) === -1;

const fetchPhotosFromMongodb = async () => {
  await db.getPhotos().then((photos) => {
    const photosIds = photos.map(photo => getPhotoId(photo));
    mongodbPhotosIDList.push(...photosIds);
  });
};

const fetchNewPhotos = async () => {
  await fetchFlickrPhotos().then((photos) => {
    flickr.addUrlToPhotos(photos);
    const newPhotos = photos.filter(photo => photoIsNew(photo));
    if (newPhotos.length > 0) {
      facepp.analyzePhotos(newPhotos);
    } else {
      console.log('Nothing new found.');
    }
  });
};


const start = async () => {
  await fetchPhotosFromMongodb();
  setInterval(fetchNewPhotos, reqFrequency);
};

module.exports = { start };
