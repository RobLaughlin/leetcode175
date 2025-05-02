#include <iostream>
#include <iomanip>
#include "Solution.h"
#include "TestCases.h"

using namespace std;

int main() {
    cout << boolalpha;
    for (const TestCase<const std::vector<int>, bool> &testcase : TEST_CASES) {
        cout << "TEST <";
        for (const int& i : testcase.test) {
            cout << i << ',';
        }
        const bool passed = static_cast<bool>(Solution::containsDuplicate(testcase.test)) == testcase.expected;
        cout << '>' << " PASSED: " << passed << endl;
    } 
    return 0;
}