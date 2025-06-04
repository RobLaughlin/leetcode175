function spiralOrder(matrix: number[][]): number[] {
    /**
     * Run along the top, right, bottom, then back up left in clockwise order.
     * We keep track of visited squares to make sure we don't do any backtracking.
     */
    if (matrix.length === 0) {
        return [];
    }
    const ROWS = matrix.length;
    const COLS = matrix[0].length;
    const TOTAL_NUMS = ROWS * COLS;
    const DELTAS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

   
    let row = 0;
    let col = 0;
    let level = 0;
    function outOfBounds(row: number, col: number) {
        return (
            row < level 
            || row >= ROWS - level
            || col < level
            || col >= COLS - level
        );
    }

    const squaresCovered: number[] = [];
    while (squaresCovered.length < TOTAL_NUMS) {
        const visited = new Set<string>();
        if (!outOfBounds(row, col)) {
            squaresCovered.push(matrix[row][col]);
            visited.add(JSON.stringify([row, col]))
        }
        
        for (const [rD, cD] of DELTAS) {
            while (
                !outOfBounds(row + rD, col + cD)
                && !visited.has(JSON.stringify([row + rD, col + cD])))
            {
                row += rD;
                col += cD;
                visited.add(JSON.stringify([row, col]))
                squaresCovered.push(matrix[row][col]);
            }
        }

        level++;
        row = level;
        col = level;
    }

    return squaresCovered;
};