#pragma once
#include <vector>
#include <string>

using std::vector;
using std::string;

namespace Utility {
    template <typename T>
    string vec2Str(const vector<T> &vec);
};

#include "Util.tpp"

