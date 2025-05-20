#include <vector>
using namespace std;

class Solution {
    public:
        /*
            Create a vector M such that M[i] is the maximum of all the prices
            to the right of M[i] including M[i].
    
            Then, start from the beginning and choose the maximum profit by
            taking deltas between prices and maximums.
        */
        int maxProfit(vector<int>& prices) {
            if (prices.size() == 0) {
                return 0;
            }
    
            vector<int> maximums(prices.size(), 0);
            int maximum = prices[prices.size()-1];
            for (int i = prices.size()-1; i >= 0; i--) {
                maximum =  max(maximum, prices[i]);
                maximums[i] = maximum;
            }
    
            int mp = 0;
            for (int i = 0; i < prices.size(); i++) {
                mp = max(mp, maximums[i] - prices[i]);
            }
    
            return mp;
    
            // Brute force
            // int mp = 0;
    
            // for (int i = 0; i < prices.size(); i++) {
            //     for (int j = i+1; j < prices.size(); j++) {
            //         mp = max(mp, prices[j] - prices[i]);
            //     }
            // }
    
            // return mp;
        }
    };