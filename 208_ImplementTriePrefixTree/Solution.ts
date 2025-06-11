class TrieNode {
    children = new Map<string, TrieNode>();
    word = false;
    val: string | null = null;

    constructor(val: string | null = null, isWord = false) {
        this.val = val;
        this.word = isWord;
    }
}

class Trie {
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

    startsWith(prefix: string): boolean {
        let cur = this.nodes;
        for (const char of prefix) {
            if (!cur.has(char)) {
                return false;
            }
            cur = cur.get(char)!.children;
        }

        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
