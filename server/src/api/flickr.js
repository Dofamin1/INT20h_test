const axios = require('axios');
const url = require('url');
const helpers = require('../helpers.js');
const config = require('../config').flickr;

const { baseUrl, apiKey } = config;

const makeRequest = reqUrl => axios
  .get(reqUrl, { responseType: 'json' })
  .then(({ data }) => (data.stat === 'ok' ? data : new Error('Error with Flickr API')))
  .catch(e => console.log(e));


const flickr = {
  composeImageUrl({
    farm, server, id, secret,
  }) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  },

  getPhotosByGalleryId(galleryId) {
    const params = new url.URLSearchParams({
      api_key: apiKey,
      format: 'json',
      nojsoncallback: '1',
      method: 'flickr.galleries.getPhotos',
      gallery_id: galleryId,
    });
    const reqUrl = `${baseUrl}?${params.toString()}`;
    return makeRequest(reqUrl);
  },
  getPhotosByTags(tags) {
    const params = new url.URLSearchParams({
      api_key: apiKey,
      format: 'json',
      nojsoncallback: '1',
      method: 'flickr.photos.search',
      tags: tags.join(','),
    });
    const reqUrl = `${baseUrl}?${params.toString()}`;
    return makeRequest(reqUrl);
  },
  getAllPhotos() {
    return Promise.all([
      // flickr.getPhotosByGalleryId('72157706084897874'),
      flickr.getPhotosByTags(['int20h']),
    ]).then((data) => {
      const reducer = (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue.photos.photo,
      ];
      const allPhotos = data.reduce(reducer, []);
      const photosWithoutDuplicates = helpers.removeDuplicates({
        array: allPhotos,
        prop: 'id',
      });
      return photosWithoutDuplicates;
    });
  },
};

module.exports = flickr;
