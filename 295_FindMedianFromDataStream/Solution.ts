import {
    MaxPriorityQueue,
    MinPriorityQueue,
} from "@datastructures-js/priority-queue";

class MedianFinder {
    #lHeap = new MaxPriorityQueue<number>();
    #rHeap = new MinPriorityQueue<number>();

    /*
        The idea here is to use two heaps and keep them balanced such that
        finding the median is always easy.

        The two invariants we need to keep are:
        (1) rHeap.size() - lHeap.size() <= 1.
        (2) lHeap.front() <= rHeap.front().

        Since lHeap is a max pq and rHeap is a min pq,
        these two invariants assert that we can find our median in O(1)!
    */
    addNum(num: number): void {
        if (this.#rHeap.size() - this.#lHeap.size() == 0) {
            if (this.#rHeap.size() == 0 || num >= this.#rHeap.front()!) {
                this.#rHeap.push(num);
            } else {
                this.#lHeap.push(num);
                this.#rHeap.push(this.#lHeap.pop()!);
            }
        } else {
            if (this.#lHeap.size() > 0 && num <= this.#lHeap.front()!) {
                this.#lHeap.push(num);
            } else {
                this.#rHeap.push(num);
                this.#lHeap.push(this.#rHeap.pop()!);
            }
        }
    }

    findMedian(): number {
        const evenItems = (this.#rHeap.size() + this.#lHeap.size()) % 2 == 0;

        // Even median
        if (evenItems) {
            return (this.#rHeap.front()! + this.#lHeap.front()!) / 2;
        }

        // Odd median
        return this.#rHeap.front()!;
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
