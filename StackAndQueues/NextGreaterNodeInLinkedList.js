/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
  //& Step1 === Reverse the linked list
  let curr = head;
  let prev = null;
  let ans = [];
  while (curr !== null) {
    //~storing the next node inside temp so that
    //~we can always have it's reference
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }
  let stack = [];
  // let ans = [];
  stack.push(prev.val);
  prev = prev.next;
  ans.push(0);
  while (prev !== null) {
    while (stack.length !== 0) {
      let top = stack[stack.length - 1];
      if (prev.val < top) {
        ans.push(top);
        break;
      } else {
        stack.pop();
      }
    }
    if (stack.length === 0) {
      ans.push(0);
    }
    stack.push(prev.val);
    prev = prev.next;
  }

  return ans.reverse();
};
