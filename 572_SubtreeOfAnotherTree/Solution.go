package subtreeofanothertree

import (
	"github.com/RobLaughlin/leetcode175/LeetcodeStructures"
)

type TreeNode = LeetcodeStructures.TreeNode

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func treesEqual(root1 *TreeNode, root2 *TreeNode) bool {
	var dfs func(node1 *TreeNode, node2 *TreeNode) bool
	dfs = func(node1 *TreeNode, node2 *TreeNode) bool {
		if node1 == nil && node2 == nil {
			return true
		}

		if node1 == nil || node2 == nil {
			return false
		}

		valsEqual := node1.Val == node2.Val
		lEqual := dfs(node1.Left, node2.Left)
		rEqual := dfs(node1.Right, node2.Right)
		return valsEqual && lEqual && rEqual
	}

	return dfs(root1, root2)
}

func IsSubtree(root *TreeNode, subRoot *TreeNode) bool {
	if subRoot == nil {
		return true
	}

	var dfs func(node *TreeNode) bool
	dfs = func(node *TreeNode) bool {
		if node == nil {
			return false
		}

		if treesEqual(node, subRoot) {
			return true
		}

		return false || dfs(node.Left) || dfs(node.Right)
	}

	return dfs(root)
}
