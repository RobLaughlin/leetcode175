import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

class FreqStack {
    #frequencies = new Map<number, number>();
    #reverseFrequencies = new Map<number, number[]>();
    #maximums = new MaxPriorityQueue<number>();

    constructor() {}

    push(val: number): void {
        if (!this.#frequencies.has(val)) {
            this.#frequencies.set(val, 0);
        }
        const newFreq = this.#frequencies.get(val)! + 1;
        this.#frequencies.set(val, newFreq);

        if (!this.#reverseFrequencies.has(newFreq)) {
            this.#reverseFrequencies.set(newFreq, []);
            this.#maximums.push(newFreq);
        }

        const values = this.#reverseFrequencies.get(newFreq)!;
        values.push(val);
    }

    pop(): number | null {
        if (!this.#maximums.isEmpty()) {
            const freq: number = this.#maximums.pop()!;
            const values = this.#reverseFrequencies.get(freq)!;
            const val = values.pop()!;

            // Put the frequency back into the max pq if we still have values left
            if (values.length > 0) {
                this.#maximums.push(freq);
            } else {
                this.#reverseFrequencies.delete(freq);
            }

            const newFreq = this.#frequencies.get(val)! - 1;
            this.#frequencies.set(val, newFreq);
            if (newFreq === 0) {
                this.#frequencies.delete(val);
            }

            return val;
        }
        return null;
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
