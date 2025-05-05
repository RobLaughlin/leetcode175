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

    for (TestCase<vector<int>, int> &testcase : TEST_CASES) {
        string teststr = Utility::vec2Str(testcase.test);
        const string expected = std::to_string(testcase.expected);
        
        cout << std::boolalpha << "TEST ";
        cout << teststr << " => ";

        const string fmp = std::to_string(sol.firstMissingPositive(testcase.test));
        cout << fmp << " == " << expected << ": " << (fmp == expected) << endl;
    }
    return 0;
}

