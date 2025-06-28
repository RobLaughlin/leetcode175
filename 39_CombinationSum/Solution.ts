function combinationSum(candidates: number[], target: number): number[][] {
    const combinations: number[][] = [];
    candidates.sort();

    const combination: number[] = [];

    function backtrack(i: number) {
        if (i >= candidates.length || target < 0) {
            return;
        }

        const cur = candidates[i];
        const maxNums = Math.floor(target / cur);

        for (let k = 0; k < maxNums; k++) {
            combination.push(cur);
            target -= cur;

            if (target === 0) {
                combinations.push(Array.from(combination));
            }
        }

        for (let k = 0; k < maxNums; k++) {
            for (let j = i + 1; j < candidates.length; j++) {
                backtrack(j);
            }
            combination.pop();
            target += cur;
        }
    }

    for (let i = 0; i < candidates.length; i++) {
        backtrack(i);
    }

    return combinations;
}
