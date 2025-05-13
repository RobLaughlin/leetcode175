#include <vector>

using namespace std;

class Solution {
    public:
        int singleNumber(vector<int>& nums) {
            int result = 0;
    
            // We can use the commutativity of XOR to show that XORing all the nums
            // together gives us the desired result.
            for (const int& n : nums) {
                result ^= n;
            }
    
            return result;
        }
    };