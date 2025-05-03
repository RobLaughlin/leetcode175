#include <iostream>
#include <string>
#include <iomanip>
#include "Solution.h"
#include "TestCases.h"
#include "../Util.h"

using std::cout;
using std::endl;

int main() {
    Solution sol;

    for (TestCase<vector<int>, vector<int>> &testcase : TEST_CASES) {
        string teststr = Utility::vec2Str(testcase.test);
        const string expected = Utility::vec2Str(testcase.expected);
        
        cout << std::boolalpha << "TEST ";
        cout << teststr << " => ";

        const vector<int> nums = sol.productExceptSelf(testcase.test);
        teststr = Utility::vec2Str(nums);
        cout << teststr << " == " << expected << ": " << (teststr == expected) << endl;
    }
    return 0;
}

