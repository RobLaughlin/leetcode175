package longestpalindromicsubstring

type RangeSlice struct {
	i int
	j int
}

func LongestPalindrome(s string) string {
	// A map of palindrome slices
	// -> to whether or not the slices contain the same character
	palindromes := make(map[RangeSlice]bool)

	// Init palindromes of length 1
	for i := 0; i < len(s); i++ {
		rs := RangeSlice{i, i}
		palindromes[rs] = true
	}

	maxPalindrome := string(s[0])
	// Build palindrome substrings
	for len(palindromes) > 0 {
		newPalindromes := make(map[RangeSlice]bool)
		for rs, sameChar := range palindromes {
			i, j := rs.i, rs.j

			if sameChar {
				if i-1 >= 0 && s[i-1] == s[i] {
					newRs := RangeSlice{i - 1, j}
					p := s[i-1 : j+1]
					newPalindromes[newRs] = true
					if len(p) > len(maxPalindrome) {
						maxPalindrome = p
					}
					continue
				} else if j+1 < len(s) && s[j] == s[j+1] {
					newRs := RangeSlice{i, j + 1}
					p := s[i : j+2]
					newPalindromes[newRs] = true
					if len(p) > len(maxPalindrome) {
						maxPalindrome = p
					}
					continue
				}
			}

			if i-1 >= 0 && j+1 < len(s) && s[i-1] == s[j+1] {
				newRs := RangeSlice{i - 1, j + 1}
				same := false
				if sameChar && s[i-1] == s[i] && s[j+1] == s[j] {
					same = true
				}

				p := s[i-1 : j+2]
				newPalindromes[newRs] = same
				if len(p) > len(maxPalindrome) {
					maxPalindrome = p
				}
			}

		}
		palindromes = newPalindromes
	}

	return maxPalindrome
}
