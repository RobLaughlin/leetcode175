#include <vector>
#include <functional>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> paths;

        function<void(TreeNode*, string)> dfs = [&](TreeNode* node, string curPath) {
            if (node == nullptr) {
                return;
            }

            curPath += to_string(node->val);

            // Add path to paths whenever we hit a child node
            if (node->left == nullptr && node->right == nullptr) {
                paths.push_back(curPath);
            }

            dfs(node->left, node->left == nullptr ? curPath : curPath + "->");
            dfs(node->right, node->right == nullptr ? curPath : curPath + "->");
        };

        dfs(root, "");
        return paths;
    }
};