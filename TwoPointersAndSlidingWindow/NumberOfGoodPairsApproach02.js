/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (arr) {
  //Second approach
  let count = 0;
  let map = {};

  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = 1;
    } else {
      // count += map[arr[i]];
      ++map[arr[i]];
    }
  }

  for (const key in map) {
    let n = map[key];
    count += (n * (n - 1)) / 2;
  }

  return count;
};
