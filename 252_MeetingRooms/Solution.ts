function canAttendMeetings(intervals: number[][]): boolean {
    if (intervals.length === 0) {
        return true;
    }

    // Sort by left endpoint
    intervals.sort((a: number[], b: number[]) => {
        return a[0] - b[0];
    });

    // Check for interval overlap
    for (let i = 0; i < intervals.length - 1; i++) {
        const [l, r] = intervals[i];
        const [j, k] = intervals[i + 1];

        // If overlap
        if (Math.max(l, j) < Math.min(r, k)) {
            return false;
        }
    }

    return true;
}
