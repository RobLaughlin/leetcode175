import { PriorityQueue } from "@datastructures-js/priority-queue";

type Sentence = {
    msg: string;
    freq: number;
};

type Search = {
    current: string;
    possibleCompletions: PriorityQueue<Sentence>; // Indices of sentence array
};

function SentenceComparator(a: Sentence, b: Sentence) {
    // Sort by hottest sentences
    const delta = b.freq - a.freq;
    if (delta === 0) {
        // ASCII-Code order
        const minLength = Math.min(a.msg.length, b.msg.length);
        for (let i = 0; i < minLength; i++) {
            const lCode = a.msg.charCodeAt(i);
            const rCode = b.msg.charCodeAt(i);
            const charDelta = lCode - rCode;
            if (charDelta !== 0) {
                return charDelta;
            }
        }

        return a.msg.length - b.msg.length;
    }

    return delta;
}

class AutocompleteSystem {
    #searchStack: Search[] = [];
    #history = new Map<string, number>();

    constructor(sentences: string[], times: number[]) {
        const history = new PriorityQueue<Sentence>(SentenceComparator);
        for (let i = 0; i < sentences.length; i++) {
            const sentence: Sentence = {
                msg: sentences[i],
                freq: times[i],
            };
            history.push(sentence);
            this.#history.set(sentences[i], times[i]);
        }

        this.#searchStack.push({
            current: "",
            possibleCompletions: history,
        });
    }

    input(c: string): string[] {
        const top = { ...this.#searchStack[this.#searchStack.length - 1] };

        if (c === "#") {
            if (!this.#history.has(top.current)) {
                this.#history.set(top.current, 0);
            }

            this.#history.set(top.current, this.#history.get(top.current)! + 1);
            const histories: Sentence[] = Array.from(this.#history.keys()).map(
                (key) => {
                    return {
                        msg: key,
                        freq: this.#history.get(key)!,
                    };
                }
            );

            this.#searchStack = [];
            this.#searchStack.push({
                current: "",
                possibleCompletions: PriorityQueue.fromArray<Sentence>(
                    histories,
                    SentenceComparator
                ),
            });
            return [];
        }

        top.current += c;
        const newCompletions = new PriorityQueue<Sentence>(SentenceComparator);
        const autoCompletions: string[] = [];

        top.possibleCompletions.toArray().forEach((sentence) => {
            if (sentence.msg.startsWith(top.current)) {
                newCompletions.push(sentence);

                if (autoCompletions.length < 3) {
                    autoCompletions.push(sentence.msg);
                }
            }
        });

        this.#searchStack.push({
            current: top.current,
            possibleCompletions: newCompletions,
        });

        return autoCompletions;
    }
}

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */
