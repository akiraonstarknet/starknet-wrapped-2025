// User Data Types (shared between App and mapper)

export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  criteria?: string;
}

export interface ValidatorInfo {
  name: string;
  amountStaked: number;
  icon?: string;
}

export interface UserWrappedData {
  address: string;
  act1: {
    accountAge: number;
    firstTxDate: string;
    totalTransactions: number;
    gasSavedUSD: number;
    gasSavedETH: number;
    mostActiveMonth: string;
    totalValueTransacted: number;
    uniqueContracts: number;
    topDapp: string;
    topDappTransactions: number;
    badges: Badge[];
    gaslessTransactionsCount: number;
  };
  act2: {
    xSTRKHoldings: number;
    xSTRKValueUSD: number;
    protocolsUsed: string[];
    lpPositions: number;
    avgAPR: number;
    season1Points: number;
    season1Rank: string;
    stakingDays: number;
    minStakedSTRK: number;
    maxStakedSTRK: number;
    minStakedBTC: number;
    maxStakedBTC: number;
    strkValueUSD: number;
    btcValueUSD: number;
    userRank: number;
    isTop1000: boolean;
    hasLPPosition: boolean;
    lpValue: number;
    lpDuration: number;
    lpProtocol: string;
    endurStakingDays: number;
    isLongTermStaker: boolean;
    isDiamondHand: boolean;
    maxXSTRKHeld: number;
    hasDeFiPositions: boolean;
    defiProtocols: string[];
    defiTotalValue: number;
    badges: Badge[];
    // New fields for ACT 1 cards
    daysStrkStaked?: number;
    firstStrkStakedDate?: string;
    strkEra?: 'og' | 'early' | 'mainnet' | 'none';
    firstStakeDaysSinceLaunch: number;
    daysBtcStaked?: number;
    firstBtcStakedDate?: string;
    btcEra?: '7d' | '7d+' | 'none';
    firstStakeDaysSinceBtcLaunch: number;
    // Liquidity fields
    avgLiquidityInTrovesLpUsdTotal: number;
    avgLiquidityInEkuboLpUsdTotal: number;
    daysNonZeroLiquidityInTrovesLp: number;
    daysNonZeroLiquidityInEkuboLp: number;
    // Leverage fields
    avgXstrkInTrovesHyperOrSensei: number;
    avgXbtcInTrovesHyper: number;
    // Vesu fields
    avgXstrkInVesu: number;
    avgXbtcInVesu: number;
    avgBorrowedInVesu: number;
    // Diamond hands
    days100XstrkHeldThroughLows: number;
  };
  act3: {
    totalStakedSTRK: number;
    totalStakedBTC: number;
    validators: ValidatorInfo[];
    nativeAPR: number;
    rewardsEarnedUSD: number;
    stakingDays: number;
    firstStakeDate: string;
    isOGStaker: boolean;
    hasBTCStake: boolean;
    btcStakeAmount: number;
    numberOfValidators: number;
    rewardsClaimed: number;
    claimFrequency: string;
    avgDaysBetweenClaims: number;
    hasSmallValidators: boolean;
    smallValidatorCount: number;
    badges: Badge[];
  };
}
