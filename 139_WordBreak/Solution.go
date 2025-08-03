package wordbreak

import "sort"

func WordBreak(s string, wordDict []string) bool {
	words := make(map[string]struct{}, len(wordDict))
	wordLengthSet := make(map[int]struct{})
	var wordLengths []int
	for _, word := range wordDict {
		words[word] = struct{}{}
		if _, lengthAdded := wordLengthSet[len(word)]; !lengthAdded {
			wordLengthSet[len(word)] = struct{}{}
			wordLengths = append(wordLengths, len(word))
		}
	}

	// Sort from least to greatest so we can exit early if we can't build a word
	sort.Ints(wordLengths)

	dp := make([]bool, len(s)+1)
	dp[len(s)] = true

	for i := len(s) - 1; i >= 0; i-- {
		for j := 0; j < len(wordLengths); j++ {
			wordLength := wordLengths[j]

			// If we can't build a word we might as well exit early
			if i+wordLength > len(s) {
				break
			}

			substr := s[i : i+wordLength]
			if _, wordExists := words[substr]; wordExists {
				dp[i] = dp[i+wordLength]
				if dp[i] {
					break
				}
			}
		}
	}

	return dp[0]
}
