/**
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
var mostFrequent = function (arr, key) {
  let i = 0;
  let j = 1;
  let target = undefined;
  let maxFrequency = -Infinity;
  let hashMap = {};
  let ans;

  while (j < arr.length) {
    if (arr[i] !== key) {
      ++i;
      ++j;
    } else if (arr[i] === key && target === undefined) {
      target = arr[j];
      if (!hashMap[target]) {
        hashMap[target] = 1;
      } else {
        ++hashMap[target];
      }
      ++j;
    } else if (arr[i] === key && arr[j] === target) {
      ++hashMap[target];
      ++j;
    } else if (arr[i] === key && arr[j] !== target) {
      i = j - 1;
      target = undefined;
    }
  }

  for (const key in hashMap) {
    if (hashMap[key] > maxFrequency) {
      maxFrequency = hashMap[key];
      ans = Number(key);
    }
  }

  return ans;
};
