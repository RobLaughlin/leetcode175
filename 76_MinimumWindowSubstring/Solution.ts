import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function minWindow(s: string, t: string): string {
    const tFrequencies = new Map<string, number>();
    const indices = new Map<string, number[]>();
    const pq = new MinPriorityQueue<number>();
    let minRange: [number, number] = [0, s.length - 1];
    let curMaxIndex = -1;

    for (const char of t) {
        if (!tFrequencies.has(char)) {
            tFrequencies.set(char, 0);
        }

        tFrequencies.set(char, tFrequencies.get(char)! + 1);
    }

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (!tFrequencies.has(char)) {
            continue;
        }

        if (!indices.has(char)) {
            indices.set(char, []);
        }
        indices.get(char)!.push(i);
    }

    for (const [char, freq] of tFrequencies) {
        // Return early if a substring isn't even possible
        if (!indices.has(char) || indices.get(char)!.length < freq) {
            return "";
        }

        // Sort indices from largest to smallest.
        // This will allow us to pop an index off the stack
        // when adding to the min heap.
        const charIndices = indices.get(char)!;
        charIndices.sort((a, b) => b - a);
        for (let i = 0; i < freq; i++) {
            const lastIndex = charIndices.pop()!;
            curMaxIndex = Math.max(curMaxIndex, lastIndex);
            pq.push(lastIndex);
        }
    }

    while (!pq.isEmpty()) {
        const i = pq.pop()!;

        // Found a smaller window
        const curWindowLength = minRange[1] - minRange[0];
        const windowLength = curMaxIndex - i;
        if (windowLength < curWindowLength) {
            minRange = [i, curMaxIndex];
        }

        // If we can't get any more of this character,
        // we might as well exit the loop
        const char = s[i];
        const charIndices = indices.get(char)!;
        if (charIndices.length === 0) {
            break;
        }

        // Put next instnace of this character on the priority queue
        const nextIndex = charIndices.pop()!;
        curMaxIndex = Math.max(curMaxIndex, nextIndex);
        pq.push(nextIndex);
    }

    if (minRange[0] >= 0 && minRange[1] < s.length) {
        return s.slice(minRange[0], minRange[1] + 1);
    }

    return "";
}
