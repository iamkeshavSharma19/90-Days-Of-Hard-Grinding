/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (arr, target) {
  let n = arr.length;
  let map = {};

  for (let i = 0; i < n; i++) {
    map[arr[i]] = i;
  }

  console.log(map);

  for (let i = 0; i < n; i++) {
    let diff = target - arr[i];
    if (map[diff] && map[diff] !== i) {
      return [i + 1, map[diff] + 1];
    }
  }
};
