function trap(height: number[]): number {
    /**
     * The idea here is that we can collect the total amount of water in each column, if provided:
     * we can get the highest block on the left L(c) and right R(c) of column c.
     * The total amount of rain water is the minimum min{L(c), R(c)} - H(c).
     * If this total is negative, then no rain water is collected, and we just set this to 0.
     */
    const lMaximums = new Array(height.length);
    const rMaximums = new Array(height.length);

    if (height.length > 0) {
        lMaximums[0] = height[0];
        rMaximums[rMaximums.length - 1] = height[height.length - 1];
    }

    for (let i = 1; i < height.length; i++) {
        lMaximums[i] = Math.max(lMaximums[i - 1], height[i]);
        rMaximums[rMaximums.length - 1 - i] = Math.max(
            rMaximums[rMaximums.length - i],
            height[height.length - 1 - i]
        );
    }

    let totalWater = 0;
    for (let i = 1; i < height.length - 1; i++) {
        const lMax = lMaximums[i - 1];
        const rMax = rMaximums[i + 1];
        const water = Math.max(Math.min(rMax, lMax) - height[i], 0);
        totalWater += water;
    }

    return totalWater;
}
