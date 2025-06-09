function permute(nums: number[]): number[][] {
    const permutations: number[][] = [];
    const permutation: number[] = [];

    const excluded = new Set<number>();
    function backtrack() {
        if (permutation.length >= nums.length) {
            permutations.push(Array.from(permutation));
            return;
        }

        // for (const n of inclusion) {
        //     permutation.push(n);
        //     const newInclusion = new Set<number>(inclusion);
        //     newInclusion.delete(n);
        //     backtrack(newInclusion);
        //     permutation.pop();
        // }

        // Don't need to copy sets in the recursive calls
        for (const n of nums) {
            if (!excluded.has(n)) {
                permutation.push(n);
                excluded.add(n);
                backtrack();
                excluded.delete(n);
                permutation.pop();
            }
        }
    }

    backtrack();

    return permutations;
}
