const db = require('./db/main.js');
const helpers = require('../helpers.js');
const facepp = require('../api/facepp.js')(db);
const flickr = require('../api/flickr.js');

const dbImagesList = [];


const fetchFlickrPhotos = async () => flickr.fetchAllPhotos();
// .then((photos) => {
//   flickr.addUrlToPhotos(photos);
//   // cb(photos);
//   return photos;
// })
// .catch(e => console.log(e));
const photoExists = photo => dbImagesList.indexOf(helpers.hash(photo.url)) !== -1;

fetchFlickrPhotos((photosFlickr) => {
  const filteredPhotos = photosFlickr.filter(photo => !photoExists(photo));
  if (filteredPhotos.length > 0) {
    facepp.analyzePhotos(photosFlickr);
  } else {
    console.log('All images already in db');
  }
});

// const fetchSavedPhotos = async () => ;


const start = async () => {
  await db.getPhotos().then((photos) => {
    dbImagesList.push(...photos.map(el => helpers.hash(el.url)));
    console.log('in db now: ', dbImagesList);
  });
  await fetchFlickrPhotos().then((photos) => {
    flickr.addUrlToPhotos(photos);
    photos.forEach((el) => {
      console.log(helpers.hash(el.url));
    });
    console.log(photos);

    const filteredPhotos = photos.filter(photo => !photoExists(photo));
    console.log(photos.length, filteredPhotos.length);
    // return;
    if (filteredPhotos.length > 0) {
      facepp.analyzePhotos(filteredPhotos);
      console.log(filteredPhotos.length);
    } else {
      console.log('All images already in db');
    }
    // console.log(photos);
  });
  // console.log();
  // fetchSavedPhotos();

  // console.log(, 'fsd');
  // console.log('afd');
};

module.exports = { start };
