#include <sstream>
#include <string>

using std::stringstream;

namespace Utility {
    template <class T>
    std::string vec2Str(const vector<T> &vec) {
        stringstream ss;
        ss << '<';
        for (int i = 0; i < vec.size(); i++) {
            const T &elem = vec[i];
            ss << elem;

            if (i != vec.size() - 1) {
                ss << ',';
            }
        }
        ss << '>';

        return ss.str();
    };
}
