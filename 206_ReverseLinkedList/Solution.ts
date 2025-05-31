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

function reverseList(head: ListNode | null): ListNode | null {
    const stack: (ListNode | null)[] = [null];
    let cur = head;
    while (cur != null) {
        stack.push(cur);
        cur = cur.next;
    }

    if (stack.length > 0) {
        head = stack.pop()!;
    }

    cur = head;
    while (stack.length > 0) {
        const next = stack.pop()!;
        cur!.next = next;
        cur = next;
    }
    return head;
}
