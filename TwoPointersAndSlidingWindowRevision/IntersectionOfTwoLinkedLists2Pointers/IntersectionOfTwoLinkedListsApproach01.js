/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  //Approach01
  let pA = headA;
  let m = 0;
  while (pA !== null) {
    pA = pA.next;
    ++m;
  }
  let pB = headB;
  let n = 0;
  while (pB !== null) {
    pB = pB.next;
    ++n;
  }
  let difference = Math.abs(m - n);

  if (n > m) {
    let temp = headA;
    headA = headB;
    headB = temp;
  }

  for (let i = 0; i < difference; i++) {
    headA = headA.next;
  }

  pA = headA;
  pB = headB;

  while (pA !== pB) {
    pA = pA.next;
    pB = pB.next;
  }

  return pA;
};
