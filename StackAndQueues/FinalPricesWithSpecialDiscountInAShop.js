/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (arr) {
  let stack = [];
  let n = arr.length;
  let ans = Array(n).fill(0);
  stack.push(arr[n - 1]);
  ans[n - 1] = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    while (stack.length !== 0) {
      let top = stack[stack.length - 1];
      if (arr[i] >= top) {
        //discount will be given
        let discountPrice = arr[i] - top;
        ans[i] = discountPrice;
        break;
      } else {
        //no discount will be provided
        stack.pop();
      }
    }
    if (stack.length === 0) {
      ans[i] = arr[i];
    }

    stack.push(arr[i]);
  }

  return ans;
};
