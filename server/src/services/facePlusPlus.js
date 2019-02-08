const axios = require("axios");
const flickr = require("./flickr");
const helpers = require("../helpers/helpers.js");
const asyncForEach = require("async-foreach").forEach;
const config = require('../config').facepp

const apiKey = config.apiKey;
const apiSecret = config.apiSecret;
const baseUrl = "https://api-us.faceplusplus.com/facepp/v3/detect?";

let requestsCount = 1; 
const photosInfoStorage = [];

const writeToFireBase = () => { console.log(photosInfoStorage) };
const addToDocument = ({ faces, url }) => { photosInfoStorage.push({ faces, url })};

const setupRequests = photoCount => (url, imageUrl) => //TODO: я хэр знає як цю функцію назвати
  axios
    .post(url, { responseType: "json" })
    .then(({data}) => addToDocument({ faces: data.faces, url: imageUrl }))
    .catch(e => console.log(e))
    .finally(() => {
      requestsCount === photoCount ? writeToFireBase() : requestsCount += 1
    });

const getImageUrl = ({ farm, server, id, secret }) =>
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

const analyzePhotos = photos => {
      const facePlusPlusRequestInterval = 1500;
      const makeRequest = setupRequests(photos.length)
      asyncForEach(photos, function(photo) {
        const imageUrl = getImageUrl(photo);
        const facePlusPlusUrl = `${baseUrl}api_key=${apiKey}&api_secret=${apiSecret}&image_url=${imageUrl}`;
        const done = this.async();
        setTimeout(() => { 
          done();
          makeRequest(facePlusPlusUrl, imageUrl) 
        }, facePlusPlusRequestInterval);
      });
};
const faceAnalyzer = {
  getPhotosInfo: () => {
    flickr
      .getAllPhotos() 
      .then(response => {
        response instanceof Error
          ? console.log(response)
          : analyzePhotos(response);
      })
      .catch(e => console.log(e));
  }
};

module.exports = faceAnalyzer;
