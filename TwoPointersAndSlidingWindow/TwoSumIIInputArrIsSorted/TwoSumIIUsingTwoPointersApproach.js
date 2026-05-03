/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (arr, target) {
  let n = arr.length;
  //~Two Pointer Approach
  let i = 0;
  let j = n - 1;
  while (i < j) {
    let sum = arr[i] + arr[j];
    4;

    if (sum > target) {
      --j;
    } else if (sum < target) {
      ++i;
    } else {
      return [i + 1, j + 1];
    }
  }
};
