const removeDuplicates = ({ array, prop }) => (
  array.filter(
    (obj, pos, arr) => (arr.map(mapObj => (mapObj[prop]).indexOf(obj[prop]) === pos)
    ),
  )
);

const arrayColumn = (arr, col, colNum) => (
  arr.filter(x => ((arr.indexOf(x) % colNum) === col - 1 ? x : false))
);


export default {
  removeDuplicates,
  arrayColumn,
};
