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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    let curSum = 0;

    function dfs(node: TreeNode | null) {
        if (node === null) {
            return false;
        }

        curSum += node.val;
        if (node.left === null && node.right === null && curSum === targetSum) {
            curSum -= node.val;
            return true;
        }
        const reachedTarget = dfs(node.left) | dfs(node.right);
        curSum -= node.val;
        return reachedTarget;
    }

    return dfs(root);
}
