const helpers = require('../../helpers');
const connection = require('./connection');

connection.connect();

const PhotosModel = require('./models/photos')();

const db = {
  savePhotos: async (photos) => {
    // creating uniq `id` field for insertion into mongo
    photos.forEach((photo) => {
      photo.id = helpers.hash(photo.url);
    });
    await PhotosModel.collection.insertMany(photos, (err) => {
      if (err) console.log(err);
      console.log('Inserted');
    });
  },
  getPhotos: () => PhotosModel.find({}, { _id: 0 })
    .lean()
    .exec(),
};

module.exports = db;
