package backspacestringcompare

func parseText(s string) (parsed string) {
	var stack []rune

	for _, chr := range s {
		if chr == '#' {
			// Pop from stack
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
		} else {
			// Push to stack
			stack = append(stack, chr)
		}
	}

	return string(stack)
}
func BackspaceCompare(s string, t string) bool {
	return parseText(s) == parseText(t)
}
