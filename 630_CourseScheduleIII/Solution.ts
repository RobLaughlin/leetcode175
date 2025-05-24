import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function scheduleCourse(courses: number[][]): number {
    courses.sort((a, b) => {
        return a[1] - b[1];
    });

    const pq = new MaxPriorityQueue<number>();
    let totalTime = 0;
    let maxCourses = 0;
    for (const [time, end] of courses) {
        if (time > end) {
            continue;
        }

        pq.push(time);
        totalTime += time;
        if (totalTime > end) {
            const mostTime: number = pq.pop()!;
            totalTime -= mostTime;
            maxCourses--;
        }
        maxCourses++;
    }

    return maxCourses;
}
