import { PriorityQueue } from "@datastructures-js/priority-queue";

function createMaxComparator(frequencies: Map<number, number>) {
    return (n1: number, n2: number) => {
        const f1 = frequencies.get(n1)!;
        const f2 = frequencies.get(n2)!;

        return f2 - f1;
    };
}

function topKFrequent(nums: number[], k: number): number[] {
    // Populate frequency map
    const frequencies = new Map<number, number>();
    for (const num of nums) {
        if (!frequencies.has(num)) {
            frequencies.set(num, 0);
        }

        frequencies.set(num, frequencies.get(num)! + 1);
    }

    const pq = new PriorityQueue<number>(createMaxComparator(frequencies));
    for (const num of frequencies.keys()) {
        pq.push(num);
    }

    const mostFrequent: number[] = [];
    while (k > 0) {
        mostFrequent.push(pq.pop()!);
        k--;
    }

    return mostFrequent;
}
