import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client } from '../entities/Client';
import { Factor } from '../entities/Factor';
import { MUTATION_ADDFACTOR, QUERY_FACTORS } from '../entities/Queries';

function dump(factor: Factor) {
  return JSON.stringify(factor);
}

export async function addFactor(navAbilityClient: NavAbilityClient, client: Client, factor: Factor) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_ADDFACTOR),
    variables: {
      factor: {
        client,
        packedData: dump(factor),
      },
    },
  });
}

export async function getFactors(navAbilityClient: NavAbilityClient, client: Client): Promise<any[]> {
  const response = await navAbilityClient.query({
    query: gql(QUERY_FACTORS),
    fetchPolicy: 'network-only',
    variables: {
      userId: client.userId,
      robotId: client.robotId,
      sessionId: client.sessionId,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.data?.USER[0]?.robots[0]?.sessions[0]?.factors || [];
  }
}

export async function lsf(navAbilityClient: NavAbilityClient, client: Client): Promise<string[]> {
  const factors = await getFactors(navAbilityClient, client);
  return factors.map((f) => f.label);
}
