package coinchange

func CoinChange(coins []int, amount int) int {
	if len(coins) == 0 {
		return -1
	}

	// largest := max(coins...)
	// Sort the coins from largest to smallest
	// sort.Sort(sort.Reverse(sort.IntSlice(coins)))
	// sort.Ints(coins)

	var minCoins func(total int) int
	memo := make(map[int]int)
	minCoins = func(total int) int {
		if total < 0 {
			return amount + 1
		}

		if total == 0 {
			return 0
		}

		minAmount, memoized := memo[total]
		if memoized {
			return minAmount
		}

		minAmount = amount + 1
		for _, denom := range coins {
			minAmount = min(minAmount, minCoins(total-denom)+1)
		}

		memo[total] = minAmount
		return minAmount
	}

	// backtrack(amount)
	mc := minCoins(amount)
	if mc == amount+1 {
		return -1
	}

	return mc
}
