package convert1darrayinto2darray

func Construct2DArray(original []int, m int, n int) [][]int {
	// Not possible to construct 2D array
	if m*n != len(original) {
		return nil
	}

	rows := make([][]int, m)
	for r := range m {
		rows[r] = make([]int, n)
		for c := range n {
			i := r*n + c
			rows[r][c] = original[i]
		}
	}

	return rows
}
