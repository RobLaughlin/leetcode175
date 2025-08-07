package jumpgame

func CanJump(nums []int) bool {
	dp := make([]bool, len(nums))
	dp[len(nums)-1] = true

	i := len(nums) - 2
	for i >= 0 {
		jumpLen := nums[i]
		for j := i; j <= min(i+jumpLen, len(nums)-1); j++ {
			if dp[j] {
				dp[i] = dp[j]
				break
			}
		}
		i--
	}

	return dp[0]
}
