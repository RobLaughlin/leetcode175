function subsetsWithDup(nums: number[]): number[][] {
    const subsets: number[][] = [];
    const subset: number[] = [];
    const visited = new Set<string>();
    let inclusionBits = 0;

    function backtrack(i: number) {
        const hash = subset.toSorted().toString();
        if (!visited.has(hash)) {
            visited.add(hash);
            subsets.push(Array.from(subset));
        }

        if (i >= nums.length) {
            return;
        }

        // Include i
        subset.push(nums[i]);
        backtrack(i + 1);
        subset.pop();

        // Don't include i
        backtrack(i + 1);
    }

    backtrack(0);
    return subsets;
}
