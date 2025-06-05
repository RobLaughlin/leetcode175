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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    const serialized: string[] = [];

    let id = 0;
    function dfs(node: TreeNode | null) {
        if (node === null) {
            return -1;
        }

        const curID = id;
        id++;
        const lID = dfs(node.left);
        const rID = dfs(node.right);
        serialized.push(`${curID}|${node.val}|${lID}|${rID}`);

        return curID;
    }

    dfs(root);

    return serialized.toString();
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    if (data === "") {
        return null;
    }

    const nodeMap = new Map<number, TreeNode>();
    data.split(",")
        .map((serial) => {
            let [id, val, lID, rID] = serial.split("|").map((v) => Number(v));
            const node = new TreeNode(val);
            nodeMap.set(id, node);
            return { lID, rID, node };
        })
        .forEach((nodeObj) => {
            const { lID, rID, node } = nodeObj;
            node.left = lID === -1 ? null : nodeMap.get(lID)!;
            node.right = rID === -1 ? null : nodeMap.get(rID)!;
        });

    return nodeMap.get(0)!;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
