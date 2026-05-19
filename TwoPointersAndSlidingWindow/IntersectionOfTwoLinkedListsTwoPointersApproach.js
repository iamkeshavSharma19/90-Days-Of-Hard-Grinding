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
  let n = 0;
  let pA = headA;
  while (pA) {
    ++n;
    pA = pA.next;
  }

  let m = 0;
  let pB = headB;
  while (pB) {
    ++m;
    pB = pB.next;
  }

  let diff = Math.abs(n - m);

  // I want this === first list as small,second list
  // as large
  if (n > m) {
    temp = headA;
    headA = headB;
    headB = temp;
  }

  for (let i = 0; i < diff; i++) {
    headB = headB.next;
  }

  pA = headA;
  pB = headB;

  while (pA !== pB) {
    pA = pA.next;
    pB = pB.next;
  }

  return pB;
};
