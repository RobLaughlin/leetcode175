import { PriorityQueue } from "@datastructures-js/priority-queue";

function createMaxFreqComparator(frequencies: Map<string, number>) {
    return (char1: string, char2: string) => {
        const f1 = frequencies.has(char1) ? frequencies.get(char1) : 0;
        const f2 = frequencies.has(char2) ? frequencies.get(char2) : 0;

        return f2! - f1!;
    };
}

function frequencySort(s: string): string {
    // Have a list of frequencies for each character in s
    const frequencies = new Map<string, number>();

    for (const char of s) {
        if (!frequencies.has(char)) {
            frequencies.set(char, 0);
        }

        frequencies.set(char, frequencies.get(char)! + 1);
    }

    const pq = new PriorityQueue<string>(createMaxFreqComparator(frequencies));
    for (const char of frequencies.keys()) {
        pq.push(char);
    }

    let freqSort = "";
    while (!pq.isEmpty()) {
        const char = pq.pop()!;
        freqSort += char.repeat(frequencies.get(char)!);
    }

    return freqSort;
}
