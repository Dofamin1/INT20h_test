const axios = require("axios");
const helpers = require("../helpers.js");
const config = require('../config').flickr

const apiKey = config.apiKey;
const responseFormat = "json&nojsoncallback=1";
const baseFlickrUrl = `https://api.flickr.com/services/rest/?api_key=${apiKey}&format=${responseFormat}`;

const makeRequest = url =>
  axios
    .get(url, { responseType: "json" })
    .then(({ data }) =>
      data.stat === "ok" ? data : new Error("Error with Flickr API")
    )
    .catch(e => console.log(e));

const service = {
  getPhotosByGallery() {
    const galleryId = "72157706084897874";
    const url = `${baseFlickrUrl}&method=flickr.galleries.getPhotos&gallery_id=${galleryId}&extras=url_o`;
    return makeRequest(url);
  },
  getPhotosByTag() {
    const tag = "int20h";
    const url = `${baseFlickrUrl}&method=flickr.photos.search&tags=${tag}`;
    return makeRequest(url);
  },
  getAllPhotos() {
    return Promise.all([
      // service.getPhotosByGallery(),
      service.getPhotosByTag()
    ]).then(data => {
      const reducer = (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue.photos.photo
      ];
      const allPhotos = data.reduce(reducer, []);
      const photosWithoutDuplicates = helpers.removeDuplicates({
        array: allPhotos,
        prop: "id"
      });
      return photosWithoutDuplicates;
    });
  }
};
module.exports = service;
