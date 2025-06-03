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

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function maxPathSum(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    // If root node is a leaf node
    if (root.left === null && root.right === null) {
        return root.val;
    }

    let maxPath = -Infinity;
    function dfs(node: TreeNode | null) {
        if (node === null) {
            return 0;
        }

        const lSum = dfs(node.left);
        const rSum = dfs(node.right);

        // Max path of this node
        const mp = Math.max(node.val, node.val + lSum, node.val + rSum);

        // We can't choose both subtrees in our path return,
        // so we take the maximum as a "final path"
        maxPath = Math.max(mp, node.val + lSum + rSum, maxPath);
        return mp;
    }

    dfs(root);

    return maxPath;
}
