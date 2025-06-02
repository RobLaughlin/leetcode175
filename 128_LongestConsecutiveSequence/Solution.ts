function longestConsecutive(nums: number[]): number {
    /**
     * The idea here is to put all the numbers in a set, then for every number,
     * look up and down consecutive integers until we hit a dead end.
     */

    let longest = 0;
    const nSet = new Set(nums);
    for (const n of nSet) {
        let path = 1;

        let higher = n + 1;
        while (nSet.has(higher)) {
            path++;
            nSet.delete(higher);
            higher++;
        }

        let lower = n - 1;
        while (nSet.has(lower)) {
            path++;
            nSet.delete(lower);
            lower--;
        }

        longest = Math.max(longest, path);
    }

    return longest;
}
