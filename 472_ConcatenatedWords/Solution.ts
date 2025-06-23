function findAllConcatenatedWordsInADict(words: string[]): string[] {
    const root = new TNode();
    for (const word of words) {
        root.insert(word);
    }

    const visited = new Set<string>();
    const validWords = new Set<string>(words);
    const concatWords: string[] = [];
    const curWords: string[] = [];

    function backtrack(node: TNode, curWord = "") {
        if (validWords.has(curWord)) {
            curWords.push(curWord);
            const concatWord = curWords.join("");
            if (visited.has(concatWord)) {
                curWords.pop();
                return;
            }
            visited.add(concatWord);

            if (validWords.has(concatWord) && curWords.length >= 2) {
                concatWords.push(concatWord);
            }

            for (const child of node.getChildNodes()) {
                backtrack(child, child.val!);
            }

            curWords.pop();
        }

        for (const child of node.getChildNodes()) {
            backtrack(child, curWord + child.val);
        }
    }

    backtrack(root);
    return concatWords;
}
