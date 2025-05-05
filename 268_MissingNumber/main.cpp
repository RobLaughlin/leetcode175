#include <iostream>
#include <iomanip>
#include "Solution.h"
#include "TestCases.h"
#include "../Util.h"

using namespace std;

int main() {
    Solution sol;

    cout << boolalpha;
    for (const auto testcase : TEST_CASES) {
        const int n = sol.missingNumber(testcase.test);
        const int expected = testcase.expected;
        cout << "TEST " << Utility::vec2Str(testcase.test);
        cout << " => " << n << " == " << expected << ": " << (n == expected) << endl; 
    }
    
    return 0;
}