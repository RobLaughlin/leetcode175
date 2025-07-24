package majorityelement

import "math"

func MajorityElement(nums []int) int {
	freq := make(map[int]int)
	mid := int(math.Floor(float64(len(nums) / 2)))

	for _, n := range nums {
		freq[n]++
		if freq[n] > mid {
			return n
		}
	}

	return 0
}
