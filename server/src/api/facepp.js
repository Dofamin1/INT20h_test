const axios = require('axios');
const url = require('url');
const asyncForEach = require('async-foreach').forEach;
const config = require('../config').facepp;

const { apiKey, apiSecret, baseUrl } = config;
const analyzedData = [];

const getMaximumEmotion = (emotions) => {
  const emotionsValues = Object.values(emotions);
  const maxEmotionValue = Math.max(...emotionsValues);
  const maxEmotionName = Object.keys(emotions).find(key => emotions[key] === maxEmotionValue);
  return maxEmotionName;
};

const analyzePhoto = (reqUrl, photo, callback) => {
  axios
    .post(reqUrl, { responseType: 'json' })
    .then(({ data }) => {
      data.faces.forEach((face) => {
        face.emotion = getMaximumEmotion(face.attributes.emotion);
        delete face.attributes;
      });
      analyzedData.push({
        faces: data.faces,
        url: photo.url,
        flickrData: {
          id: photo.id,
          owner: photo.owner,
          secret: photo.secret,
          server: photo.server,
          farm: photo.farm,
        },
      });
    })
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
  const callAfterEachRequest = () => setTimeout(done, config.request.frequency);
  analyzePhoto(reqUrl, photo, callAfterEachRequest);
};

module.exports = function facepp(db) {
  return {
    analyzePhotos: (photos) => {
      // Note: next line will be deleted in future. It is for quick testing
      photos = photos.length > 30 ? photos.slice(0, 30) : photos;
      asyncForEach(photos, photoHandler, () => db.savePhotos(analyzedData));
    },
  };
};
