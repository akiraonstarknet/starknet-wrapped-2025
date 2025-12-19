import { GraphQLClient } from 'graphql-request';
import type { WrappedDataResponse, JourneyDataResponse } from '../types/api';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql';

const client = new GraphQLClient(GRAPHQL_ENDPOINT);

// Query: getWrappedData
const GET_WRAPPED_DATA_QUERY = `
  query GetWrappedData($userAddresses: [String!]!) {
    getWrappedData(userAddresses: $userAddresses) {
      stakingStats {
        maxStrkStaked
        minStrkStaked
      }
      hasBtcStake
      hadStakeBeforeMay26
      hasMinStakingDuration
      stakingDurationDays
      heldXstrkDuringLowPrice
      season1Rank {
        rank
        weightedPoints
      }
      hasQualifyingLpPosition
      defiProtocols
    }
  }
`;

// Query: getJourneyData
const GET_JOURNEY_DATA_QUERY = `
  query GetJourneyData($userAddresses: [String!]!) {
    getJourneyData(userAddresses: $userAddresses) {
      startedSince
      totalTransactions
      gaslessTransactionsCount
      gasSaved
      protocolsExplored
    }
  }
`;

export async function fetchWrappedData(userAddresses: string[]): Promise<WrappedDataResponse> {
  try {
    const data = await client.request<{ getWrappedData: WrappedDataResponse }>(
      GET_WRAPPED_DATA_QUERY,
      { userAddresses }
    );
    return data.getWrappedData;
  } catch (error) {
    console.error('Error fetching wrapped data:', error);
    throw error;
  }
}

export async function fetchJourneyData(userAddresses: string[]): Promise<JourneyDataResponse> {
  try {
    const data = await client.request<{ getJourneyData: JourneyDataResponse }>(
      GET_JOURNEY_DATA_QUERY,
      { userAddresses }
    );
    return data.getJourneyData;
  } catch (error) {
    console.error('Error fetching journey data:', error);
    throw error;
  }
}

export async function fetchAllWrappedData(userAddresses: string[]) {
  try {
    const [wrappedData, journeyData] = await Promise.all([
      fetchWrappedData(userAddresses),
      fetchJourneyData(userAddresses),
    ]);
    return { wrappedData, journeyData };
  } catch (error) {
    console.error('Error fetching all wrapped data:', error);
    throw error;
  }
}
