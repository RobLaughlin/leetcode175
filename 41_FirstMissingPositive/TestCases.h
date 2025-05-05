#pragma once
#include <vector>
#include "../TestCase.h"

using std::vector;

TestCase<vector<int>, int> TEST_CASES[3] = {
    TestCase<vector<int>, int>{
        .test = vector<int>{1,2,0}, 
        .expected = 3
    },
    TestCase<vector<int>, int>{
        .test = vector<int>{3,4,-1,1}, 
        .expected = 2
    },
    TestCase<vector<int>, int>{
        .test = vector<int>{7,8,9,11,12}, 
        .expected = 1
    },
};