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

function minDepth(root: TreeNode | null): number {
    let minDepth = Infinity;

    if (root === null) {
        return 0;
    }

    function dfs(node: TreeNode | null, depth = 1) {
        if (node === null) {
            return;
        }

        // Leaf node
        if (node.left === null && node.right === null) {
            minDepth = Math.min(depth, minDepth);
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root);

    return minDepth;
}
