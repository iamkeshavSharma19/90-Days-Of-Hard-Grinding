/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countKDifference = function (nums, k) {
  let map = {};
  let count = 0;
  for (let num of nums) {
    if (map[num - k]) {
      count = count + map[num - k];
    }
    if (map[num + k]) {
      count = count + map[num + k];
    }

    map[num] = (map[num] || 0) + 1;
  }

  return count;
};
