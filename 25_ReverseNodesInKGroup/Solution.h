#include <stack>

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
    /**
     * Use a stack to build all the nodes to reverse,
     * then link them as we pop off the stack. Uses O(n) time and space.
     * 
     * Maybe we can find an O(1) space solution using recursion?
     */
    ListNode* reverseKGroup(ListNode* head, int k) {
        stack<ListNode*> nodes;
        ListNode* cur = head;
        int n = k;
        while (n > 0) {
            if (cur == nullptr) {
                return head;
            }
            nodes.push(cur);
            cur = cur->next;
            n--;
        }

        cur = nodes.top();
        ListNode* last = cur->next;
        head = cur;
        nodes.pop();
        
        while (!nodes.empty()) {
            ListNode* next = nodes.top();
            nodes.pop();
            cur->next = next;
    
            cur = next;
        }
        cur->next = last;
        cur->next = reverseKGroup(cur->next, k);
        return head;
    }
};