import { TNode } from "../TNode";

class WordFilter {
    fixTrie = new TNode();
    maxWordIndices = new Map<string, number>();

    constructor(words: string[]) {
        for (let k = 0; k < words.length; k++) {
            const word = words[k];
            this.maxWordIndices.set(word, k);

            // Add suffix extensions
            let toInsert = `-${word}`;
            this.fixTrie.insert(toInsert);
            for (let i = word.length - 1; i >= 0; i--) {
                toInsert = word[i] + toInsert;
                this.fixTrie.insert(toInsert);
            }
        }
    }

    f(pref: string, suff: string): number {
        const node = this.fixTrie.startsWith(suff + "-" + pref);
        if (node === null) {
            return -1;
        }

        // Get all words with prefix
        let maxIdx = -1;
        function dfs(node: TNode, curWord, maxWordIndices) {
            if (node.word) {
                maxIdx = Math.max(maxWordIndices.get(curWord), maxIdx);
            }

            for (const child of node.getChildNodes()) {
                dfs(child, curWord + child.val, maxWordIndices);
            }
        }

        dfs(node, pref, this.maxWordIndices);
        return maxIdx;
    }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
