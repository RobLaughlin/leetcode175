#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        unordered_set<int> notIncluded;
        for (int i = 1; i <= nums.size(); i++){
            notIncluded.insert(i);
        }

        for (const int& n : nums) {
            notIncluded.erase(n);
        }

        vector<int> result;
        for (const int& n : notIncluded) {
            result.push_back(n);
        }

        return result;
    }
 };