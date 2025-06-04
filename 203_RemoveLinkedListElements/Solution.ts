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

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    // Remove all linked list elements at head if they match
    let curHead = head;
    while (curHead !== null && curHead.val === val) {
        curHead = curHead.next;
    }

    // No need to continue if the head is null
    if (curHead === null) {
        return null;
    }

    // Remove all non-head elements that match
    let prev = curHead;
    let cur = curHead.next;
    while (cur !== null) {
        if (cur.val === val) {
            prev.next = cur.next;
            cur = prev;
        }
        prev = cur;
        cur = cur.next;
    }

    return curHead;
}
