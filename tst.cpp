#include <bits/stdc++.h>
using namespace std;

const int N = 1e5+10;

int heights[N];

int dp[N];
int K;

int frog1(int n){
  int cost = INT_MAX;
  if(n==0)return 0;
  if(dp[n] != -1)return dp[n];
  
  for(int i =1;i<=K;i++){
    if(n-i>=0){
      cost = min(cost, frog1(n-i)+abs(heights[n]-heights[n-i]));
  }
  }
  
  return dp[n] = cost;
  
}


int main(){
    memset(dp,-1,sizeof(dp));
  int n;
  cin>>n>>K;
  for(int i =0;i<n;++i){
    cin >> heights[i];
  }
  cout << frog1(n-1);

  return 0;
}