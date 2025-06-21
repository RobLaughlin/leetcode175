function permuteUnique(nums: number[]): number[][] {
    const permutations: number[][] = [];
    const visited = new Set<string>();

    const indices = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        indices.add(i);
    }

    const current: number[] = [];
    function backtrack() {
        const hash = current.toString();
        if (visited.has(hash)) {
            return;
        }
        visited.add(hash);

        if (current.length === nums.length) {
            permutations.push(Array.from(current));
            return;
        }

        for (const i of new Set(indices)) {
            // console.log(i);
            current.push(nums[i]);
            indices.delete(i);
            backtrack();
            indices.add(i);
            current.pop();
        }
    }

    backtrack();
    return permutations;
}
