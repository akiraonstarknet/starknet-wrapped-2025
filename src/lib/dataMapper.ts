import type { WrappedDataResponse, JourneyDataResponse } from '../types/api';
import type { UserWrappedData } from '../types/user';

// Helper: Convert wei to token amount (divide by 10^18)
function weiToToken(wei: string): number {
  const weiValue = BigInt(wei.split('.')[0]);
  const divisor = BigInt(10 ** 18);
  return Number(weiValue / divisor);
}

// Helper: Convert timestamp to date string
function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Helper: Calculate days since timestamp
function daysSince(timestamp: number): number {
  const now = Date.now() / 1000;
  return Math.floor((now - timestamp) / 86400);
}

export function mapApiDataToUserData(
  wrappedData: WrappedDataResponse,
  journeyData: JourneyDataResponse,
  walletAddresses: string[]
): Partial<UserWrappedData> {
  // Map Act 1 data from journeyData
  const gasSavedSTRK = weiToToken(journeyData.gasSaved);
  
  const act1 = {
    accountAge: journeyData.startedSince ? daysSince(journeyData.startedSince) : 0,
    firstTxDate: journeyData.startedSince ? timestampToDate(journeyData.startedSince) : 'Unknown',
    totalTransactions: journeyData.totalTransactions,
    gasSavedUSD: gasSavedSTRK, // HARDCODED - needs calculation from gas price
    gasSavedETH: 0, // Gas saved in STRK (not ETH, but showing as token value)
    mostActiveMonth: journeyData.protocolsExplored.length.toString(), // Using protocols count instead
    totalValueTransacted: 0, // HARDCODED - not available from API
    uniqueContracts: journeyData.protocolsExplored.length,
    topDapp: 'Unknown', // HARDCODED - not available from API
    topDappTransactions: 0, // HARDCODED - not available from API
    badges: [], // HARDCODED - badge logic not implemented yet
    // Store gasless count for potential use in cards
    gaslessTransactionsCount: journeyData.gaslessTransactionsCount,
  } as any;

  // Map Act 2 data from wrappedData
  const maxStrkStaked = Number(wrappedData.stakingStats.maxStrkStaked);
  const minStrkStaked = Number(wrappedData.stakingStats.minStrkStaked);

  const act2 = {
    xSTRKHoldings: maxStrkStaked, // Using max as current holdings
    xSTRKValueUSD: 0, // HARDCODED - needs current STRK price
    protocolsUsed: wrappedData.defiProtocols,
    lpPositions: wrappedData.hasQualifyingLpPosition ? 1 : 0,
    avgAPR: 0, // HARDCODED - not available from API
    season1Points: wrappedData.season1Rank?.weightedPoints 
      ? Number(wrappedData.season1Rank.weightedPoints)
      : 0,
    season1Rank: wrappedData.season1Rank?.rank 
      ? wrappedData.season1Rank.rank <= 100 
        ? 'Diamond' 
        : wrappedData.season1Rank.rank <= 500 
        ? 'Platinum' 
        : 'Gold'
      : 'None',
    stakingDays: wrappedData.stakingDurationDays,
    minStakedSTRK: minStrkStaked,
    maxStakedSTRK: maxStrkStaked,
    minStakedBTC: 0, // HARDCODED - API only returns boolean
    maxStakedBTC: 0, // HARDCODED - API only returns boolean
    strkValueUSD: 0, // HARDCODED - needs current price
    btcValueUSD: 0, // HARDCODED - needs current price
    userRank: wrappedData.season1Rank?.rank || 0,
    isTop1000: (wrappedData.season1Rank?.rank || 0) <= 1000 && (wrappedData.season1Rank?.rank || 0) > 0,
    hasLPPosition: wrappedData.hasQualifyingLpPosition,
    lpValue: 0, // HARDCODED - not available from API
    lpDuration: 0, // HARDCODED - not available from API
    lpProtocol: 'Unknown', // HARDCODED - not available from API
    endurStakingDays: wrappedData.stakingDurationDays,
    isLongTermStaker: wrappedData.stakingDurationDays >= 90,
    isDiamondHand: wrappedData.heldXstrkDuringLowPrice,
    maxXSTRKHeld: maxStrkStaked,
    hasDeFiPositions: wrappedData.defiProtocols.length > 0,
    defiProtocols: wrappedData.defiProtocols,
    defiTotalValue: 0, // HARDCODED - not available from API
    badges: [],
  };

  // Act 3 data - currently not available from API, keeping as hardcoded
  const act3 = {
    totalStakedSTRK: 0, // HARDCODED - native staking data not in current queries
    totalStakedBTC: 0, // HARDCODED - native staking data not in current queries
    validators: [],
    nativeAPR: 0,
    rewardsEarnedUSD: 0,
    stakingDays: 0,
    firstStakeDate: 'Unknown',
    isOGStaker: false,
    hasBTCStake: wrappedData.hasBtcStake,
    btcStakeAmount: 0,
    numberOfValidators: 0,
    rewardsClaimed: 0,
    claimFrequency: 'moderate' as 'active' | 'moderate' | 'lazy',
    avgDaysBetweenClaims: 30,
    hasSmallValidators: false,
    smallValidatorCount: 0,
    badges: [],
  };

  return {
    address: walletAddresses.join(', ') || '0x...',
    act1,
    act2,
    act3,
  };
}
