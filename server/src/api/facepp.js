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

const analyzePhoto = (reqUrl, imageUrl, cb) => {
  axios
    .post(reqUrl, { responseType: 'json' })
    .then(({ data }) => {
      const emotionList = data.faces.length === 0 ? [] : data.faces.map(el => el.attributes.emotion);
      // remove attributes.emotion because it is not needed already
      data.faces.forEach((el) => {
        delete el.attributes.emotion;
      });
      analyzedData.push({
        faces: data.faces,
        url: imageUrl,
        emotions: emotionList.map(el => getMaximumEmotion(el)),
      });
      cb();
    })
    .catch(e => console.log(e.message, e.response ? e.response.data : ''));
};

module.exports = function facepp(db) {
  return {
    analyzePhotos: (photos) => {
      // Note: next line will be deleted in future. It is for quick testing
      photos = photos.length > 5 ? photos.slice(0, 5) : photos; // leave only 3 elements
      asyncForEach(
        photos,
        function photoHandler(photo) {
          // const imageUrl = flickr.composeImageUrl(photo);
          const params = new url.URLSearchParams({
            api_key: apiKey,
            api_secret: apiSecret,
            image_url: photo.url,
            return_attributes: 'emotion',
          });
          const reqUrl = `${baseUrl}?${params.toString()}`;
          const done = this.async();
          // analyze one photo, after each analysis wait `config.facepp.requestFrequency`
          // and save analyzed data to analyzedData.
          analyzePhoto(reqUrl, photo.url, () => setTimeout(done, config.request.frequency));
        },
        () => {
          console.log('asdf');
          db.savePhotos(analyzedData);
        },
      ); // when all done save to db
    },
  };
};
