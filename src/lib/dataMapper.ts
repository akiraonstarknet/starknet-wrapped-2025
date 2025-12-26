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
function daysSince(fromDate: number, toDate: number = Date.now() / 1000): number {
  return Math.floor((toDate - fromDate) / 86400);
}

export const STRK_LAUNCH_DATE = new Date('2024-11-26T00:00:00Z');

// Helper: Calculate STRK era based on first stake date
// STRK launch: Nov 26, 2024
// OG: First month (Nov 26 - Dec 26, 2024)
// Early Adopter: 1-6 months (Dec 26, 2024 - May 26, 2025)
// Mainnet Native: After 6 months (May 26, 2025+)
function calculateStrkEra(firstStakeDate?: string): 'og' | 'early' | 'mainnet' | 'none' {
  if (!firstStakeDate) return 'none';
  
  const launchDate = STRK_LAUNCH_DATE;
  const firstStake = new Date(firstStakeDate);
  const oneMonthLater = new Date(launchDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const sixMonthsLater = new Date(launchDate);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  
  // If staked before launch, treat as within 7 days (OG)
  if (firstStake < launchDate) {
    const daysBeforeLaunch = (launchDate.getTime() - firstStake.getTime()) / (1000 * 60 * 60 * 24);
    if (daysBeforeLaunch <= 7) return 'og';
  }
  
  if (firstStake <= oneMonthLater) return 'og';
  if (firstStake <= sixMonthsLater) return 'early';
  return 'mainnet';
}

const BTC_LAUNCH_DATE = new Date('2025-10-01T00:00:00Z');

// Helper: Calculate BTC era based on first stake date
// BTC launch: Oct 1, 2025
// 7d: Within 7 days of launch (Oct 1 - Oct 8, 2025)
// 7d+: After 7 days (Oct 8, 2025+)
function calculateBtcEra(firstStakeDate?: string): '7d' | '7d+' | 'none' {
  if (!firstStakeDate) return 'none';
  
  const launchDate = BTC_LAUNCH_DATE;
  const firstStake = new Date(firstStakeDate);
  const sevenDaysLater = new Date(launchDate);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
  
  // If staked before launch, treat as within 7 days
  if (firstStake < launchDate) {
    const daysBeforeLaunch = (launchDate.getTime() - firstStake.getTime()) / (1000 * 60 * 60 * 24);
    if (daysBeforeLaunch <= 7) return '7d';
  }
  
  if (firstStake <= sevenDaysLater) return '7d';
  return '7d+';
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
  const maxStrkStaked = Number(wrappedData.maxStrkStaked);
  const minStrkStaked = Number(wrappedData.minStrkStaked);
  const maxBtcStaked = Number(wrappedData.maxBtcStaked || '0');
  const minBtcStaked = Number(wrappedData.minBtcStaked || '0');

  // Compute derived fields from available data
  const daysStrkStaked = wrappedData.daysStrkStaked || 0;
  const stakingDurationDays = daysStrkStaked;
  const hasMinStakingDuration = daysStrkStaked >= 90;
  const heldXstrkDuringLowPrice = (wrappedData.days100XstrkHeldThroughLows || 0) > 0;
  
  // Compute hasQualifyingLpPosition from liquidity fields
  const avgLiquidityInTrovesLpUsdTotal = Number(wrappedData.avgLiquidityInTrovesLpUsdTotal || '0');
  const avgLiquidityInEkuboLpUsdTotal = Number(wrappedData.avgLiquidityInEkuboLpUsdTotal || '0');
  const hasQualifyingLpPosition = avgLiquidityInTrovesLpUsdTotal > 0 || avgLiquidityInEkuboLpUsdTotal > 0;
  
  // Compute defiProtocols from available data
  const defiProtocols: string[] = [];
  if (Number(wrappedData.avgXstrkInTrovesHyperOrSensei || '0') > 0) {
    defiProtocols.push('xSTRK Sensei');
  }
  if (Number(wrappedData.avgXbtcInTrovesHyper || '0') > 0) {
    defiProtocols.push('Hyper');
  }
  if (Number(wrappedData.avgXstrkInVesu || '0') > 0 || 
      Number(wrappedData.avgXbtcInVesu || '0') > 0 || 
      Number(wrappedData.avgBorrowedInVesu || '0') > 0) {
    defiProtocols.push('Vest');
  }
  if (avgLiquidityInTrovesLpUsdTotal > 0) {
    defiProtocols.push('Troves LP');
  }
  if (avgLiquidityInEkuboLpUsdTotal > 0) {
    defiProtocols.push('Ekubo LP');
  }

  const act2 = {
    xSTRKHoldings: maxStrkStaked, // Using max as current holdings
    xSTRKValueUSD: 0, // HARDCODED - needs current STRK price
    protocolsUsed: defiProtocols,
    lpPositions: hasQualifyingLpPosition ? 1 : 0,
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
    stakingDays: stakingDurationDays,
    minStakedSTRK: minStrkStaked,
    maxStakedSTRK: maxStrkStaked,
    minStakedBTC: minBtcStaked,
    maxStakedBTC: maxBtcStaked,
    strkValueUSD: 0, // HARDCODED - needs current price
    btcValueUSD: 0, // HARDCODED - needs current price
    userRank: wrappedData.season1Rank?.rank || 0,
    isTop1000: (wrappedData.season1Rank?.rank || 0) <= 1000 && (wrappedData.season1Rank?.rank || 0) > 0,
    hasLPPosition: hasQualifyingLpPosition,
    lpValue: 0, // HARDCODED - not available from API
    lpDuration: 0, // HARDCODED - not available from API
    lpProtocol: 'Unknown', // HARDCODED - not available from API
    endurStakingDays: stakingDurationDays,
    isLongTermStaker: hasMinStakingDuration,
    isDiamondHand: heldXstrkDuringLowPrice,
    maxXSTRKHeld: maxStrkStaked,
    hasDeFiPositions: defiProtocols.length > 0,
    defiProtocols,
    defiTotalValue: 0, // HARDCODED - not available from API
    badges: [],
    // New fields for ACT 1 cards
    daysStrkStaked: wrappedData.daysStrkStaked,
    firstStrkStakedDate: wrappedData.firstStrkStakedDate,
    strkEra: calculateStrkEra(wrappedData.firstStrkStakedDate),
    firstStakeDaysSinceLaunch: wrappedData.firstStrkStakedDate ? daysSince(STRK_LAUNCH_DATE.getTime() / 1000, new Date(wrappedData.firstStrkStakedDate).getTime() / 1000) : 0,
    daysBtcStaked: wrappedData.daysBtcStaked,
    firstBtcStakedDate: wrappedData.firstBtcStakedDate,
    btcEra: calculateBtcEra(wrappedData.firstBtcStakedDate),
    firstStakeDaysSinceBtcLaunch: wrappedData.firstBtcStakedDate ? daysSince(BTC_LAUNCH_DATE.getTime() / 1000, new Date(wrappedData.firstBtcStakedDate).getTime() / 1000) : 0,
    // Liquidity fields
    avgLiquidityInTrovesLpUsdTotal,
    avgLiquidityInEkuboLpUsdTotal,
    daysNonZeroLiquidityInTrovesLp: wrappedData.daysNonZeroLiquidityInTrovesLp || 0,
    daysNonZeroLiquidityInEkuboLp: wrappedData.daysNonZeroLiquidityInEkuboLp || 0,
    // Leverage fields
    avgXstrkInTrovesHyperOrSensei: Number(wrappedData.avgXstrkInTrovesHyperOrSensei || '0'),
    avgXbtcInTrovesHyper: Number(wrappedData.avgXbtcInTrovesHyper || '0'),
    // Vesu fields
    avgXstrkInVesu: Number(wrappedData.avgXstrkInVesu || '0'),
    avgXbtcInVesu: Number(wrappedData.avgXbtcInVesu || '0'),
    avgBorrowedInVesu: Number(wrappedData.avgBorrowedInVesu || '0'),
    // Diamond hands
    days100XstrkHeldThroughLows: wrappedData.days100XstrkHeldThroughLows || 0,
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
    hasBTCStake: Number(wrappedData.minBtcStaked) > 0,
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
