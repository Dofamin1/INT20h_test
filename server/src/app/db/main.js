const mongoose = require('mongoose');
const helpers = require('../../helpers');
const connection = require('./connection');


connection.connect();

const PhotosModel = require('./models/photos')();

const db = {
  savePhotos: (photos) => {
    // creating uniq `id` field for insertion into mongo
    photos.forEach((photo) => {
      photo.id = helpers.hash(photo.url);
    });
    PhotosModel.collection.insertMany(photos, (err, photosSaved) => {
      // TODO: ERROR handler needed
      if (err) console.error(err);
      console.log('Inserted', photosSaved.length);
    });
  },
  getPhotos: () => PhotosModel.find({}, {
    _id: 1, id: 1, faces: 1, url: 1, emotions: 1,
  }).exec(),
};

module.exports = db;
