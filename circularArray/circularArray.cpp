#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <iomanip>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    int n, k, q;

    cin >> n >> k >> q;

    //cout << n << " " << k << " " << q << endl;
    vector<int> values;
    for(int index = 0; index < n; index++) {
        int temp;
        cin >> temp;
        values.push_back(temp);
    }

    vector<int> queries;
    for(int index = 0; index < q; index++) {
        int temp;
        cin >> temp;
        queries.push_back(temp);
    }

    for(int index = 0; index < k; index++) {
        vector<int>::iterator it;

        int temp = 0;
        temp = values.back();

        values.pop_back();
        it = values.begin();

        it = values.insert(it, temp);

        // for(it = values.begin(); it != values.end(); it++)
        //     cout << setw(10) << *it;

        // cout << endl;
    }

    for(int index = 0; index < q; index++) {
        cout << values[queries[index]] << endl;
    }

    return 0;
}
