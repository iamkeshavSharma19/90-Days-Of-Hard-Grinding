/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (arr, target) {
  let n = arr.length;
  let map = {};

  for (let i = 0; i < n; i++) {
    map[arr[i]] = i;
  }

  for (let i = 0; i < n; i++) {
    let pairToFind = target - arr[i];
    if (map[pairToFind] && map[pairToFind] !== i) {
      return [i, map[pairToFind]];
    }
  }
};
