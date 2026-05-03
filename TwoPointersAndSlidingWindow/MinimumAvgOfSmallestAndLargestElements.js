/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  //very very easy problem
  nums.sort((a, b) => a - b);
  let minAvg = Infinity;

  let i = 0;
  let j = nums.length - 1;

  while (i < j) {
    let avg = (nums[i] + nums[j]) / 2;
    minAvg = Math.min(minAvg, avg);
    ++i;
    --j;
  }

  return minAvg;
};
