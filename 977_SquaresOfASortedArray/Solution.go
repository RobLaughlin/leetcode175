package squaresofasortedarray

func SortedSquares(nums []int) []int {
	// Create a slice of negative integers and a slice of non-negative integers,
	// Then merge the two slices

	// will be sorted largest to smallest
	var negatives []int

	// smallest to largest
	var nonnegatives []int

	for _, n := range nums {
		if n < 0 {
			negatives = append(negatives, n*n)
		} else {
			nonnegatives = append(nonnegatives, n*n)
		}
	}

	i := len(negatives) - 1
	j := 0

	sorted := make([]int, 0, len(nums))
	for i >= 0 || j < len(nonnegatives) {
		if i >= 0 && j >= len(nonnegatives) {
			sorted = append(sorted, negatives[i])
			i--
		} else if j < len(nonnegatives) && i < 0 {
			sorted = append(sorted, nonnegatives[j])
			j++
		} else if negatives[i] <= nonnegatives[j] {
			sorted = append(sorted, negatives[i])
			i--
		} else {
			sorted = append(sorted, nonnegatives[j])
			j++
		}
	}

	return sorted
}
