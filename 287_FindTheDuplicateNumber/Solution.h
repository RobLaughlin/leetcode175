#include <vector>

using std::vector;

class Solution {
/*
    Had to look up the solution for this one. A very important technique to keep in mind
    is to think about the search space not just of the array you're given,
    but also the search space of monotonic functions applied to elements of your input.

    Especially monotonic functions that can give a hint about where the solution might
    exist. For example, the count function C(A, n) in this solution is monotonic, and so
    binary search can be applied to it. Moreover, the result returned from C(A, n) hints
    to where the solution might be. These 2 properties make C(A, n) a good candidate for
    a solution.

    In simple binary search for example, B(a, n) just returns whether a >= n,
    and the minimum value a in A where a >= n holds must imply a = n. 
    Similarly, the minimum value where C(A, n) holds, when the number of elements of A
    bounded above by n is > n itself, then the duplicate must be <= n, which is why
    we shift our search space to the left.

    The intuition here is that when thinking about how binary search can be applied,
    think about monotonic functions on your input space, and think about how functions
    on elements in your input space can tell you whether to look right or left.
*/
public:
    // Counts the number of integers in nums for which are <= n
    int count(const vector<int> &nums, const int &n) {
        int c = 0;
        for (const int &k : nums) {
            if (k <= n) {
                c++;
            }
        }
        return c;
    }

    int findDuplicate(const vector<int>& nums) {
        // Binary search solution
        int l = 1;
        int r = nums.size();

        while (l <= r) {
            const int mid = (l + r) / 2;

            // The minimum for which this property holds must be the duplicate value.
            // If we know that there are 6 elements in nums
            // which are bounded above by 5, the duplicate must be <= 5.
            if (count(nums, mid) > mid) {
                r = mid - 1;
            }
            else {
                l = mid + 1;
            }
        }

        return l;

        // Brute force solution
        // for (int i = 0; i < nums.size(); i++) {
        //     for (int  j = 0; j < nums.size(); j++) {
        //         if (i == j) { continue; }

        //         if (nums[i] == nums[j]) {
        //             return nums[i];
        //         }
        //     }
        // }
        // return -1;
    }
};