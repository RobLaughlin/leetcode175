#include <vector>
#include <iostream>

using std::vector;

class Solution {
/*
    We can compute the left products and the right products of each element in the array and multiply elementwise.
*/
public:
    // For each element, compute the product of all the other products in the array
    vector<int> productExceptSelf(const vector<int>& nums) {
        vector<int> newNums(nums.size());

        // Compute the all the products to the left and right of each element,
        // then multiply elementwise to get the final product for each element
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
    };
};