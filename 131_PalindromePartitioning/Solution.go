package palindromepartitioning

func isPalindrome(s string) bool {
	i := 0
	j := len(s) - 1

	for i <= j {
		if s[i] != s[j] {
			return false
		}
		i++
		j--
	}

	return true
}

func Partition(s string) [][]string {
	var partitions [][]string
	var partition []string

	var backtrack func(i int)
	backtrack = func(i int) {
		if i >= len(s) {
			partitionCopy := make([]string, len(partition))
			copy(partitionCopy, partition)
			partitions = append(partitions, partitionCopy)
			return
		}

		for j := i; j < len(s); j++ {
			substr := s[i : j+1]
			if isPalindrome(substr) {
				partition = append(partition, substr)
				backtrack(j + 1)
				partition = partition[0 : len(partition)-1]
			}
		}
	}

	backtrack(0)
	return partitions
}
