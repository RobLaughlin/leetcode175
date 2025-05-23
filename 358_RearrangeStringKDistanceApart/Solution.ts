import { PriorityQueue } from "@datastructures-js/priority-queue";
import { Queue } from "@datastructures-js/queue";

type Char = string;

interface LockedChar {
    char: Char;
    frequency: number;
    idx: number;
}

function LockedCharComparator(lc1: LockedChar, lc2: LockedChar) {
    const delta = lc2.frequency - lc1.frequency;
    if (delta == 0) {
        return lc1.char.charCodeAt(0) - lc2.char.charCodeAt(0);
    }
    return delta;
}

function rearrangeString(s: string, k: number): string {
    const frequencies = new Map();
    // const queue = new Queue<PriorityChar>
    for (const char of s) {
        if (!frequencies.has(char)) {
            frequencies.set(char, 0);
        }
        frequencies.set(char, frequencies.get(char) + 1);
    }

    const pq = new PriorityQueue<LockedChar>(LockedCharComparator);
    const locked = new Queue<LockedChar>();
    for (const char of frequencies.keys()) {
        const lc: LockedChar = {
            char,
            frequency: frequencies.get(char),
            idx: 0,
        };
        pq.push(lc);
    }

    let rearrangement = "";

    while (!pq.isEmpty() || !locked.isEmpty()) {
        if (
            !locked.isEmpty() &&
            rearrangement.length >= locked.front().idx + k
        ) {
            pq.push(locked.pop());
        }
        if (pq.isEmpty()) {
            return "";
        }
        const lc: LockedChar = pq.pop()!;
        rearrangement += lc.char;

        if (rearrangement.length === s.length) {
            return rearrangement;
        }
        if (lc.frequency > 1) {
            locked.push({
                char: lc.char,
                frequency: lc.frequency - 1,
                idx: rearrangement.length - 1,
            });
        }
    }

    return "";
}
