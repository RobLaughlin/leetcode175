#include <vector>
#include <iostream>

using std::vector;

class Solution {
/*
    We can compute the left products and the right products of each element in the array and multiply elementwise.
*/
public:
    // For each element, compute the product of all the other products in the array
    vector<int> productExceptSelf(const vector<int>& nums);
};