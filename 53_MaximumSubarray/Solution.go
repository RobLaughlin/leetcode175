package maximumsubarray

func MaxSubArray(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}

	best := nums[0]
	for i := 1; i < len(nums); i++ {
		nums[i] = max(nums[i], nums[i-1]+nums[i])
		best = max(best, nums[i])
	}

	return best
}
