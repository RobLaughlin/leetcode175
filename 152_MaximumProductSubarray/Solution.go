package maximumproductsubarray

func MaxProduct(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}

	mp := float64(nums[0])
	minimums := make([]int, len(nums))
	minimums[0] = nums[0]

	maximums := make([]int, len(nums))
	maximums[0] = nums[0]

	for i := 1; i < len(maximums); i++ {
		minimums[i] = min(minimums[i-1]*nums[i], nums[i], maximums[i-1]*nums[i])
		maximums[i] = max(maximums[i-1]*nums[i], nums[i], minimums[i-1]*nums[i])
		mp = max(float64(maximums[i]), mp)
	}

	return int(mp)
}
