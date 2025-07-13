/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

package MergeTwoBinaryTrees

import (
	"github.com/RobLaughlin/leetcode175/LeetcodeStructures"
)

type TreeNode = LeetcodeStructures.TreeNode

func MergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {

	var dfs func(node1 *TreeNode, node2 *TreeNode) *TreeNode
	dfs = func(node1 *TreeNode, node2 *TreeNode) *TreeNode {
		if node1 == nil && node2 == nil {
			return nil
		}

		val := 0
		var n1left *TreeNode = nil
		var n1right *TreeNode = nil
		var n2left *TreeNode = nil
		var n2right *TreeNode = nil

		if node1 != nil {
			val += node1.Val
			n1left = node1.Left
			n1right = node1.Right
		}

		if node2 != nil {
			val += node2.Val
			n2left = node2.Left
			n2right = node2.Right
		}

		var node *TreeNode = &TreeNode{
			Val:   val,
			Left:  dfs(n1left, n2left),
			Right: dfs(n1right, n2right),
		}

		return node
	}

	return dfs(root1, root2)
}
