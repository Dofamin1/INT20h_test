const db = require('./db/main.js');

const flickrConfig = require('../config.js').flickr;
const { getPhotoId } = require('../helpers.js');
const facepp = require('../api/facepp.js')(db);
const flickr = require('../api/flickr.js');

const info = { analyzed: true };
let mongodbPhotosIDList = [];

const photoIsNew = photo => mongodbPhotosIDList.indexOf(getPhotoId(photo)) === -1;	

const fetchPhotosFromMongodb = () => db.getPhotos().then((photos) => {
  mongodbPhotosIDList = [];
  const photosIds = photos.map(getPhotoId);
  mongodbPhotosIDList.push(...photosIds);
});
const fetchNewPhotos = async () => {
  const allPhotos = await flickr.fetchAllPhotos().then(flickr.addUrlToPhotos);
  const newPhotos = allPhotos.filter(photo => photoIsNew(photo));
  return newPhotos;
};

const getUpdates = async () => {
  await fetchPhotosFromMongodb();
  const newPhotos = await fetchNewPhotos();
  if (newPhotos.length > 0 && info.analyzed) {
    info.analyzed = false;
    facepp.analyzePhotosAndAddToDataBase(newPhotos, info);
  } else {
    console.log('Nothing new found.');
  }
};

const start = async () => {
  setInterval(() => getUpdates(), flickrConfig.updateFrequency);
};

module.exports = { start };
