package movezeroes

func swap(a *int, b *int) {
	*a = *a ^ *b
	*b = *a ^ *b
	*a = *a ^ *b
}

func MoveZeroes(nums []int) {
	j := 0
	for i, n := range nums {
		if n != 0 {
			if i != j {
				swap(&nums[i], &nums[j])
			}
			j++
		}
	}
}
