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
  stakingStats: StakingStats;
  hasBtcStake: boolean;
  hadStakeBeforeMay26: boolean;
  hasMinStakingDuration: boolean;
  stakingDurationDays: number;
  heldXstrkDuringLowPrice: boolean;
  season1Rank?: Season1RankInfo;
  hasQualifyingLpPosition: boolean;
  defiProtocols: string[];
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
