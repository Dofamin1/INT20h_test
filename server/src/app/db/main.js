const helpers = require('../../helpers');
const connection = require('./connection');

connection.connect();

const PhotosModel = require('./models/photos')();

const db = {
  savePhotos: (photos) => {
    // creating uniq `_id` field for insertion into mongo
    photos = photos.map((photo) => {
      photo._id = helpers.hash(photo.url);
      return photo;
    });

    PhotosModel.collection.insertMany(photos, (err, photosSaved) => {
      if (err) {
        // TODO: ERROR handler needed
        return console.error(err);
      }
      console.log('Inseted', photosSaved);
    });
  },
};

module.exports = db;
