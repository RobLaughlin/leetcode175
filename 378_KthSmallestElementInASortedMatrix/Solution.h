#include <unordered_set>
#include <queue>
using namespace std;

class Solution {
    public:
        struct Elem {
            int val;
            int i;
            int j;
    
            bool operator==(const Elem& other) const {
                return this->i == other.i && this->j == other.j;
            }
        };
    
        struct ElemGreater {
            bool operator() (const Elem& e1, const Elem& e2) const {
                return e1.val > e2.val;
            }
        };
    
        struct ElemHasher {
            size_t operator() (const Elem& e1) const {
                size_t seed = e1.i ^ e1.j;
                return seed + 0x9e3779b9 + (seed << 6) + (seed >> 2); 
            }
        };
    
        int kthSmallest(vector<vector<int>>& matrix, int k) {
            const int n = matrix.size();
            unordered_set<Elem, ElemHasher> visited;
            priority_queue<Elem, vector<Elem>, ElemGreater> pq;
    
            pq.push(Elem{matrix[0][0], 0, 0});
            while (!pq.empty()) {
                const Elem elem = pq.top();
                if (visited.count(elem) > 0) {
                    pq.pop();
                    continue;
                }
                
                k--;
                if (k == 0) {
                    break;
                }
    
                
                pq.pop();
    
    
                visited.insert(elem);
                const int& i = elem.i;
                const int& j = elem.j;
    
                if ((i + 1) < n) {
                    pq.push(Elem{matrix[i+1][j], i+1, j});
                }
    
                if ((j + 1) < n) {
                    pq.push(Elem{matrix[i][j+1], i, j+1});
                }
            }
    
            return pq.top().val;
        }
    };