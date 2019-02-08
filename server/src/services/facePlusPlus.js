const axios = require("axios");
const flickr = require("./flickr");
const helpers = require("../helpers/helpers.js");
const asyncForEach = require("async-foreach").forEach;

const apiKey = "x-q8iByG34SuZR3TFIh6UbWLIkSrrsyM";
const apiSecret = "ymjVxDrcYSh7Z97g630zVm1WfZkfiokw";
const baseUrl = "https://api-us.faceplusplus.com/facepp/v3/detect?";

const makeRequest = url =>
  axios
    .post(url, { responseType: "json" })
    .then(
      ({ data }) => console.log(data)
    )
    .catch(e => console.log(e));

const getImageUrl = ({ farm, server, id, secret }) =>
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

const analyzePhotos = photos => {
  let curIndex = 0
  let facePlusPlusUrl, imageUrl;
  const interval = setInterval(function(){
      if (curIndex === photos.length) clearInterval(interval); 
      imageUrl = getImageUrl(photos[curIndex]);
      facePlusPlusUrl = `${baseUrl}api_key=${apiKey}&api_secret=${apiSecret}&image_url=${imageUrl}`;
      makeRequest(facePlusPlusUrl);
      curIndex += 1
  },1000)
};
const faceAnalyzer = {
  getPhotosInfo: () => {
    flickr
      .getAllPhotos() 
      .then(response => {
        response instanceof Error
          ? console.log(response)
          : analyzePhotos(response);
      })
      .catch(e => console.log(e));
  }
};

module.exports = faceAnalyzer;
