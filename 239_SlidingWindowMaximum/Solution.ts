import { PriorityQueue } from "@datastructures-js/priority-queue";

type INum = {
    num: number;
    i: number;
};

function INumComparator(a: INum, b: INum) {
    return b.num - a.num;
}

function maxSlidingWindow(nums: number[], k: number): number[] {
    const inums: INum[] = nums.map((num, i) => ({ num, i }));
    const pq = new PriorityQueue<INum>(INumComparator);
    let l = 0;
    let r = k - 1;

    for (let i = 0; i < k; i++) {
        pq.push(inums[i]);
    }

    const maximums: number[] = [];
    while (r < nums.length) {
        // Remove stale indices
        while (pq.front()!.i < l) {
            pq.pop();
        }

        maximums.push(pq.front()!.num);
        l++;
        r++;

        if (r < nums.length) {
            pq.push(inums[r]);
        }
    }

    return maximums;
}
