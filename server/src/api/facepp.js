const axios = require('axios');
const url = require('url');
const asyncForEach = require('async-foreach').forEach;
const config = require('../config').facepp;

const { apiKey, apiSecret, baseUrl } = config;
const analyzedData = [];

const getMaximumEmotion = (emotions) => {
  const emotionsValues = Object.values(emotions);
  const maxEmotionValue = Math.max(emotionsValues);
  const maxEmotionName = Object.keys(emotions).find(key => emotions[key] == maxEmotionValue);
  return maxEmotionName;
};

const callAfterAnalysis = analyzedData => db.savePhotos(analyzedData);
const deleteFaces = el => delete el.attributes.emotion;

const analyzePhoto = (reqUrl, imageUrl, callback) => {
  axios
    .post(reqUrl, { responseType: 'json' })
    .then(({ data }) => {
      const emotionList = data.faces.length ? [] : data.faces.map(el => el.attributes.emotion);
      // data.faces.forEach(deleteFaces);
      analyzedData.push({
        faces: data.faces,
        url: imageUrl,
        emotions: emotionList.map(getMaximumEmotion),
      });
    })
    .then(callback)
    .catch(e => console.log(e.message, e.response ? e.response.data : ''));
};

const photoHandler = (photo) => {
  const params = new url.URLSearchParams({
    api_key: apiKey,
    api_secret: apiSecret,
    image_url: photo.url,
    return_attributes: 'emotion',
  });
  const reqUrl = `${baseUrl}?${params.toString()}`;
  const done = this.async(); // should be called after async operation is finished
  const callAfterEachRequest = () => setTimeout(done, config.request.frequency);
  analyzePhoto(reqUrl, photo.url, callAfterEachRequest);
};

module.exports = function facepp(db) {
  return {
    analyzePhotos: (photos) => {
      photos.slice(5);
      asyncForEach(photos, photoHandler, callAfterAnalysis);
    },
  };
};
