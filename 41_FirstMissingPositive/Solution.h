#pragma once
#include <vector>

using std::vector;

class Solution {
/*
    The constraints tell us that we need to find a solution in O(n) time and O(1) auxillary space.
    This implies an in-place solution.

    My first thought was to simply just map every positive integer 1 <= n <= nums.size() to the
    (n-1)st index, then scan the array one more time and the first slot we see where nums[i] =/= i+1,
    then i+1 would be the least not found positive integer.

    However, when we swap nums[i] and nums[n-1], if n-1 > i, then the possibility exists that
    nums[n-1] is another positive integer in our range that we haven't mapped yet. To remove
    this possibility, we put in a while loop to keep making swaps until we maintain the assertion that
    nums[i] = i+1 if i+1 is in the array.
*/
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