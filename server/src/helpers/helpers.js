const helpers = {
  removeDuplicates: ({ array, prop }) =>
    array.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop].indexOf(obj[prop]) === pos)
    )
};

module.exports = helpers;
