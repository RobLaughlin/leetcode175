#include <unordered_map>
#include <functional>

using namespace std;

class Solution {
    public:
        /*
        * Use recursion with memoization to determine the answer.
        */
        int climbStairs(int n) {
            int ways = 0;
    
            unordered_map<int, int> wayMap;
            function<int(int)> numWays = [&](int m) {
                if (m <= 2) {
                    return max(m, 0);
                }
    
                if (wayMap.count(m) > 0) {
                    return wayMap[m];
                }
                
                wayMap[m] = numWays(m-1) + numWays(m-2);
                return wayMap[m];
            };
    
            return numWays(n);
        }
    };