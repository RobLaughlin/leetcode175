package uniquepaths

import "math"

func UniquePaths(m int, n int) int {
	// The number of unique paths is ((m-1)+(n-1) choose (n-1)).
	// Compute binomial coefficients using logarithms to prevent overflow
	logSums := make([]float64, m+n-1)
	for i := 1; i < m+n-1; i++ {
		logSums[i] = math.Log2(float64(i)) + logSums[i-1]
	}

	result := logSums[m+n-2] - logSums[n-1] - logSums[m-1]
	return int(math.Round(math.Pow(2, result)))
}
