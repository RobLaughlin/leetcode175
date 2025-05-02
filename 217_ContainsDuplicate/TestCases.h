#include "../TestCase.h"
#include <vector>

const TestCase<const std::vector<int>, bool> TEST_CASES[3] = {
    TestCase<const std::vector<int>, bool>{
        .test = std::vector<int>{1,2,3,1}, 
        .expected = true
    },
        TestCase<const std::vector<int>, bool>{
        .test = std::vector<int>{1,2,3,4}, 
        .expected = false
    },
        TestCase<const std::vector<int>, bool>{
        .test = std::vector<int>{1,1,1,3,3,4,3,2,4,2}, 
        .expected = true
    }
};