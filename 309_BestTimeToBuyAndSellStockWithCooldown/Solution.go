package besttimetobuyandsellstockwithcooldown

func MaxProfit(prices []int) int {
	if len(prices) <= 1 {
		return 0
	}

	// mp[d] is the maximum profit up until and including day d,
	// with mp[d][0] is when a stock isn't held and mp[d][1] is when
	// a stock is held.
	mp := make([][2]int, len(prices))

	// The first day
	mp[0][1] = -prices[0]

	// The second day
	mp[1][1] = max(mp[0][1], -prices[1])
	mp[1][0] = max(mp[0][1]+prices[1], mp[0][0])

	maxProfit := max(mp[1][1], mp[1][0], mp[0][1], mp[0][0])
	for i := 2; i < len(prices); i++ {
		mp[i][1] = max(mp[i-2][0]-prices[i], mp[i-1][1])
		mp[i][0] = max(mp[i-1][1]+prices[i], mp[i-1][0])
		maxProfit = max(mp[i][1], mp[i][0])
	}

	return maxProfit
}
