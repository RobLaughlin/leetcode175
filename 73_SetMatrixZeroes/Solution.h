#include <utility>
#include <vector>
#include <unordered_set>

using namespace std;
class Solution {
    public:
        typedef pair<int, int> Index;

        /**
         * For every inital zero, zero out the row and column then add the row and column to
         * an unordered set so we don't have to zero them out again
         */
        void setZeroes(vector<vector<int>>& matrix) {
            if (matrix.size() == 0) {
                return;
            }
    
            const int rows = matrix.size();
            const int cols = matrix[0].size();
            unordered_set<int> zeroedRows;
            unordered_set<int> zeroedCols;
            vector<Index> zeroes;
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    if (matrix[i][j] == 0) {
                        zeroes.push_back(Index(i, j));
                    }
                }
            }
    
            for (const Index& idx : zeroes) {
                const int row = idx.first;
                const int col = idx.second;
    
                if (!zeroedRows.count(row)) {
                    for (int c = 0; c < cols; c++) {
                        matrix[row][c] = 0;
                    }
                    zeroedRows.insert(row);
                }
    
                if (!zeroedCols.count(col)) {
                    for (int r = 0; r < rows; r++) {
                        matrix[r][col] = 0;
                    }
                    zeroedCols.insert(col);
                }
            }
        }
    };