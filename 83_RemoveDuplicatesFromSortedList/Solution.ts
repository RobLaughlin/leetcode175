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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dupes = new Set<number>();
    let cur = head;
    let prev = cur;
    while (cur !== null) {
        if (dupes.has(cur.val)) {
            prev!.next = cur.next;
            cur = cur.next;
        } else {
            dupes.add(cur.val);
            prev = cur;
            cur = cur.next;
        }
    }

    return head;
}
