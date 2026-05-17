/**
 * @param {string} s
 * @return {string}
 */
var longestPrefix = function (s) {
  let i = 0;
  let j = 1;
  let lps = [0];
  let m = s.length;
  let ans = "";
  while (j < m) {
    if (s[i] === s[j]) {
      // ans = ans + s[i];
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

  let len = lps[m - 1];
  return s.substring(0, len);
};
