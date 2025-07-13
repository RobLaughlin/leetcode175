package Solution

func FindTargetSumWays(nums []int, target int) int {
	targetsHit := 0

	var backtrack func(i int, total int)
	backtrack = func(i int, total int) {
		if i == len(nums) && total == target {
			targetsHit++
			return
		}

		if i >= len(nums) {
			return
		}

		backtrack(i+1, total+nums[i])
		backtrack(i+1, total-nums[i])
	}

	backtrack(0, 0)
	return targetsHit
}
