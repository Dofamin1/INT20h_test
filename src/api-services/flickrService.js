import axios from 'axios';

const apiKey = 'ccae4d36e13dc2038bf32014adf1b64a';
const responseFormat = 'json&nojsoncallback=1';
const baseFlickrUrl = `https://api.flickr.com/services/rest/?api_key=${apiKey}&format=${responseFormat}`;

const makeRequest = url => axios
  .get(url, { responseType: 'json' })
  .then(({ data }) => (data.stat === 'ok' ? data : new Error('error with flickr API')))
  .catch(e => e);

const service = {
  getPhotosByGallery() {
    const galleryId = '72157706084897874';
    const url = `${baseFlickrUrl}&method=flickr.galleries.getPhotos&gallery_id=${galleryId}&extras=url_o`;
    return makeRequest(url);
  },
  getPhotosByTag() {
    const tag = 'int20h';
    const url = `${baseFlickrUrl}&method=flickr.photos.search&tags=${tag}`;
    return makeRequest(url);
  },
  getAllPhotos() {
    return Promise.all([
      service.getPhotosByGallery(),
      service.getPhotosByTag(),
    ]);
  },
};

export default service;
