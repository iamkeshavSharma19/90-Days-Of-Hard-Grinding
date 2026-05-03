var findSubarrays = function (nums) {
  let seen = new Set();

  for (let i = 0; i < nums.length - 1; i++) {
    let sum = nums[i] + nums[i + 1];

    if (seen.has(sum)) {
      return true;
    }

    seen.add(sum);
  }

  return false;
};
