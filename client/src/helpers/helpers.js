const removeDuplicates = ({ array, prop }) => (
  array.filter(
    (obj, pos, arr) => (arr.map(mapObj => (mapObj[prop]).indexOf(obj[prop]) === pos)
    ),
  )
);


export default {
  removeDuplicates,
};
