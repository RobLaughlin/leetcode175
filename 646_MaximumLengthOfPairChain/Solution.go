package maximumlengthofpairchain

import "sort"

func findMinNextPair(pairs [][]int, i int) int {
	// Assumes pairs is sorted

	// Do binary search to find the smallest element p such that
	// p > target
	target := pairs[i][1] + 1

	l := 0
	r := len(pairs) - 1
	next := -1
	for l <= r {
		mid := int((r + l) / 2)
		elem := pairs[mid][0]

		if target <= elem {
			next = mid
			r = mid - 1
		} else {
			l = mid + 1
		}
	}

	return next
}

func FindLongestChain(pairs [][]int) int {
	sort.Slice(pairs, func(i, j int) bool {
		return pairs[i][0] < pairs[j][0]
	})

	validChains := make([]int, len(pairs))
	for i := 0; i < len(pairs); i++ {
		validChains[i] = findMinNextPair(pairs, i)
	}

	memo := make(map[int]int)
	indexSet := make(map[int]struct{}, len(pairs))
	for i := 0; i < len(pairs); i++ {
		indexSet[i] = struct{}{}
	}

	var dfs func(i int) int
	dfs = func(i int) int {
		if longestChain, inMemo := memo[i]; inMemo {
			return longestChain
		}

		minIndex := 0
		if i > -1 {
			minIndex = validChains[i]
		}

		if minIndex == -1 {
			return 1
		}

		longest := 1
		for j := minIndex; j < len(pairs); j++ {
			longest = max(longest, 1+dfs(j))
		}

		memo[i] = longest
		return memo[i]
	}

	return dfs(-1) - 1
}
