package invertbinarytree

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

import (
	"github.com/RobLaughlin/leetcode175/LeetcodeStructures"
)

type TreeNode = LeetcodeStructures.TreeNode

func InvertTree(root *TreeNode) *TreeNode {
	var dfs func(node *TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}

		dfs(node.Left)
		dfs(node.Right)

		// Swap left and right trees
		tmp := node.Left
		node.Left = node.Right
		node.Right = tmp
	}

	dfs(root)
	return root
}
