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

function averageOfLevels(root: TreeNode | null): number[] {
    const averages: number[] = [];

    // bfs
    let q = new Queue<TreeNode | null>();
    q.push(root);

    while (!q.isEmpty()) {
        let numLevelNodes = 0;
        let avg = 0;

        const qSize = q.size();
        for (let i = 0; i < qSize; i++) {
            const node = q.pop();
            if (!node) {
                continue;
            }
            avg += node.val;
            numLevelNodes++;

            if (node.left) {
                q.push(node.left);
            }

            if (node.right) {
                q.push(node.right);
            }
        }

        avg = numLevelNodes === 0 ? 0 : avg / numLevelNodes;
        averages.push(avg);
    }
    return averages;
}
