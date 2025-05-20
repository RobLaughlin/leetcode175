#include <vector>

using namespace std;

class NumArray {
    public:
        vector<int> arr;
        NumArray(vector<int>& nums) : arr(nums), m_sums(nums.begin(), nums.end()) {
            // Cache
            for (int i = 1; i < this->m_sums.size(); i++) {
                this->m_sums[i] += this->m_sums[i-1];
            }
        }
        
        int sumRange(int left, int right) {
            int res = this->m_sums[right];
            if (left >= 1) {
                res -= this->m_sums[left-1];
            }
            return res;
        }
    
    private:
        vector<int> m_sums;
    };
    
    /**
     * Your NumArray object will be instantiated and called as such:
     * NumArray* obj = new NumArray(nums);
     * int param_1 = obj->sumRange(left,right);
     */