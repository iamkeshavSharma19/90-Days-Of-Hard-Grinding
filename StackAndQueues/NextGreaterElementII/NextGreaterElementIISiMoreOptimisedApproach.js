/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (arr) {
  // let arr = [...nums, ...nums];
  let n = arr.length;
  let stack = [];
  let ans = Array(n).fill(-1);
  stack.push(arr[n - 1]);

  for (let i = 2 * n - 2; i >= 0; i--) {
    while (stack.length !== 0) {
      let top = stack[stack.length - 1];
      if (arr[i % n] < top) {
        ans[i % n] = top;
        break;
      } else {
        stack.pop();
      }
    }
    stack.push(arr[i % n]);
  }

  return ans.slice(0, n);
};
