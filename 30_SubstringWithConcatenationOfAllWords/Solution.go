package substringwithconcatenationofallwords

func FindSubstring(s string, words []string) []int {
	// Frequencies of each word
	wordFreq := make(map[string]int, len(words))
	concatWords := make(map[string]struct{})
	totalWords := 0
	var indices []int

	// Initialize our word frequencies
	for _, word := range words {
		wordFreq[word]++
		totalWords++
	}

	// Length of words is guaranteed to be > 0, so this is safe
	wordLen := len(words[0])

	var concatWord string
	var backtrack func(i int, prevIndex int)
	backtrack = func(i int, prevIndex int) {
		// Get the total length of the concat word
		concatLen := totalWords * wordLen

		// Return early if it's impossible to make the concat word
		if i+max(concatLen, wordLen) > len(s) {
			return
		}

		if prevIndex == -1 {
			prevIndex = i
		}

		// Return early if we've already made the concat word
		fullConcat := s[i : i+concatLen]
		_, alreadyMade := concatWords[fullConcat]
		if alreadyMade && prevIndex == i {
			indices = append(indices, i)
			backtrack(i+1, -1)
			return
		}

		substr := s[i : i+wordLen]
		_, substrIsWord := wordFreq[substr]
		if substrIsWord {
			concatWord += substr
			totalWords--
			wordFreq[substr]--

			// Delete our word if our frequency hits 0
			if wordFreq[substr] == 0 {
				delete(wordFreq, substr)
			}

			// If our word set is empty, we've found a concatenation
			if len(wordFreq) == 0 {
				indices = append(indices, prevIndex)
				concatWords[concatWord] = struct{}{}
			}

			backtrack(i+wordLen, prevIndex)
			wordFreq[substr]++
			totalWords++
			concatWord = concatWord[:len(concatWord)-wordLen]
		}

		// Continue onto the next character in the string
		if prevIndex == i {
			backtrack(i+1, -1)
		}

	}

	backtrack(0, -1)

	return indices
}
