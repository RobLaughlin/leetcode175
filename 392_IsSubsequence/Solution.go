package issubsequence

func IsSubsequence(s string, t string) bool {
	if s == "" {
		return true
	}

	i := 0
	for j := 0; j < len(t); j++ {
		if t[j] == s[i] {
			i++
			if i >= len(s) {
				return true
			}
		}
	}

	return false
}
