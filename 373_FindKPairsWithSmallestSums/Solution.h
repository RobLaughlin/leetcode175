#include <vector>
#include <queue>
#include <unordered_set>

using namespace std;

class Solution {
    public:
        struct Pair {
            int sum;
            int i;
            int j;
    
            bool operator== (const Pair& other) const {
                return this->i == other.i && this->j == other.j;
            }
        };
    
        struct PairGreater {
            bool operator() (const Pair& p1, const Pair& p2) const {
                return p1.sum > p2.sum;
            }
        };
    
        struct PairHasher {
            size_t operator() (const Pair& pair) const {
                size_t hashed = pair.i ^ pair.j;
                hashed += 0x9e3779b9 + (hashed << 6) + (hashed >> 2);
                return hashed;
            }
        };
        
        vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
            vector<vector<int>> pairs;
            priority_queue<Pair, vector<Pair>, PairGreater> pq;
            unordered_set<Pair, PairHasher> visited;
            pq.push(Pair{nums1[0]+nums2[0], 0, 0});
    
            while (k > 0) {
                const Pair pair = pq.top();
                const auto& [sum, i, j] = pair;
                pq.pop();
    
                if (visited.count(pair) > 0) {
                    continue;
                }
    
                pairs.push_back(vector<int>{nums1[i], nums2[j]});
                visited.insert(pair);
                k--;
    
                if (i+1 < nums1.size()) {
                    pq.push(Pair{nums1[i+1]+nums2[j], i+1, j});
                }
    
                if (j+1 < nums2.size()) {
                    pq.push(Pair{nums1[i]+nums2[j+1], i, j+1});
                }
            }
    
            return pairs;
        }
    };