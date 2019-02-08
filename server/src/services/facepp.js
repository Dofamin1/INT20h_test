const axios = require('axios');
const asyncForEach = require('async-foreach').forEach;
const flickr = require('./flickr');
const helpers = require('../helpers.js');

const config = require('../config').facepp;

const { apiKey, apiSecret } = config;
const baseUrl = 'https://api-us.faceplusplus.com/facepp/v3/detect?';

const analyzedData = [];
const saveAnalysis = ({ faces, url }) => {
  console.log({ faces, url });
  analyzedData.push({ faces, url });
};


const analyzePhoto = (url, imageUrl, cb) => {
  axios
    .post(url, { responseType: 'json' })
    .then(({ data }) => {
      saveAnalysis({ faces: data.faces, url: imageUrl });
      cb();
    })
    .catch(e => console.log(e));
};


const getImageUrl = ({
  farm, server, id, secret,
}) => (
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`);

const saveAnalyzedData = () => console.log('asd', analyzedData.length, analyzedData);

const analyzePhotos = (photos) => {
  // Note: next line will be deleted in future. It is for quick testing
  photos = photos.length > 3 ? photos.slice(0, 3) : photos; // leave only 3 elements
  asyncForEach(photos, function photoHandler(photo) {
    const imageUrl = getImageUrl(photo);
    const facePlusPlusUrl = `${baseUrl}api_key=${apiKey}&api_secret=${apiSecret}&image_url=${imageUrl}`;
    const done = this.async();
    // analyze one photo, after each analysis wait `config.facepp.requestFrequency`
    // and save analyzed data to analyzedData.
    analyzePhoto(facePlusPlusUrl, imageUrl, () => setTimeout(done, config.request.frequency));
  }, saveAnalyzedData); // when all done
};

const faceAnalyzer = {
  getPhotosInfo: () => {
    flickr.getAllPhotos()
      .then((photos) => {
        analyzePhotos(photos);
      })
      .catch(e => console.log(e));
  },
};

module.exports = faceAnalyzer;
