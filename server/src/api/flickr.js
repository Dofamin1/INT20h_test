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
  addUrlToPhotos(photos) {
    return photos.map((photo) => {
      photo.url = flickr.composeImageUrl(photo);
      return photo;
    });
  },

  fetchPhotosByGalleryId(galleryId) {
    const params = new url.URLSearchParams({
      api_key: apiKey,
      format: 'json',
      nojsoncallback: '1',
      method: 'flickr.people.getPublicPhotos',
      user_id: '144522605@N06',
      gallery_id: galleryId,
      extras: 'url_l',
    });
    const reqUrl = `${baseUrl}?${params.toString()}`;
    return makeRequest(reqUrl);
  },
  fetchPhotosByTags(tags) {
    const params = new url.URLSearchParams({
      api_key: apiKey,
      format: 'json',
      nojsoncallback: '1',
      method: 'flickr.photos.search',
      tags: tags.join(','),
      extras: 'url_l',
    });
    const reqUrl = `${baseUrl}?${params.toString()}`;
    return makeRequest(reqUrl);
  },
  fetchAllPhotos() {
    return Promise.all([
      flickr.fetchPhotosByGalleryId('72157674388093532'),
      flickr.fetchPhotosByTags(['int20h']),
    ]).then((data) => {
      const reducer = (accumulator, currentValue) => {
        const newPhoto = currentValue && currentValue.photos ? currentValue.photos.photo : []
        return [...accumulator, ...newPhoto];
      };
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
