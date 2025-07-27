package houserobberii

func rob1(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}

	// Keep track of how much you can rob from the first k houses
	maximums := make([]int, len(nums))

	// nums is guaranteed to have length > 1 at this point
	maximums[0] = nums[0]
	maximums[1] = max(nums[0], nums[1])

	for i := 2; i < len(nums); i++ {
		maximums[i] = max(maximums[i-1], maximums[i-2]+nums[i])
	}

	return maximums[len(nums)-1]
}

func Rob(nums []int) int {
	l := len(nums)
	if l == 1 {
		return nums[0]
	}

	return max(rob1(nums[:l-1]), rob1(nums[1:]))
}
