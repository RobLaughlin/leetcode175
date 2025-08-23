package coinchangeii

type CKey struct {
	n int
	k int
}

func Change(amount int, coins []int) int {
	memo := make(map[CKey]int)

	// var stack []int
	var combinations func(n int, k int) int
	combinations = func(n int, k int) int {
		if n < 0 || k <= 0 {
			return 0
		}

		if n == 0 {
			return 1
		}

		key := CKey{n, k}
		if amount, inMemo := memo[key]; inMemo {
			return amount
		}

		lastCoin := coins[k-1]
		memo[key] = combinations(n-lastCoin, k) + combinations(n, k-1)
		return memo[key]
	}

	return combinations(amount, len(coins))
}
