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

function maxDepth(root: TreeNode | null): number {
    let maxDepth = 0;

    function dfs(node: TreeNode | null, depth = 1) {
        if (node === null) {
            return;
        }

        if (node.left === null && node.right === null) {
            maxDepth = Math.max(maxDepth, depth);
            return;
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }

    dfs(root);
    return maxDepth;
}
