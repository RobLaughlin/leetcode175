class TNode {
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
            if (cur === null || cur.val !== char) {
                return null;
            }
            cur = cur.getChild(char);
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

function wordSquares(words: string[]): string[][] {
    if (words.length === 0) {
        return [];
    }

    const ROWS = words.length;
    const COLS = words[0].length;
    const SQUARE_SIZE = Math.max(ROWS, COLS);

    const root = new TNode();
    for (const word of words) {
        root.insert(word);
    }

    const nodes: TNode[][] = Array.from({ length: SQUARE_SIZE }, () => [root]);
    const squares: string[][] = [];

    function backtrack(row: number, col: number) {
        // Square found
        if (row >= SQUARE_SIZE) {
            const square = nodes
                .map((nodeList) => {
                    return nodeList
                        .slice(1)
                        .map((node) => node.val)
                        .join("");
                })
                .filter((word) => word.length > 0);
            squares.push(square);
            return;
        }

        if (col >= COLS) {
            backtrack(row + 1, row + 1);
            return;
        }

        const lastRowNode = nodes[row][nodes[row].length - 1];
        for (const child of lastRowNode.getChildNodes()) {
            const lastColNode = nodes[col][nodes[col].length - 1];
            const colChild = lastColNode.getChild(child.val!);

            if (colChild === null) {
                continue;
            }

            nodes[row].push(child);
            if (row !== col) {
                nodes[col].push(colChild);
            }

            backtrack(row, col + 1);
            nodes[col].pop();
            if (row !== col) {
                nodes[row].pop();
            }
        }
    }

    backtrack(0, 0);
    return squares;
}
