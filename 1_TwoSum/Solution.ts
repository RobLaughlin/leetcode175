function twoSum(nums: number[], target: number): number[] {
    const memoized = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        if (!memoized.has(num)) {
            memoized.set(target - num, i);
        } else {
            return [memoized.get(num)!, i];
        }
    }

    return [];
}
