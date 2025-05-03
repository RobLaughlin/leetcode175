#include <vector>
#include <iostream>

using std::vector;

class Solution {
public:
    vector<int> productExceptSelf(const vector<int>& nums) {
        vector<int> newNums(nums.size());

        vector<int> leftProducts(nums.size(), 1);
        vector<int> rightProducts(nums.size(), 1);

        for (int i = 1; i < nums.size(); i++) {
            int j = nums.size() - 1 - i;
            leftProducts[i] = nums[i-1] * leftProducts[i-1];
            rightProducts[i] = nums[j+1] * rightProducts[i-1];
        }

        for (int i = 0; i < nums.size(); i++) {
            int j = nums.size() - 1 - i;
            newNums[i] = leftProducts[i] * rightProducts[j];
        }

        return newNums;
    }
};