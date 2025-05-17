
#include <vector>
#include <queue>

using namespace std;

class Solution {
    public:
        struct Elem {
            int value;
            int listIdx;
            int idx;
        };
    
        struct ElemComparator {
            bool operator()(const Elem& a, const Elem& b) {
                return a.value > b.value; // Min-heap based on priority
            }
        };
    
        static const vector<int>& minRange(const vector<int>& r1, const vector<int>& r2) {
            if (r1.size() != 2 || r2.size() != 2) {
                return r1;
            }
    
            const int r1size = r1[1] - r1[0];
            const int r2size = r2[1] - r2[0];
            if (r1size == r2size) {
                return r1[0] < r2[0] ? r1 : r2;
            }
    
            return (r1size < r2size) ? r1 : r2;
        }
        
        vector<int> smallestRange(vector<vector<int>>& nums) {
            if (nums.size() == 0 || nums[0].size() == 0) {
                return vector<int>();
            }
    
            priority_queue<Elem, vector<Elem>, ElemComparator> minimums;
            int maximum = nums[0][0];
            vector<int> smallestRange{nums[0][0], maximum};
    
            for (int i = 0; i < nums.size(); i++) {
                const vector<int>& v = nums[i];
                maximum = max(v[0], maximum);
                smallestRange[1] = max(smallestRange[1], v[v.size()-1]);
                smallestRange[0] = min(smallestRange[0], v[0]);
                minimums.push(Elem{v[0], i, 0});
            }
    
            while (minimums.size() == nums.size()) {
                const Elem minimum = minimums.top();
                const int minVal = minimum.value;
                const int i = minimum.listIdx;
                int j = minimum.idx;
                minimums.pop();
    
               
                vector<int> range{minVal, maximum};
                smallestRange = minRange(smallestRange, range);
    
                j++;
                if (j < nums[i].size()) {
                    minimums.push(Elem{nums[i][j], i, j});
                    maximum = max(maximum, nums[i][j]);
                }
            }
    
            return smallestRange;
        }
    };