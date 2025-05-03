#pragma once
#include <vector>
#include "../TestCase.h"

using std::vector;

TestCase<vector<int>, vector<int>> TEST_CASES[2] = {
    TestCase<vector<int>, vector<int>>{
        .test = vector<int>{1,2,3,4}, 
        .expected = vector<int>{24,12,8,6}
    },
    TestCase<vector<int>, vector<int>>{
        .test = vector<int>{-1,1,0,-3,3}, 
        .expected = vector<int>{0,0,9,0,0}
    }
};