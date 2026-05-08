/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  //corner case

  let h = haystack.length;
  let n = needle.length;
  if (h.length === n.length && haystack === needle) {
    return 0;
  }
  let isMatch = false;
  let k;

  for (let i = 0; i <= h - n; i++) {
    k = 0;
    for (let j = i; j < i + n; j++) {
      if (haystack[j] === needle[k]) {
        isMatch = true;
      } else {
        isMatch = false;
        break;
      }
      ++k;
    }
    console.log(i);

    if (isMatch === true) {
      return i;
    }
  }

  return -1;
};
