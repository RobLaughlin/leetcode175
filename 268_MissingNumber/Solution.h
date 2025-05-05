#pragma once
#include <vector>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int missingNumber(const vector<int>& nums) {
        const unordered_set<int> numSet = unordered_set<int>(nums.begin(), nums.end()); 

        for (int i = 0; i <= nums.size(); i++) {
            if (numSet.count(i) == 0) {
                return i;
            }
        }

        return 0;
    }
};