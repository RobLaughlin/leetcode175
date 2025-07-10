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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;

    function dfs(node: TreeNode | null) {
        if (node === null) {
            return 0;
        }

        if (!node.left && !node.right) {
            return 1;
        }

        const lLength = dfs(node.left);
        const rLength = dfs(node.right);
        diameter = Math.max(rLength + lLength, diameter);
        return Math.max(lLength, rLength) + 1;
    }

    dfs(root);
    return diameter;
}
