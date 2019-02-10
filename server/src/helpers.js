const crypto = require('crypto');

const helpers = {
  removeDuplicates: ({ array, prop }) => (
    array.filter((obj, pos, arr) => (
      arr.map(mapObj => mapObj[prop].indexOf(obj[prop]) === pos)
    ))
  ),
  hash: (string) => {
    const sha1 = crypto.createHash('sha1');
    return sha1.update(string, 'utf-8').digest('hex');
  },
  getPhotoId: obj => helpers.hash(obj.url),
};


module.exports = helpers;
