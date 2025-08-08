package palindromicsubstrings

type StrSlice struct {
	i   int
	len int
}

func CountSubstrings(s string) int {

	// Set of (i, l) tuples where i is the index of the character in s
	// and l is the length of the palindrome
	palindromes := make(map[StrSlice]struct{})
	palindromes[StrSlice{0, 1}] = struct{}{}

	// Start with all palindromes of length 1 and 2
	for i := 1; i < len(s); i++ {
		palindromes[StrSlice{i, 1}] = struct{}{}
		if s[i-1] == s[i] {
			palindromes[StrSlice{i - 1, 2}] = struct{}{}
		}
	}

	totalPalindromes := len(palindromes)

	// For each palindrome of length L,
	// construct a palindrome of length L+1 if possible

	for len(palindromes) > 0 {
		newPalindromes := make(map[StrSlice]struct{})
		for p, _ := range palindromes {
			i := p.i
			j := i + p.len
			if i-1 >= 0 && j < len(s) && s[i-1] == s[j] {
				newPalindromes[StrSlice{i - 1, p.len + 2}] = struct{}{}
			}
		}

		palindromes = newPalindromes
		totalPalindromes += len(palindromes)
	}

	return totalPalindromes
}
