const mongoose = require('mongoose');
const helpers = require('../../helpers');
const connection = require('./connection');


connection.connect();

const PhotosModel = require('./models/photos')();

const db = {
  savePhotos: async (photos) => {
    // creating uniq `id` field for insertion into mongo
    console.log('af');
    photos.forEach((photo) => {
      photo.id = helpers.hash(photo.url);
    });
    await PhotosModel.collection.insertMany(photos, (err, photosSaved) => {
      // TODO: ERROR handler needed
      if (err) console.error(err);
      console.log('Inserted', photosSaved.length);
    });
  },
  getPhotos: () => PhotosModel.find({}).lean().exec(),
};

module.exports = db;
