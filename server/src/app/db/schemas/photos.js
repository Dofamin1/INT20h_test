const { Schema } = require('mongoose');

module.exports = function PhotoSchema() {
  return new Schema({}, { strict: false });
};
