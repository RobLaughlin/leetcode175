/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    let head: ListNode | null = null;
    let merged: ListNode | null = null;
    let left = list1;
    let right = list2;

    function nodeIsNull(node: ListNode | null): node is null {
        return node === null;
    }

    while (left !== null || right !== null) {
        const lVal = nodeIsNull(left) ? Infinity : left.val;
        const rVal = nodeIsNull(right) ? Infinity : right.val;
        const minVal = Math.min(lVal, rVal);

        if (merged === null) {
            head = new ListNode(minVal);
            merged = head;
        } else {
            merged.next = new ListNode(minVal);
            merged = merged.next;
        }

        if (lVal <= rVal && left !== null) {
            left = left.next;
        } else if (rVal < lVal && right !== null) {
            right = right.next;
        }
    }
    return head;
}
