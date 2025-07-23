package graphvalidtree

func ValidTree(n int, edges [][]int) bool {
	// If we run a dfs and encounter a node we've already visited, return false.
	// Or, if we run a dfs and don't hit all our nodes, return false.

	children := make([][]int, n)

	for _, edge := range edges {
		start := edge[0]
		end := edge[1]

		children[start] = append(children[start], end)
		children[end] = append(children[end], start)
	}

	allNodesVisited := false
	totalVisited := make(map[int]struct{})
	visited := make(map[int]struct{})
	var path []int
	var dfs func(node int) (hasCycle bool)
	dfs = func(node int) (hasCycle bool) {
		if _, cycle := visited[node]; cycle {
			return true
		}

		path = append(path, node)
		visited[node] = struct{}{}
		totalVisited[node] = struct{}{}

		if len(totalVisited) >= n {
			allNodesVisited = true
		}

		for _, child := range children[node] {
			// Don't immediately go back in our path
			if len(path) > 1 && path[len(path)-2] == child {
				continue
			}

			cycle := dfs(child)
			if cycle {
				return true
			}
		}

		delete(visited, node)
		path = path[:len(path)-1]
		return false
	}

	return !dfs(0) && allNodesVisited
}
