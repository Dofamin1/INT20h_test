const axios = require('axios');
const asyncForEach = require('async-foreach').forEach;
const flickr = require('./flickr');
const helpers = require('../helpers.js');
const config = require('../config').facepp;

const { apiKey, apiSecret } = config;
const baseUrl = 'https://api-us.faceplusplus.com/facepp/v3/detect?';

const requestsCount = 1;
const photosInfoStorage = [];

const writeToFireBase = () => { console.log(photosInfoStorage); };
const addToDocument = ({ faces, url }) => {
  console.log({ faces, url });
  photosInfoStorage.push({ faces, url });
};

const makeRequest = (url, imageUrl) => { // TODO: я хэр знає як цю функцію назвати
  axios
    .post(url, { responseType: 'json' })
    .then(({ data }) => addToDocument({ faces: data.faces, url: imageUrl }))
    .catch(e => console.log(e));
  // .finally(() => (requestsCount === photoCount ? writeToFireBase() : requestsCount += 1));
};


const getImageUrl = ({
  farm, server, id, secret,
}) => (
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`);

const allDone = () => console.log(photosInfoStorage);

const analyzePhotos = (photos) => {
  const facePlusPlusRequestInterval = 1500;
  // Note: next line will be deleted in future. It is for quick testing
  photos = photos.length > 3 ? photos.slice(0, 3) : photos; // leave only 3 elements
  asyncForEach(photos, function photoHandler(photo) {
    const imageUrl = getImageUrl(photo);
    const facePlusPlusUrl = `${baseUrl}api_key=${apiKey}&api_secret=${apiSecret}&image_url=${imageUrl}`;
    const done = this.async();
    makeRequest(facePlusPlusUrl, imageUrl);
    setTimeout(() => done(), facePlusPlusRequestInterval);
  }, allDone);
};

const faceAnalyzer = {
  getPhotosInfo: () => {
    flickr.getAllPhotos()
      .then((response) => {
        if (response instanceof Error) {
          console.log(response);
        } else {
          analyzePhotos(response);
        }
      })
      .catch(e => console.log(e));
  },
};

module.exports = faceAnalyzer;
