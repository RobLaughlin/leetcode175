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

function middleNode(head: ListNode | null): ListNode | null {
    const values: ListNode[] = [];

    let cur: ListNode | null = head;
    while (cur != null) {
        values.push(cur);
        cur = cur.next;
    }

    if (values.length === 0) {
        return null;
    }

    const mid = Math.ceil((values.length - 1) / 2);
    return values[mid];
}
