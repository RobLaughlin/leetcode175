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

function isPalindrome(head: ListNode | null): boolean {
    // Convert the linkedlist to an array
    const llArr: ListNode[] = [];
    let cur = head;
    while (cur != null) {
        llArr.push(cur);
        cur = cur.next;
    }

    let i = 0;
    let j = llArr.length - 1;
    while (i < j) {
        if (llArr[i].val !== llArr[j].val) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}
