#include <unordered_set>
#include <string>
#include <vector>
#include <functional>
#include <sstream>

using namespace std;
class Solution {
public:
    static unordered_set<int> generatePossibleSquares(const int& n) {
        unordered_set<int> squares = unordered_set<int>();
        for (int i = 0; i < n*n; i++) {
            squares.insert(i);
        }

        return squares;
    }

    static string hashVec(const vector<int>& vec) {
        stringstream ss;
        for (const int& i : vec) {
            ss << i << '-';
        }
        return ss.str();
    }

    static vector<vector<string>> formatSolutions(
        const int& n,
        const vector<vector<int>>& solutions
    )
    {
        
        vector<string> solutionTemplate = vector<string>(n, string(n, '.'));
        vector<vector<string>> formatted;

        for (const vector<int>& solution : solutions) {
            formatted.push_back(solutionTemplate);
            vector<string>& last = formatted[formatted.size()-1];

            for (const int& queen : solution) {
                const int row = queen / n;
                const int col = queen % n;

                last[row][col] = 'Q';
            }
        } 

        return formatted;
    }

    static bool clearsQueens(
        const int& n, 
        const int& square, 
        const vector<int>& queens
    ) {
        bool intersects = true;
        const int row = square / n;
        const int col = square % n;

        for (const int& queen : queens) {
            const int qRow = queen / n;
            const int qCol = queen % n;

            const bool sameRow = row == qRow;
            const bool sameCol = col == qCol;
            const bool sameDiag = abs(row - qRow) == abs(col - qCol);

            intersects = intersects && !sameDiag && !sameRow && !sameCol;
            if (!intersects) {
                return false;
            }
        }

        return true;
    }

    vector<vector<string>> solveNQueens(int n) {
        vector<string> grid(n, string(n, '.'));
        vector<vector<string>> solutions;
        unordered_set<int> invalidPosDiags;
        unordered_set<int> invalidNegDiags;
        unordered_set<int> invalidRows;
        unordered_set<int> invalidCols;

        auto validSquare = [&](const int& row, const int& col) 
        {
            return (
                !invalidPosDiags.count(row + col) && 
                !invalidNegDiags.count(row - col) &&
                !invalidRows.count(row) &&
                !invalidCols.count(col)
            );
        };

        function<void(int)> dfs = [&](int row) {
            if (row >= n) {
                solutions.push_back(grid);
            }
            else {
                for (int col = 0; col < n; col++) {
                    if (validSquare(row, col)) {
                        const int posDiag = row + col;
                        const int negDiag = row - col;
                        grid[row][col] = 'Q';
                        invalidPosDiags.insert(posDiag);
                        invalidNegDiags.insert(negDiag);
                        invalidRows.insert(row);
                        invalidCols.insert(col);
                        dfs(row+1);
                        invalidPosDiags.erase(posDiag);
                        invalidNegDiags.erase(negDiag);
                        invalidRows.erase(row);
                        invalidCols.erase(col);
                        grid[row][col] = '.';
                    }
                }
            }
        };

        dfs(0);
        return solutions;
    }
};