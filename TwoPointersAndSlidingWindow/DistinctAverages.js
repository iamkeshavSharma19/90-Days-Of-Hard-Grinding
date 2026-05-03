/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function (nums) {
  // very very easy problem

  let map = {};

  nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;

  while (i < j) {
    let avg = (nums[i] + nums[j]) / 2;
    // avg = Math.floor(avg);
    map[avg] = avg;
    i++;
    j--;
  }

  const size = Object.keys(map).length;
  return size;
};
