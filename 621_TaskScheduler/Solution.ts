import { PriorityQueue } from "@datastructures-js/priority-queue";
import { Queue } from "@datastructures-js/queue";

interface Task {
    instruction: string;
    frequency: number;
    lock: number;
}

function taskComparator(t1: Task, t2: Task) {
    return t2.frequency - t1.frequency;
}

function leastInterval(tasks: string[], n: number): number {
    const frequencies = new Map();
    for (const task of tasks) {
        if (!frequencies.has(task)) {
            frequencies.set(task, 0);
        }
        frequencies.set(task, frequencies.get(task) + 1);
    }

    // Max heap of tasks based on frequency
    const pq = new PriorityQueue<Task>(taskComparator);
    for (const task of frequencies.keys()) {
        const t: Task = {
            instruction: task,
            frequency: frequencies.get(task),
            lock: 0,
        };
        pq.push(t);
    }

    let cycle = 0;
    const locked = new Queue<Task>();
    while (!pq.isEmpty() || !locked.isEmpty()) {
        if (!locked.isEmpty() && locked.front().lock <= cycle) {
            // Unlock the task
            pq.push(locked.pop());
        }

        if (!pq.isEmpty()) {
            const task: Task = pq.pop()!;
            task.lock = cycle + n + 1;
            task.frequency--;
            if (task.frequency > 0) {
                locked.push(task);
            }
        }

        cycle++;
    }
    return cycle;
}
