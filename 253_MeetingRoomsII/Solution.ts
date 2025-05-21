import { PriorityQueue } from "@datastructures-js/priority-queue";

interface Endpoint {
    time: number;
    endpoint: number;
}

const EndpointComparator = (e1: Endpoint, e2: Endpoint) => {
    if (e1.time == e2.time) {
        return e1.endpoint - e2.endpoint;
    }
    return e1.time - e2.time;
};

function createEndpoint(time: number, endpoint: number): Endpoint {
    return { time, endpoint };
}

function minMeetingRooms(intervals: number[][]): number {
    const pq = new PriorityQueue<Endpoint>(EndpointComparator);
    for (const [l, r] of intervals) {
        pq.push(createEndpoint(l, 1));
        pq.push(createEndpoint(r, -1));
    }

    let maxMeetings = 0;
    let currentMeetings = 0;
    while (!pq.isEmpty()) {
        currentMeetings += pq.pop()!.endpoint;
        maxMeetings = Math.max(currentMeetings, maxMeetings);
    }
    return maxMeetings;
}
