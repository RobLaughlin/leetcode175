package longestincreasingsubsequence

func LengthOfLIS(nums []int) int {
	longestSubseq := make([]int, len(nums))
	maxSeq := 1

	for i := len(nums) - 1; i >= 0; i-- {
		maxSubseq := 1
		for j := i + 1; j < len(nums); j++ {
			if nums[i] < nums[j] {
				maxSubseq = max(maxSubseq, 1+longestSubseq[j])
			}
		}
		longestSubseq[i] = maxSubseq
		maxSeq = max(maxSubseq, maxSeq)
	}

	return maxSeq
}
