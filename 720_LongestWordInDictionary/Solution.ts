import { Queue } from "@datastructures-js/queue";

class TrieNode {
    children = new Map<string, TrieNode>();
    word = false;
    val: string | null = null;

    constructor(val: string | null = null, isWord = false) {
        this.val = val;
        this.word = isWord;
    }

    getWordNodes(): TrieNode[] {
        return Array.from(this.children.values()).filter((node) => node.word);
    }
}

class WordTrie extends Trie {
    nodes = new Map<string, TrieNode>();

    getWordNodes(): TrieNode[] {
        return Array.from(this.nodes.values()).filter((node) => node.word);
    }
}

function longestWord(words: string[]): string {
    type Word = {
        word: string;
        node: TrieNode;
    };

    const prefixes = new WordTrie();
    for (const word of words) {
        prefixes.insert(word);
    }

    const q = new Queue<Word>();
    for (const node of prefixes.getWordNodes()) {
        q.push({
            word: node.val!,
            node,
        });
    }

    let longestWords = new Set<string>(
        prefixes.getWordNodes().map((node) => node.val!)
    );

    while (!q.isEmpty()) {
        // console.log(longestWords);
        const newLongestWords = new Set<string>();
        let newWords: Word[] = [];
        while (!q.isEmpty()) {
            const word = q.pop();
            newWords = newWords.concat(
                word.node.getWordNodes().map((wc) => {
                    newLongestWords.add(word.word + wc.val);
                    return {
                        word: word.word + wc.val,
                        node: wc,
                    };
                })
            );
        }
        for (const newWord of newWords) {
            q.push(newWord);
        }

        if (newLongestWords.size > 0) {
            longestWords = newLongestWords;
        }
    }

    const sortedWords = Array.from(longestWords);
    sortedWords.sort();
    // console.log(sortedWords);
    if (sortedWords.length > 0) {
        return sortedWords[0];
    }

    return "";
}
