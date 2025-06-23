function combine(n: number, k: number): number[][] {
    const combinations: number[][] = [];
    const current: number[] = [];

    function backtrack(num: number) {
        if (current.length === k) {
            combinations.push(Array.from(current));
            return;
        }

        for (let m = num; m <= n; m++) {
            current.push(m);
            backtrack(m + 1);
            current.pop();
        }
    }

    backtrack(1);
    return combinations;
}
