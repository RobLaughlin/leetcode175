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
    static void solve(SudokuBoard& b) {
        struct CellState {
            BoardIndex cell;
            unordered_set<char>* possibilities = nullptr;

            CellState(const BoardIndex& idx) : 
                cell(BoardIndex{idx.row, idx.col})
            {};
        };

        vector<BoardIndex> emptyCells = b.m_getEmptyCells();

        vector<CellState> cellStates = vector<CellState>();
        for (const BoardIndex &idx : emptyCells) {
            cellStates.push_back(CellState(idx));
        }

        // Consider sorting the cells initially by the number of possibilities to cut down on time,
        // doesn't seem to save that much time...

        // sort(
        //     cellStates.begin(), 
        //     cellStates.end(), 
        //     [&b](const CellState& c1, const CellState& c2) {
        //         const unordered_set<char>* p1 = b.m_possibilities(c1.cell);
        //         const unordered_set<char>* p2 = b.m_possibilities(c2.cell);
        //         const bool order = p1->size() < p2->size();
        //         delete p1;
        //         delete p2;
                
        //         return order;
        // });

        int i = 0;
        while (!b.solved()) {
            CellState& cs = cellStates[i];

            // If the possibilities haven't been calculated or need to be recalculated
            if (cs.possibilities == nullptr) {
                cs.possibilities = b.m_possibilities(cs.cell);
            }
            
            // If we still have possibilities to check
            if (cs.possibilities->size() > 0) {
                const char possibility = *(cs.possibilities->begin());
                b.setCell(cs.cell, possibility);
                cs.possibilities->erase(possibility);
                i++;
            }

            // Backtrack otherwise
            else {
                b.setCell(cs.cell, '.');
                delete cs.possibilities;
                cs.possibilities = nullptr;
                i--;
            }
        }
    }

    SudokuBoard(const CharBoard& board) :
        m_board(CharBoard(board.size(), vector<char>(board.size(), '-'))),
        m_rowValidChars(vector<unordered_set<char>>(board.size(), unordered_set<char>())),
        m_colValidChars(vector<unordered_set<char>>(board.size(), unordered_set<char>())),
        m_boxValidChars(
            vector<vector<unordered_set<char>>>((int)(board.size() / 3), vector<unordered_set<char>>((int)(board.size() / 3), unordered_set<char>()))
        ) {

        // Initialize the valid characters invariant vectors
        for (int i = 1; i <= board.size(); i++) {
            const char cellChar = static_cast<char>(i + '0');
            
            for (int j = 0; j < board.size(); j++) {
                this->m_rowValidChars[j].insert(cellChar);
                this->m_colValidChars[j].insert(cellChar);
            }

            for (int j = 0; j < (int)(board.size() / 3); j++) {
                for (int k = 0; k < (int)(board.size() / 3); k++) {
                    this->m_boxValidChars[j][k].insert(cellChar);
                }
            } 
        }

        for (unsigned int i = 0; i < board.size(); i++) {
            for (unsigned int j = 0; j < board.size(); j++) {
                const BoardIndex& idx = BoardIndex{i, j};
                this->setCell(idx, board.at(i).at(j));
            }
        }
    }

    SudokuBoard(const SudokuBoard& other) :
        m_board(CharBoard(other.m_board.size(), vector<char>(other.m_board.size(), '-'))),
        m_rowValidChars(vector<unordered_set<char>>(other.m_board.size(), unordered_set<char>())),
        m_colValidChars(vector<unordered_set<char>>(other.m_board.size(), unordered_set<char>())),
        m_boxValidChars(
            vector<vector<unordered_set<char>>>((int)(other.m_board.size() / 3), vector<unordered_set<char>>((int)(other.m_board.size() / 3), unordered_set<char>()))
        ) {

        // Initialize the valid characters invariant vectors
        for (int i = 1; i <= other.m_board.size(); i++) {
            const char cellChar = static_cast<char>(i + '0');
            
            for (int j = 0; j < other.m_board.size(); j++) {
                this->m_rowValidChars[j].insert(cellChar);
                this->m_colValidChars[j].insert(cellChar);
            }

            for (int j = 0; j < (int)(other.m_board.size() / 3); j++) {
                for (int k = 0; k < (int)(other.m_board.size() / 3); k++) {
                    this->m_boxValidChars[j][k].insert(cellChar);
                }
            } 
        }

        for (unsigned int i = 0; i < other.m_board.size(); i++) {
            for (unsigned int j = 0; j < other.m_board.size(); j++) {
                const BoardIndex& idx = BoardIndex{i, j};
                this->setCell(idx, other.m_board.at(i).at(j));
            }
        }
    }

    /*
        Returns the character at the given index, 
        and the character '-' if index is invalid.
    */
    const char at(const BoardIndex &idx) const {
        if (!this->hasIndex(idx)) {
            return '-';
        }

        return this->m_board.at(idx.row).at(idx.col);
    }

    bool solved() const {
        return this->m_emptyCells == 0;
    }

    void setCell(const BoardIndex &idx, char val) {
        if (this->hasIndex(idx)) {
            const auto [row, col] = idx;
            const unsigned int boxRow = row / 3;
            const unsigned int boxCol = col / 3;
            const char c = this->m_board[row][col];

            if (c != '.' && c != '-') {
                this->m_rowValidChars[row].insert(c);
                this->m_colValidChars[col].insert(c);
                this->m_boxValidChars[boxRow][boxCol].insert(c);
            }

            this->m_rowValidChars[row].erase(val);
            this->m_colValidChars[col].erase(val);
            this->m_boxValidChars[boxRow][boxCol].erase(val);
            
            if (val == '.' && c != '.') {
                this->m_emptyCells++;
            }
            else if (val != '.' && c == '.') {
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
            && col < this->m_board.size()
        );
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
    // These are invariants which hold the set of valid characters
    // in a row, column, or sub-box of each square
    vector<unordered_set<char>> m_rowValidChars;
    vector<unordered_set<char>> m_colValidChars;
    vector<vector<unordered_set<char>>> m_boxValidChars;

    CharBoard m_board;
    unsigned int m_emptyCells = 0;

    /*
        Returns all possibilities of characters a cell can be at a given index.
        Take all the valid possibilities of the row, cell, and subbox of the index
        and intersect them.
    */
    unordered_set<char>* m_possibilities(const BoardIndex& idx) const {
        unordered_set<char>* intersected = new unordered_set<char>();

        const auto [row, col] = idx;
        for (const char& c : this->m_rowValidChars[row]) {
            if (this->m_colValidChars[col].find(c) != this->m_colValidChars[col].end()) {
                intersected->insert(c);
            }
        }

        unsigned int boxRow = row / 3;
        unsigned int boxCol = col / 3;
        unordered_set<char>* intersected2 = new unordered_set<char>();
        for (const char& c : *intersected) {
            if (
                this->m_boxValidChars[boxRow][boxCol].find(c) 
                != this->m_boxValidChars[boxRow][boxCol].end()
            ) {
                intersected2->insert(c);
            }
        }
        delete intersected;

        return intersected2;
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
        SudokuBoard b = SudokuBoard(board);
        SudokuBoard::solve(b);

        for (unsigned int i = 0; i < board.size(); i++) {
            for (unsigned int j = 0; j < board.size(); j++) {
                const char &cell = b.at(BoardIndex{i, j});
                board[i][j] = cell;
            }
        }
    }
};