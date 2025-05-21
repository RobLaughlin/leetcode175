import { PriorityQueue } from "@datastructures-js/priority-queue";
/**
 * // Definition for an Interval.
 * class Interval {
 *    start: number;
 *    end: number;
 *    constructor(start: number, end: number) {
 *        this.start = start;
 *        this.end = end;
 *    }
 * }
 */

// Definition for an Interval.
class Interval {
    start: number;
    end: number;
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

interface ExtInterval {
    eID: number; // Employee ID
    mID: number; // Meeting ID
}

function createExtIntervalComparator(schedule: Interval[][]) {
    return (a: ExtInterval, b: ExtInterval) => {
        return schedule[a.eID][a.mID].start - schedule[b.eID][b.mID].start;
    };
}

function createExtInterval(eID: number, mID: number): ExtInterval {
    return { eID, mID };
}

function employeeFreeTime(schedule: Interval[][]): Interval[] {
    const comparator = createExtIntervalComparator(schedule);
    const pq = new PriorityQueue<ExtInterval>(comparator);
    const intervals: Interval[] = [];

    let maximum = -Infinity;
    for (let eID = 0; eID < schedule.length; eID++) {
        pq.push(createExtInterval(eID, 0));
    }

    while (!pq.isEmpty()) {
        const { eID, mID } = pq.pop()!;
        const { start, end } = schedule[eID][mID];

        if (isFinite(maximum) && start > maximum) {
            const interval = new Interval(maximum, start);
            intervals.push(interval);
        }
        maximum = Math.max(maximum, end);

        if (mID + 1 < schedule[eID].length) {
            pq.push(createExtInterval(eID, mID + 1));
        }
    }
    return intervals;
}
