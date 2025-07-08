function combinationSum3(k: number, n: number): number[][] {
    const combinations: number[][] = [];

    let currentTotal = 0;
    const currentCombination: number[] = [];
    const visited = new Set<string>();
    function backtrack(i: number) {
        if (currentCombination.length === k && currentTotal === n) {
            const hash = currentCombination.toString();
            if (!visited.has(hash)) {
                combinations.push(Array.from(currentCombination));
                visited.add(hash);
            }

            return;
        }

        if (currentTotal > n || currentCombination.length > k || i > 9) {
            return;
        }

        currentTotal += i;
        currentCombination.push(i);

        for (let j = i; j <= 9; j++) {
            backtrack(j + 1);
        }

        currentCombination.pop();
        currentTotal -= i;
    }

    for (let i = 1; i <= 9; i++) {
        backtrack(i);
    }

    return combinations;
}
