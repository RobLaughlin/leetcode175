package decodeways

func getDigit(b byte) int {
	val := (b - '0')
	return int(val)
}

func validSingle(b byte) bool {
	val := getDigit(b)
	return val >= 1 && val <= 9
}

func validDouble(a byte, b byte) bool {
	d1, d2 := getDigit(a), getDigit(b)

	if d1 == 0 || d1 > 2 {
		return false
	}

	if d1 == 2 && d2 >= 7 {
		return false
	}

	return true
}

func NumDecodings(s string) int {
	// Keep of slices of how many sequences that end
	// in a single character or double character
	singles := make([]int, len(s))
	doubles := make([]int, len(s))

	if validSingle(s[0]) {
		singles[0] = 1
	}

	if len(s) == 1 {
		return singles[0]
	}

	if validSingle(s[1]) {
		singles[1] = singles[0]
	}

	if validDouble(s[0], s[1]) {
		doubles[1] = 1
	}

	for i := 2; i < len(s); i++ {
		vs := validSingle(s[i])
		vd := validDouble(s[i-1], s[i])

		if !vs && !vd {
			return 0
		}

		if vs {
			singles[i] = singles[i-1] + doubles[i-1]
		} else {
			singles[i] = 0
		}

		if vd {
			doubles[i] = singles[i-1]
		} else {
			doubles[i] = 0
		}
	}

	last := len(s) - 1
	return singles[last] + doubles[last]
}
