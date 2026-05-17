/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  // corner case
  if (s.length === 1) {
    return false;
  }
  let i = 0;
  let j = 1;
  let lps = [0];

  let m = s.length;

  while (j < m) {
    if (s[i] === s[j]) {
      lps[j] = i + 1;
      ++i;
      ++j;
    } else {
      if (i === 0) {
        lps[j] = 0;
        ++j;
      } else {
        i = lps[i - 1];
      }
    }
  }

  if (lps[m - 1] > 0 && m % (m - lps[m - 1]) === 0) {
    return true;
  }

  return false;
};
