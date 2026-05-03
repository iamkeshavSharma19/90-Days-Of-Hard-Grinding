/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      ++i;
      ++j;
    } else {
      ++j;
    }
  }

  console.log(i);

  if (i > s.length - 1) {
    return true;
  } else {
    return false;
  }
};
