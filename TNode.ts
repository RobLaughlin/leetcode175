export class TNode {
    children = new Map<string, TNode>();
    word = false;
    val: string | null = null;

    constructor(val: string | null = null, isWord = false) {
        this.val = val;
        this.word = isWord;
    }

    insert(word: string): void {
        if (word.length === 0) {
            return;
        }

        let cur: TNode = this;
        for (const char of word) {
            if (cur.getChild(char) === null) {
                cur.children.set(char, new TNode(char));
            }

            // Guaranteed to exist
            cur = cur.getChild(char) as TNode;
        }

        cur.word = true;
    }

    search(word: string): TNode | null {
        if (word.length === 0) {
            return null;
        }

        let cur: TNode | null = this;
        for (const char of word) {
            if (cur === null || cur.val !== char) {
                return null;
            }
            cur = cur.getChild(char);
        }

        return cur !== null && cur.word ? cur : null;
    }

    startsWith(prefix: string): TNode | null {
        if (prefix.length === 0) {
            return null;
        }

        let cur: TNode | null = this;
        for (const char of prefix) {
            cur = cur.getChild(char);
            if (cur === null || cur.val !== char) {
                return null;
            }
        }

        return cur;
    }

    getChild(val: string): TNode | null {
        if (this.children.has(val)) {
            return this.children.get(val) as TNode;
        }

        return null;
    }

    getChildNodes(): TNode[] {
        return Array.from(this.children.values());
    }
}
