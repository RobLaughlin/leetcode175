function letterCasePermutation(s: string): string[] {
    if (s === "") {
        return [];
    }

    const permutations = new Set<string>();

    function permute(str: string, i: number) {
        if (str.length === s.length) {
            permutations.add(str);
            return;
        }

        if (i >= s.length || permutations.has(str)) {
            return;
        }

        const lower = str + s[i].toLowerCase();
        const upper = str + s[i].toUpperCase();

        permute(lower, i + 1);
        permute(upper, i + 1);
    }

    permute("", 0);
    return Array.from(permutations);
}
