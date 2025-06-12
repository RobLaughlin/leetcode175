class Trie3 {
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

    remove(word: string): boolean {
        if (word.length === 0) {
            return false;
        }

        const nodeStack: TrieNode[] = [];

        let cur = this.nodes;
        for (const char of word) {
            if (!cur.has(char)) {
                return false;
            }
            nodeStack.push(cur.get(char)!);
            cur = cur.get(char)!.children;
        }

        const lastNode = nodeStack[nodeStack.length - 1];
        if (!lastNode.word) {
            return false;
        }

        lastNode.word = false;

        // Prune the trie
        nodeStack.pop();

        let i = word.length - 1;
        while (nodeStack.length > 0) {
            let toPrune = nodeStack.pop()!;
            const char = word[i];
            const node = toPrune.children.get(char)!;
            if (node.children.size === 0 && !node.word && i >= 0) {
                toPrune.children.delete(char);
            } else {
                return true;
            }
            i--;
        }

        return true;
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

function findWords(board: string[][], words: string[]): string[] {
    const ROWS = board.length;
    const COLS = board.length > 0 ? board[0].length : 1;

    function validCell(row: number, col: number) {
        const validRow = row >= 0 && row < ROWS;
        const validCol = col >= 0 && col < COLS;

        return validRow && validCol;
    }

    const prefixes = new Trie3();
    for (const word of words) {
        prefixes.insert(word);
    }

    let curPrefix = prefixes.nodes;
    const boardWords = new Set<string>();
    const visited = new Set<string>();

    function backtrack(curWord: string, row: number, col: number) {
        if (!validCell(row, col)) {
            return;
        }

        const hash = [row, col].toString();
        if (visited.has(hash)) {
            return;
        }
        visited.add(hash);

        curWord += board[row][col];
        if (
            curPrefix.has(board[row][col]) &&
            curPrefix.get(board[row][col])!.word
        ) {
            boardWords.add(curWord);

            // Prune the trie
            prefixes.remove(curWord);
        }

        // Early exit
        if (boardWords.size >= words.length) {
            visited.delete(hash);
            return;
        }

        // Only keep looking if we have to
        const prevPrefix = curPrefix;
        if (curPrefix.has(board[row][col])) {
            curPrefix = curPrefix.get(board[row][col])!.children;
            backtrack(curWord, row + 1, col);
            backtrack(curWord, row - 1, col);
            backtrack(curWord, row, col + 1);
            backtrack(curWord, row, col - 1);
        }
        curPrefix = prevPrefix;
        visited.delete(hash);
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            backtrack("", row, col);
        }
    }

    return Array.from(boardWords);
}
