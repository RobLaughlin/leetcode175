import {
    MaxPriorityQueue,
    MinPriorityQueue,
} from "@datastructures-js/priority-queue";

function medianSlidingWindow(nums: number[], k: number): number[] {
    const lHeap = new MaxPriorityQueue<number>();
    const rHeap = new MinPriorityQueue<number>();
    const invalid = new Map<number, number>();
    // let balance = 0;
    let l = 0;
    let r = k;

    // Heap initialization
    for (let i = 0; i < r; i++) {
        lHeap.push(nums[i]);
    }

    for (let i = 0; i < Math.floor(r / 2); i++) {
        rHeap.push(lHeap.pop()!);
    }

    console.log(lHeap.toArray());
    console.log(rHeap.toArray());

    function addNum(num: number) {
        const invalidNum: number = nums[l];

        if (!invalid.has(invalidNum)) {
            invalid.set(invalidNum, 1);
        } else {
            invalid.set(invalidNum, invalid.get(invalidNum)! + 1);
        }

        let balance = 0;
        balance += invalidNum <= lHeap.front()! ? -1 : 1;

        if (lHeap.size() == 0 || num <= lHeap.front()!) {
            lHeap.push(num);
            balance++;
        } else {
            rHeap.push(num);
            balance--;
        }

        // Re-balance
        if (balance < 0) {
            lHeap.push(rHeap.pop()!);
            balance++;
        }

        if (balance > 0) {
            rHeap.push(lHeap.pop()!);
            balance--;
        }

        while (!lHeap.isEmpty() && invalid.get(lHeap.front()!)! > 0) {
            const toRemove = lHeap.front()!;
            lHeap.pop();
            invalid.set(toRemove, invalid.get(toRemove)! - 1);
        }

        while (!rHeap.isEmpty() && invalid.get(rHeap.front()!)! > 0) {
            const toRemove = rHeap.front()!;
            rHeap.pop();
            invalid.set(toRemove, invalid.get(toRemove)! - 1);
        }
    }

    function getMedian(): number {
        if (k % 2 == 0) {
            return (lHeap.front()! + rHeap.front()!) / 2;
        } else {
            return lHeap.front()!;
        }
    }

    const medians: number[] = [getMedian()];
    while (r < nums.length) {
        addNum(nums[r]);
        medians.push(getMedian());
        l++;
        r++;
    }

    return medians;
}
