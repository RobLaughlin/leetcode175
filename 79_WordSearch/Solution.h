#include <vector>
#include <unordered_set>
#include <functional>
#include <sstream>
#include <set>

using namespace std;

class Solution {
    public:
        bool exist(vector<vector<char>>& board, string word) {
            if (word.length() == 0) {
                return true;
            }
    
            if (board.size() == 0) {
                return false;
            }
    
            int wordIdx = 0;
            unordered_set<string> indices;
            function<bool(int, int)> backtrack = [&](int row, int col) {
                stringstream ss;
                ss << 'r' << row << 's' << col;
                const string idx = ss.str();
    
                // We found our word match!
                if (wordIdx == word.length()) {
                    return true;
                }
    
                // We've already used this index...
                if (indices.find(idx) != indices.end()) {
                    return false;
                }
               
                // No matches found... :(
                if (
                    row >= board.size() 
                    || col >= board[0].size()
                    || row < 0
                    || col < 0
                ) {
                    return false;
                }
    
                // If we found a match, keep backtracking...
                if (word[wordIdx] == board[row][col]) {
                    indices.insert(idx);
                    wordIdx++;
    
                    bool found =  
                    (
                        backtrack(row-1, col) 
                        || backtrack(row+1, col)
                        || backtrack(row, col+1)
                        || backtrack(row, col-1)
                    );
                    wordIdx--;
                    indices.erase(idx);
    
                    return found;
                }
    
                return false;
            };
    
            // Run a check to make sure we can actually find each character we're given
            multiset<char> validChars;
            for (int i = 0; i < board.size(); i++) {
                for (int j = 0; j < board[0].size(); j++) {
                    const char& c = board[i][j];
                    validChars.insert(c);
                }
            }
    
            for (const char& c : word) {
                auto it = validChars.find(c);
    
                // Not enough characters to satisfy the word given, 
                // no need to continue
                if (it == validChars.end()) {
                    return false;
                }
    
                validChars.erase(it);
            }
    
            for (int i = 0; i < board.size(); i++) {
                for (int j = 0; j < board[0].size(); j++) {
                    if (board[i][j] == word[0]) {
                        if (backtrack(i, j)) {
                            return true;
                        }
                    }
                }
            }
    
            return false;
        }
    };