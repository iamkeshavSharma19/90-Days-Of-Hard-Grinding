/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxK = function (arr) {
  //&Using a hash map
  let map = {};
  let maxAns = 0;
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      let num = Math.abs(arr[i]);
      if (map[num]) {
        maxAns = Math.max(maxAns, num);
      }
    } else if (arr[i] > 0) {
      let num = -arr[i];
      if (map[num]) {
        maxAns = Math.max(maxAns, arr[i]);
      }
    }
  }

  return maxAns === 0 ? -1 : maxAns;
};
