const axios = require('axios');
const url = require('url');
const asyncForEach = require('async-foreach').forEach;
const config = require('../config').facepp;

const { apiKey, apiSecret, baseUrl } = config;
const analyzedData = [];
const writeToDBAfterAnalysis = (db, info) => { 
  info.analyzed = true;
  db.savePhotos(analyzedData);
};

const getMaximumEmotion = (emotions) => {
  const emotionsValues = Object.values(emotions);
  const maxEmotionValue = Math.max(...emotionsValues);
  const maxEmotionName = Object.keys(emotions).find(key => emotions[key] === maxEmotionValue);
  return maxEmotionName;
};
const calculateEmotions = ({ data }) => data.faces.map((face) => {
  const { attributes } = face;
  if (attributes) {
    face.emotion = getMaximumEmotion(attributes.emotion);
    delete face.attributes;
  }
  return face;
});

const analyzePhoto = (reqUrl, photo, callback) => {
  axios
    .post(reqUrl, { responseType: 'json' })
    .then(calculateEmotions)
    .then(faces => analyzedData.push({
      faces,
      url: photo.url,
    }))
    .then(callback)
    .catch(e => console.log(e.message, e.response ? e.response.data : ''));
};

const photoHandler = function photoHandler(photo) {
  const params = new url.URLSearchParams({
    api_key: apiKey,
    api_secret: apiSecret,
    image_url: photo.url,
    return_attributes: 'emotion',
  });
  const reqUrl = `${baseUrl}?${params.toString()}`;
  const done = this.async(); // should be called after async operation is finished
  const callAfterEachRequest = () => setTimeout(done, config.reqFrequency);
  analyzePhoto(reqUrl, photo, callAfterEachRequest);
};

module.exports = function facepp(db) {
  return {
    analyzePhotosAndAddToDataBase: (photos, info) => {
      asyncForEach(photos, photoHandler, () => writeToDBAfterAnalysis(db, info));
    },
  };
};
