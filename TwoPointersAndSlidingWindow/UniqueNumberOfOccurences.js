/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  let hashMap = {};
  let hashMap2 = {};

  for (let i = 0; i < arr.length; i++) {
    if (!hashMap[arr[i]]) {
      hashMap[arr[i]] = 1;
    } else {
      ++hashMap[arr[i]];
    }
  }

  for (const key in hashMap) {
    if (hashMap2[hashMap[key]]) {
      return false;
    }

    hashMap2[hashMap[key]] = key;
  }

  return true;
};
