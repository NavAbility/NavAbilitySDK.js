import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { CalibrationResult } from '../entities/Dataproc';
import { MUTATION_PROC_CALIBRATION, QUERY_CALIBRATION } from '../graphql/QueriesDeprecated';

export async function procCalibration(navAbilityClient: NavAbilityClient, fileId: string): Promise<void> {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_PROC_CALIBRATION),
    variables: {
      fileId,
    },
  });
}

export async function calibration(navAbilityClient: NavAbilityClient, fileId: string): Promise<CalibrationResult> {
  try {
    const result = await navAbilityClient.query({
      fetchPolicy: 'network-only',
      query: gql(QUERY_CALIBRATION),
      variables: {
        fileId,
      },
    });
    return result.data.calibration;
  } catch (e) {
    return {
      placeholder: 'error',
    };
  }
}
