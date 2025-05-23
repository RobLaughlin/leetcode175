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

// Definition for singly-linked list.
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function hasCycle(head: ListNode | null): boolean {
    const visited = new Set<ListNode>();
    let currentNode: ListNode | null = head;
    while (currentNode != null) {
        if (visited.has(currentNode)) {
            return true;
        }

        visited.add(currentNode);
        currentNode = currentNode.next;
    }

    return false;
}
