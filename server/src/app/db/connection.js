const mongoose = require('mongoose');

const {
  username, password, host, port, database,
} = require('../../config').db;

module.exports = {
  connection: mongoose.connection,
  connect() {
    mongoose.connect(
      `mongodb://${username}:${password}@${host}:${port}/${database}`,
      {
        useNewUrlParser: true,
        poolSize: 1,
      },
    )
      .then(() => {
        console.log('Connected to Database');
        // TODO: create production and development enviroments
        mongoose.set('debug', true); // turn on debug
      }).catch((err) => {
        console.log('Not Connected to Database ERROR! ', err);
      });
  },
};
