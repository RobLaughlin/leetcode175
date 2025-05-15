#include <vector>
#include <set>

using namespace std;

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
    public:
        /*
        * We can store each list node in a multiset by value and tie in the corresponding
        * index for the list in which that node lives in.
        *
        * Every time we pop a node from the multiset, we can stick it in our linked list,
        * and move the pointer along the corresponding linked list.
        *
        * The total size of the multiset is m, the number of lists given.
        * If n is the max size of a list we're given, then
        * each insert and removal in the multiset is O(lg m),
        * giving O(nlg m) time complexity and O(n + m) space.
        */
        ListNode* mergeKLists(vector<ListNode*>& lists) {
            struct NodeVal {
                int val;
                int idx;
    
                bool operator<(const NodeVal& other) const {
                    return val < other.val;
                }
            };
    
            struct ValComparator {
                size_t operator()(const NodeVal& nv1, const NodeVal& nv2) const
                {
                    return nv1 < nv2;
                }
            };
    
            // Initialize choices multiset, pick the first value of each list
            multiset<NodeVal, ValComparator> choices;
            for (int i = 0; i < lists.size(); i++) {
                const ListNode* const list = lists[i];
                if (list != nullptr) {
                    choices.insert(NodeVal{list->val, i});
                }
            }
            
            ListNode* head = nullptr;
            ListNode* cur = head;
            while (!choices.empty()) {
                // Choose the minimum value in our current list of choices
                auto minVal = choices.begin();
                const int& val = minVal->val;
                const int& idx = minVal->idx;
    
                // Stick it in our new linked list
                if (cur == nullptr) {
                    head = new ListNode(val);
                    cur = head;
                }
                else {
                    cur->next = new ListNode(val);
                    cur = cur->next;
                }
    
                ListNode* node = lists[idx];
    
                // If we can continue iterating along this list,
                // then do so. We can delete nodes that aren't used anymore as we iterate.
                if (node->next != nullptr) {
                    choices.insert(NodeVal{node->next->val, idx});
                    lists[idx] = node->next;
    
                    // Optionally delete nodes as we iterate through each list
                    // delete node;
                }
                choices.erase(minVal);
            }
    
            return head;
        }
    };