const db = require('./db/main.js');

const updateFrequency = 1000000;
const { getPhotoId } = require('../helpers.js');
const facepp = require('../api/facepp.js')(db);
const flickr = require('../api/flickr.js');

const mongodbPhotosIDList = [];

const photoIsNew = photo => !mongodbPhotosIDList.includes(getPhotoId(photo));

const fetchPhotosFromMongodb = () => db.getPhotos().then((photos) => {
  const photosIds = photos.map(getPhotoId);
  mongodbPhotosIDList.push(...photosIds);
});
const fetchNewPhotos = async () => {
  const allPhotos = await flickr.fetchAllPhotos().then(flickr.addUrlToPhotos);
  const newPhotos = allPhotos.filter(photo => photoIsNew(photo));
  return newPhotos;
};

const getUpdates = async () => {
  const newPhotos = await fetchNewPhotos();
  if (newPhotos.length > 0) {
    facepp.analyzePhotosAndAddToDataBase(newPhotos);
  } else {
    console.log('Nothing new found.');
  }
};

const start = async () => {
  await fetchPhotosFromMongodb();
  getUpdates();
  // setInterval(await getUpdates, updateFrequency);
};

module.exports = { start };
