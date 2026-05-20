/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (arr) {
  //sort the original array
  arr.sort((a, b) => a - b);

  let ans = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      twoSum(arr, i, ans);
    }
  }

  return ans;
};

var twoSum = function (arr, x, ans) {
  let i = x + 1;
  let j = arr.length - 1;
  while (i < j) {
    let sum = arr[i] + arr[j] + arr[x];

    if (sum > 0) {
      --j;
    } else if (sum < 0) {
      ++i;
    } else {
      ans.push([arr[i], arr[j], arr[x]]);
      ++i;
      --j;
      while (i < j && arr[i] === arr[i - 1]) {
        ++i;
      }
    }
  }
};
