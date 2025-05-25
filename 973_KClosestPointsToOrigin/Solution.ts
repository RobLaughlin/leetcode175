import { PriorityQueue } from "@datastructures-js/priority-queue";

type Point = {
    x: number;
    y: number;
};

function distToOrigin(point: Point) {
    return (point.x ** 2 + point.y ** 2) ** (1 / 2);
}

function kClosest(points: number[][], k: number): number[][] {
    function smallestDistComparator(p1: Point, p2: Point) {
        return distToOrigin(p1) - distToOrigin(p2);
    }

    const distpq = new PriorityQueue<Point>(smallestDistComparator);

    for (const point of points) {
        const [x, y] = point;
        const p: Point = { x, y };
        distpq.push(p);
    }

    const closest: number[][] = [];
    while (k > 0 && !distpq.isEmpty()) {
        const { x, y } = distpq.pop()!;
        closest.push([x, y]);
        k--;
    }

    return closest;
}
