import { Queue } from "@datastructures-js/queue";
import { TreeNode } from "../TreeNode";
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const nodeq = new Queue<TreeNode | null>();

    nodeq.push(p);
    nodeq.push(q);

    // bfs
    while (!nodeq.isEmpty()) {
        // Divide by 2 cause we're always popping off 2 nodes
        const qsize = Math.floor(nodeq.size() / 2);

        for (let i = 0; i < qsize; i++) {
            const pnode = nodeq.pop();
            const qnode = nodeq.pop();

            // Assert both pnode and qnode are not null
            if (pnode === null && qnode === null) {
                continue;
            }

            if (pnode === null || qnode === null) {
                return false;
            }

            if (pnode.val !== qnode.val) {
                return false;
            }

            nodeq.push(pnode.left);
            nodeq.push(qnode.left);
            nodeq.push(pnode.right);
            nodeq.push(qnode.right);
        }
    }

    return true;
}
