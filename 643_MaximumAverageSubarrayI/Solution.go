package maximumaveragesubarrayi

func FindMaxAverage(nums []int, k int) float64 {
	var curAvg float64 = 0.0

	kf := float64(k)
	for i := 0; i < k; i++ {
		curAvg += float64(nums[i]) / kf
	}

	maxAvg := curAvg

	// Sliding Window
	i := 0
	for j := k; j < len(nums); j++ {
		curAvg += float64(nums[j]) / kf
		curAvg -= float64(nums[i]) / kf
		maxAvg = max(curAvg, maxAvg)
		i++
	}

	return maxAvg
}
