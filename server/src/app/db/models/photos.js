const mongoose = require('mongoose');
const PhotosSchema = require('../schemas/photos')();

module.exports = function PhotosModel() {
  return mongoose.model('photos', PhotosSchema);
};
