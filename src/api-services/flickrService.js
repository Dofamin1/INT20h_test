import axios from "axios";
const apiKey = "ccae4d36e13dc2038bf32014adf1b64a";
const galleryId = "72157706084897874";
const methodName = "flickr.galleries.getPhotos";
const responseFormat = "json&nojsoncallback=1";
const flickrUrl = `https://api.flickr.com/services/rest/?method=${methodName}&api_key=${apiKey}&gallery_id=${galleryId}&format=${responseFormat}`;

const service = {
  getPhotos() {
    return axios
      .get(flickrUrl, { responseType: "json" })
      .then(({ data }) => {
        return data.stat === "ok"
          ? data.photos
          : new Error("error with flickr API");
      })
      .catch(e => {
        return e;
      });
  }
};

export default service;
