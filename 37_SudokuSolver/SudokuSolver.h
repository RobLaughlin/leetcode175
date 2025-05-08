#include <vector>
#include <unordered_set>
#include <sstream>

using namespace std;

typedef vector<vector<char>> CharBoard;

struct BoardIndex {
    unsigned int row;
    unsigned int col;
};

class SudokuBoard {
public:
    static SudokuBoard solve(const SudokuBoard& board) {
        struct CellState {
            BoardIndex cell;
            unordered_set<char> possibilities = unordered_set<char>();
            bool initialized = false;

            CellState(const BoardIndex& idx) : cell(BoardIndex{idx.row, idx.col}) {};
        };

        SudokuBoard b = board;
        vector<BoardIndex> emptyCells = b.m_getEmptyCells();

        vector<CellState> cellStates = vector<CellState>();
        for (const BoardIndex &idx : emptyCells) {
            cellStates.push_back(CellState(idx));
        }

        int i = 0;
        while (!b.solved()) {
            auto& [cell, possibilities, initialized] = cellStates[i];

            if (!initialized) {
                possibilities = b.m_possibilities(cell);
                initialized = true;
            }
            
            if (possibilities.size() > 0) {
                const char &possibility = *possibilities.begin();
                b.setCell(cell, possibility);
                possibilities.erase(possibility);
                i++;
            }
            else {
                i--;
                initialized = false;
                b.setCell(cellStates[i].cell, '.');
            }
        }

        return b;
    }

    SudokuBoard(const CharBoard& board) {
        this->m_board = CharBoard(board.size(), vector<char>(board.size(), '.'));

        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board.size(); j++) {
                this->m_board[i][j]  = board[i][j];
                if (board[i][j] == '.') {
                    this->m_emptyCells++;
                }
            }
        }
    }

    SudokuBoard(const SudokuBoard& other) {
        this->m_board = CharBoard(other.m_board.size(), vector<char>(other.m_board.size(), '.'));

        for (int i = 0; i < other.m_board.size(); i++) {
            for (int j = 0; j < other.m_board.size(); j++) {
                this->m_board[i][j]  = other.m_board.at(i).at(j);
            }
        }

        this->m_emptyCells = other.m_emptyCells;
    }

    const char& at(const BoardIndex &idx) const {
        return this->m_board.at(idx.row).at(idx.col);
    }

    bool solved() const{
        return this->m_emptyCells == 0;
    }

    void setCell(const BoardIndex &idx, char val) {
        if (this->hasIndex(idx)) {
            const auto [row, col] = idx;
            if (val == '.' && this->m_board[row][col] != '.') {
                this->m_emptyCells++;
            }
            else if (val != '.' && this->m_board[row][col] == '.') {
                this->m_emptyCells--;
            }
            this->m_board[row][col] = val;
        }
    }

    bool hasIndex(const BoardIndex &idx) const {
        const auto [row, col] = idx;
        return (
            row >= 0 
            && row < this->m_board.size()
            && col >= 0
            && col < this->m_board.size());
    }

    string toString() const {
        stringstream ss;
        for (int i = 0; i < this->m_board.size(); i++) {
            for (int j = 0; j < this->m_board.size(); j++) {
                ss << this->m_board.at(i).at(j);
            }
            ss << '\n';
        }

        return ss.str();
    }

private:
    CharBoard m_board;
    unsigned int m_emptyCells = 0;

    /*
        Returns all possibilities of characters a cell can be at a given index
    */
    unordered_set<char> m_possibilities(const BoardIndex& idx) const {
        unordered_set<char> s;
        for (int i = 1; i <= this->m_board.size(); i++) {
            const char c = static_cast<char>(i + '0');
            s.insert(c);
        }

        auto [row, col] = idx;

        // Remove all possibilities in the cell row
        for (int i = 0; i < this->m_board.size(); i++) {
            const char &c = this->m_board.at(row).at(i);
            if (c != '.') {
                s.erase(c);
            }
        }

        // Remove all possibilities in the cell column
        for (int i = 0; i < this->m_board.size(); i++) {
            const char &c = this->m_board.at(i).at(col);
            if (c != '.') {
                s.erase(c);
            }
        }

        // Remove all possibilities in the 3x3 grid containing the cell
        const unsigned int boxRow = row / 3;
        const unsigned int boxCol = col / 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                const unsigned int boxIdxRow = boxRow*3 + i;
                const unsigned int boxIdxCol = boxCol*3 + j;
                s.erase(this->m_board.at(boxIdxRow).at(boxIdxCol));
            }
        }

        return s;
    }

    /*
        Returns a vector of board indices of empty cells
    */
    vector<BoardIndex> m_getEmptyCells() const {
        vector<BoardIndex> indices;
        for (unsigned int i = 0; i < this->m_board.size(); i++) {
            for (unsigned int j = 0; j < this->m_board.size(); j++) {
                const char &cell = this->m_board.at(i).at(j);
                if (cell == '.') {
                    indices.push_back(BoardIndex{i, j});
                }
            }
        }

        return indices;
    }
};

class Solution {
public:
    void solveSudoku(CharBoard& board) {
        const SudokuBoard b = SudokuBoard(board);
        const SudokuBoard solved = SudokuBoard::solve(b);

        for (unsigned int i = 0; i < board.size(); i++) {
            for (unsigned int j = 0; j < board.size(); j++) {
                const char &cell = solved.at(BoardIndex{i, j});
                board[i][j] = cell;
            }
        }
    }
};