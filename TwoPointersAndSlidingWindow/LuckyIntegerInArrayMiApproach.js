/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  let hashMap = {};

  let max = -1;
  let Lucky = -1;

  for (let i = 0; i < arr.length; i++) {
    if (!hashMap[arr[i]]) {
      hashMap[arr[i]] = 1;
    } else {
      ++hashMap[arr[i]];
    }
  }

  for (const key in hashMap) {
    let numKey = Number(key);
    if (numKey === hashMap[key] && numKey > max) {
      max = numKey;
    }
  }

  return max;
};
