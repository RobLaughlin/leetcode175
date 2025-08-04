package combinationsumiv

import "sort"

func CombinationSum4(nums []int, target int) int {
	sort.Ints(nums)
	memo := make(map[int]int)

	var combSum func(elems []int, t int) int
	combSum = func(elems []int, t int) int {
		if t <= 0 {
			return 0
		}

		if combinations, inMemo := memo[t]; inMemo {
			return combinations
		}

		total := 0
		for _, n := range elems {
			newTarget := t - n

			// Allowed to break early because we sorted by smallest element
			if newTarget < 0 {
				break
			}

			if newTarget == 0 {
				total++
				continue
			}

			total += combSum(elems, newTarget)
		}

		memo[t] = total
		return total
	}

	return combSum(nums, target)
}
