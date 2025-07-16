package lettercombinationsofaphonenumber

func LetterCombinations(digits string) []string {
	DIGIT_MAP := map[string]string{
		"2": "abc",
		"3": "def",
		"4": "ghi",
		"5": "jkl",
		"6": "mno",
		"7": "pqrs",
		"8": "tuv",
		"9": "wxyz",
	}

	var combinations []string
	combination := ""

	var backtrack func(i int)
	backtrack = func(i int) {
		if i >= len(digits) {
			if len(combination) > 0 {
				combinations = append(combinations, combination)
			}
			return
		}

		digit := string(digits[i])
		for _, char := range DIGIT_MAP[digit] {
			combination += string(char)
			backtrack(i + 1)
			combination = combination[:len(combination)-1]
		}
	}

	backtrack(0)
	return combinations
}
