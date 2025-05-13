#include <vector>
#include <functional>

using namespace std;

class Solution {
    public:
        vector<vector<int>> subsets(vector<int>& nums) {
            vector<vector<int>> ssets;
            vector<int> subset;
    
            function<void(int)> generate = [&](int i) {
                if (i >= nums.size()) {
                    ssets.push_back(subset);
                    return;
                }
    
                // We don't include nums[i]
                generate(i+1);
    
                // We do include nums[i]
                subset.push_back(nums[i]);
                generate(i+1);
                subset.pop_back();
            };
            
            generate(0);
    
            return ssets;
        } 
    };