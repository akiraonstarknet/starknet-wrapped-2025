# Missing Data Fields - Still Hardcoded

This document lists all the data fields that are currently hardcoded in the frontend because they are not available from the current GraphQL API queries.

## Act 1 (Your Starknet Journey) - Missing from `getJourneyData`

### High Priority
1. **gasSavedUSD** - Currently showing 0
   - Need: Gas saved converted to USD value
   - Available: gasSaved in wei (STRK)
   - Calculation needed: gasSaved (wei) → STRK → USD (requires STRK price)

2. **topDapp** - Currently showing 'Unknown'
   - Need: Name of the most used dApp
   - Requires: Transaction analysis to find contract with most interactions

3. **topDappTransactions** - Currently showing 0
   - Need: Number of transactions with the top dApp
   - Requires: Transaction counting per contract

### Medium Priority
4. **totalValueTransacted** - Currently showing 0
   - Need: Total USD value of all transactions
   - Requires: Transaction value analysis with USD conversion

5. **mostActiveMonth** - Currently using protocol count instead
   - Need: Month with most transactions (e.g., "March", "05")
   - Requires: Transaction timestamp analysis by month

### Low Priority
6. **badges** - Currently empty array
   - Need: Badge calculation logic based on achievements
   - Requires: Definition of badge criteria and calculation

---

## Act 2 (Liquid Staking) - Missing from `getWrappedData`

### High Priority
1. **maxStakedBTC** - Currently showing 0
   - Need: Maximum BTC amount staked
   - Available: Only boolean `hasBtcStake`
   - **Required**: Add BTC amount calculation to backend query

2. **minStakedBTC** - Currently showing 0
   - Need: Minimum BTC amount staked
   - Available: Only boolean `hasBtcStake`
   - **Required**: Add BTC amount calculation to backend query

3. **strkValueUSD** - Currently showing 0
   - Need: Current STRK price in USD
   - Suggestion: Use latest value from snapshot_triggers or external price feed

4. **btcValueUSD** - Currently showing 0
   - Need: Current BTC price in USD
   - Suggestion: Use latest value from snapshot_triggers or external price feed

5. **lpValue** - Currently showing 0
   - Need: Total USD value of LP positions
   - **Required**: Add LP value calculation to backend query

6. **lpDuration** - Currently showing 0
   - Need: Number of days LP position has been held
   - **Required**: Add LP duration calculation to backend query

7. **lpProtocol** - Currently showing 'Unknown'
   - Need: Name of protocol where LP is provided ("Troves" | "Ekubo")
   - **Required**: Add protocol identification to backend query

8. **defiTotalValue** - Currently showing 0
   - Need: Total USD value across all DeFi positions
   - **Required**: Add position value calculation to backend query

### Medium Priority
9. **xSTRKValueUSD** - Currently showing 0
   - Need: USD value of xSTRK holdings
   - Requires: xSTRKHoldings * strkValueUSD

10. **avgAPR** - Currently showing 0
    - Need: Average APR across all positions
    - **Required**: Add APR calculation or fetch from protocol data

### Low Priority
11. **badges** - Currently empty array
    - Need: Badge calculation logic
    - Requires: Definition of badge criteria

---

## Act 3 (Native Staking) - Completely Missing from API

### Critical - All Act 3 Data Missing
Act 3 is for STRK & BTC Native Staking, which is not covered by the current queries. All fields are hardcoded:

1. **totalStakedSTRK** - Currently showing 0
2. **totalStakedBTC** - Currently showing 0
3. **validators** - Currently empty array
4. **nativeAPR** - Currently showing 0
5. **rewardsEarnedUSD** - Currently showing 0
6. **stakingDays** - Currently showing 0
7. **firstStakeDate** - Currently showing 'Unknown'
8. **isOGStaker** - Currently false
9. **btcStakeAmount** - Currently showing 0
10. **numberOfValidators** - Currently showing 0
11. **rewardsClaimed** - Currently showing 0
12. **claimFrequency** - Currently showing 'moderate'
13. **avgDaysBetweenClaims** - Currently showing 30
14. **hasSmallValidators** - Currently false
15. **smallValidatorCount** - Currently showing 0
16. **badges** - Currently empty array

**Required**: Create a new GraphQL query for native staking data

---

## Summary

### Immediate Backend Work Needed:
1. Add BTC amount calculations to `getWrappedData` (currently only returns boolean)
2. Add LP position details (value, duration, protocol) to `getWrappedData`
3. Add DeFi position USD values to `getWrappedData`
4. Create new query for Act 3 (Native Staking) data
5. Add top dApp analysis to `getJourneyData`
6. Add current token prices to response (or fetch separately)

### Frontend Work Needed:
1. Install dependencies: `pnpm add graphql graphql-request`
2. Create `.env` file with `VITE_GRAPHQL_ENDPOINT=http://localhost:4001/graphql`
3. Implement badge calculation logic (when criteria are defined)

### Currently Working:
- ✅ Max/Min STRK staked (Act 2)
- ✅ Season 1 rank (Act 2)
- ✅ Top 1000 status (Act 2)
- ✅ Diamond Hands (held during low price) (Act 2)
- ✅ Has LP Position (Act 2)
- ✅ DeFi protocols list (Act 2)
- ✅ Staking duration days (Act 2)
- ✅ Total transactions (Act 1)
- ✅ Gasless transactions count (Act 1)
- ✅ Gas saved in STRK (Act 1)
- ✅ Account age (Act 1)
- ✅ Protocols explored count (Act 1)
