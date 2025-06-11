class Trie2 {
    nodes = new Map<string, TrieNode>();

    insert(word: string): void {
        if (word.length === 0) {
            return;
        }

        let prev: Map<string, TrieNode> | null = null;
        let cur = this.nodes;
        for (const char of word) {
            if (!cur.has(char)) {
                cur.set(char, new TrieNode(char));
            }
            prev = cur;
            cur = cur.get(char)!.children;
        }

        prev!.get(word[word.length - 1])!.word = true;
    }

    search(word: string): boolean {
        if (word.length === 0) {
            return false;
        }

        let prev: Map<string, TrieNode> | null = null;
        let cur = this.nodes;
        for (const char of word) {
            if (!cur.has(char)) {
                return false;
            }
            prev = cur;
            cur = cur.get(char)!.children;
        }

        return prev!.get(word[word.length - 1])!.word;
    }

    startsWith(prefix: string): TrieNode | null {
        let prev: Map<string, TrieNode> | null = null;
        let cur = this.nodes;
        for (const char of prefix) {
            if (!cur.has(char)) {
                return null;
            }
            prev = cur;
            cur = cur.get(char)!.children;
        }

        if (prev === null) {
            return null;
        }

        return prev.get(prefix[prefix.length - 1])!;
    }
}

function indexPairs(text: string, words: string[]): number[][] {
    const t = new Trie2();

    for (const word of words) {
        t.insert(word);
    }

    let i = 0;
    const indices: [number, number][] = [];
    while (i < text.length) {
        let j = i;
        let cur: TrieNode | null | undefined = t.startsWith(text[j]);

        while (cur !== null && cur !== undefined) {
            if (cur.word) {
                indices.push([i, j]);
            }
            j++;

            if (j > text.length) {
                break;
            }
            cur = cur.children.get(text[j]);
        }
        i++;
    }

    return indices;
}
