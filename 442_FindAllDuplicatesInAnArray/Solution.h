#include <vector>

using namespace std;

class Solution {
public:
    /*
        Attempt to map all integers [1, n] to index [0, n-1].
        If we come across a situation where the same number is mapped,
        then the number is a marked as a duplicate.
    */
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> duplicates;
        if (nums.size() == 0) {
            return duplicates;
        }


        
        for (int i = 0; i < nums.size(); i++) {
            // Keep swapping until we get this desired property
            while (nums[i] != i + 1 && nums[i] != 0) {
                int idx = nums[i] - 1;
                int tmp = nums[idx];

                if (tmp == nums[i]) {
                    // After we mark a duplicate, set the value to 0
                    // so we can safely ignore it again.
                    duplicates.push_back(nums[i]);
                    nums[i] = 0;
                    break;
                }

                nums[idx] = nums[i];
                nums[i] = tmp;
            }
        }

        return duplicates;
    }
};