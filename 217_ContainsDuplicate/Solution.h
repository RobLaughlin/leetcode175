#pragma once
#include <vector>
#include <unordered_set>


class Solution {
public:
    static bool containsDuplicate(const std::vector<int>& nums) {
        std::unordered_set<int> duplicates;
        for (const int& num : nums) {
            if (duplicates.find(num) != duplicates.end()) {
                return true;
            }
            
            duplicates.insert(num);
        }

        return false;
    }
};