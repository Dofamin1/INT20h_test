const mongoose = require('mongoose');

const config = require('../../config').db;
const helpers = require('../../helpers');

mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=${config.database}&w=1`, { useNewUrlParser: true }).then(() => {
  console.log('Connected to Database');
  // TODO: create production and development enviroments
  mongoose.set('debug', true); // turn on debug
}).catch((err) => {
  console.log('Not Connected to Database ERROR! ', err);
});

const db = {
  savePhotos: (photos) => {
    console.log('saved', photos);
    console.log(helpers.hash('fasfas'), helpers.hash('fasfas'), helpers.hash('fasfas1'));
  },
};

module.exports = db;
