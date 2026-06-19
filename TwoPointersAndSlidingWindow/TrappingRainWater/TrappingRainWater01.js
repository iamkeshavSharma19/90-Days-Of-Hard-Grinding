/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (arr) {
  //?Let us conquer this Problem Today
  let n = arr.length;
  let maxL = [];
  maxL[0] = arr[0];

  for (let i = 1; i < n; i++) {
    maxL[i] = Math.max(arr[i], maxL[i - 1]);
  }

  let maxR = [];
  maxR[n - 1] = arr[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    maxR[i] = Math.max(arr[i], maxR[i + 1]);
  }

  let ans = 0;

  for (let i = 0; i < n; i++) {
    ans = ans + Math.min(maxL[i], maxR[i]) - arr[i];
  }

  return ans;
};
