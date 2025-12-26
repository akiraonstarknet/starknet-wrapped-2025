// GraphQL API Response Types

export interface StakingStats {
  maxStrkStaked: string;
  minStrkStaked: string;
}

export interface Season1RankInfo {
  rank?: number;
  weightedPoints?: string;
}

export interface WrappedDataResponse {
  maxStrkStaked: string;
  minStrkStaked: string;
  maxBtcStaked: string;
  minBtcStaked: string;
  avgLiquidityInTrovesLpUsdTotal: string;
  avgLiquidityInTrovesLpUsdStrk: string;
  avgLiquidityInTrovesLpUsdBtc: string;
  daysNonZeroLiquidityInTrovesLp: number;
  avgLiquidityInEkuboLpUsdTotal: string;
  avgLiquidityInEkuboLpUsdStrk: string;
  avgLiquidityInEkuboLpUsdBtc: string;
  daysNonZeroLiquidityInEkuboLp: number;
  days100XstrkHeldThroughLows: number;
  avgXstrkInTrovesHyperOrSensei: string;
  avgXbtcInTrovesHyper: string;
  avgXstrkInVesu: string;
  avgXbtcInVesu: string;
  avgBorrowedInVesu: string;
  daysStrkStaked?: number;
  firstStrkStakedDate?: string;
  daysBtcStaked?: number;
  firstBtcStakedDate?: string;
  season1Rank?: Season1RankInfo;
}

export interface JourneyDataResponse {
  startedSince?: number;
  totalTransactions: number;
  gaslessTransactionsCount: number;
  gasSaved: string; // in wei
  protocolsExplored: string[];
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}
