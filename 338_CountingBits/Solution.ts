function countBits(n: number): number[] {
    const bits: number[] = [];
    bits.push(0);

    // We can setup and follow a recurrence:
    // The number of 1s in b_n is the last bit + the number of 1s
    // in b_(n-1) + the leading bit
    for (let i = 1; i <= n; i++) {
        const prev = Math.floor(i / 2);
        bits.push(bits[prev] + (i % 2));
    }

    return bits;
}
