#pragma once
#include <vector>

using std::vector;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Assert that every positive integer 1 <= n <= nums.size()
        // maps to index 0 <= i=(n-1) < nums.size()
        for (int i = 0; i < nums.size(); i++) {
            int n = nums[i];

            // While we have a positive integer in range that's out of place,
            // put it into place.
            while (n > 0 && n <= nums.size() && nums[n-1] != n) {
                nums[i] = nums[n-1];
                nums[n-1] = n;
                
                n = nums[i];
            }
        }

        for (int i = 0; i < nums.size(); i++) {
            const int &n = nums[i];
            if (n != i+1) {
                return i+1;
            }
        }

        return nums.size() + 1;
    }
};