/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    // A 90 degree transform can be decomposed into a transpose and column swap.

    // First, transpose
    for (let r = 0; r < matrix.length; r++) {
        for (let c = r; c < matrix.length; c++) {
            const tmp = matrix[r][c];
            matrix[r][c] = matrix[c][r];
            matrix[c][r] = tmp;
        }
    }

    // Now flip columns
    for (let c = 0; c < Math.floor(matrix.length / 2); c++) {
        for (let r = 0; r < matrix.length; r++) {
            const tmp = matrix[r][c];
            matrix[r][c] = matrix[r][matrix.length - 1 - c];
            matrix[r][matrix.length - 1 - c] = tmp;
        }
    }
}
