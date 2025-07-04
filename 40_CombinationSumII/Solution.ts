type Candidate = {
    num: number;
    freq: number;
};

function combinationSum2(candidates: number[], target: number): number[][] {
    const combinations: number[][] = [];
    const hashes = new Set<string>();

    const frequencies = new Map<number, number>();
    candidates.forEach((candidate) => {
        if (!frequencies.has(candidate)) {
            frequencies.set(candidate, 0);
        }

        frequencies.set(candidate, frequencies.get(candidate)! + 1);
    });

    const cands: Candidate[] = Array.from(frequencies.keys()).map((key) => {
        const candidate: Candidate = {
            num: key,
            freq: frequencies.get(key)!,
        };

        return candidate;
    });

    const currentCombination: number[] = [];
    let currentSum = 0;
    function backtrack(i: number, hash = "") {
        if (currentSum === target) {
            const comb = Array.from(currentCombination);
            combinations.push(comb);
            return;
        }

        if (i >= cands.length || currentSum > target || hashes.has(hash)) {
            return;
        }

        const cand: Candidate = cands[i];
        const hashStack: string[] = [hash];
        const totalNums = Math.min(
            Math.ceil((target - currentSum) / cand.num),
            cand.freq
        );

        for (let j = 0; j < totalNums; j++) {
            const top = hashStack[hashStack.length - 1];
            const newHash = top + `${cand.num},`;
            currentCombination.push(cand.num);
            currentSum += cand.num;
            hashStack.push(newHash);
            backtrack(i + 1, newHash);
        }

        for (let j = 0; j < totalNums; j++) {
            currentCombination.pop();
            currentSum -= cand.num;
            hashStack.pop();
            const top = hashStack[hashStack.length - 1];
            backtrack(i + 1, top);
        }

        hashes.add(hash);
    }

    backtrack(0);
    return combinations;
}
