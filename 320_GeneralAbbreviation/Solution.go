package generalabbreviation

import (
	"strconv"
	"unicode"
)

func GenerateAbbreviations(word string) []string {
	var abbreviations []string

	var curAbbr string = ""
	var backtrack func(charIndex int)
	backtrack = func(charIndex int) {
		// if charIndex > len(word) {
		//     return
		// }

		if charIndex >= len(word) {
			abbreviations = append(abbreviations, curAbbr)
			return
		}
		prevLen := len(curAbbr)

		// Case where we don't abbreviate at all
		curAbbr += string(word[charIndex])
		backtrack(charIndex + 1)
		curAbbr = curAbbr[:prevLen]

		// We can't abbreviate here if we just abbreviated
		if prevLen > 0 && unicode.IsDigit(rune(curAbbr[prevLen-1])) {
			return
		}

		// Run through all possible abbreviations
		for i := charIndex; i < len(word); i++ {
			length := i - charIndex + 1
			curAbbr += strconv.Itoa(length)
			backtrack(i + 1)
			curAbbr = curAbbr[:prevLen]
		}
	}

	backtrack(0)
	return abbreviations
}
