#pragma once
#include <vector>
#include "../TestCase.h"

using std::vector;

const auto TEST_CASES = vector<TestCase<vector<int>, int>> {
    TestCase<vector<int>, int>{
        .test = vector<int>{3,0,1}, 
        .expected = 2
    },
    TestCase<vector<int>, int>{
        .test = vector<int>{0,1}, 
        .expected = 2
    },
    TestCase<vector<int>, int>{
        .test = vector<int>{9,6,4,2,3,5,7,0,1}, 
        .expected = 8
    },
};