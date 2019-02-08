
const faceAnalyzer = require('../api/facepp.js');


const start = () => {
  faceAnalyzer.getPhotosInfo();
};

module.exports = { start };
