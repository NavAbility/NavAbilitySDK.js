import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client } from '../entities/Client';
import { Factor } from '../entities/Factor';
import { MUTATION_ADDFACTOR } from '../graphql/QueriesDeprecated';
import { GQL_FRAGMENT_FACTORS, GQL_GETFACTOR, GQL_GETFACTORS } from '../graphql/Factor';

function dump(factor: Factor) {
  return JSON.stringify(factor);
}

// export async function addFactor(navAbilityClient: NavAbilityClient, client: Client, factor: Factor) {
//   const response = await navAbilityClient.mutate({
//     mutation: gql(MUTATION_ADDFACTOR),
//     variables: {
//       factor: {
//         client,
//         packedData: dump(factor),
//       },
//     },
//   });
// }

export async function getFactor(navAbilityClient: NavAbilityClient, client: Client, label: string): Promise<any> {
  const response = await navAbilityClient.query({
    query: gql(
      `
      ${GQL_FRAGMENT_FACTORS}
      ${GQL_GETFACTOR}
      `,
    ),
    fetchPolicy: 'network-only',
    variables: {
      ...client,
      factorLabel: label,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.data?.users[0]?.robots[0]?.sessions[0]?.factors[0] || {};
  }
}

export async function getFactors(navAbilityClient: NavAbilityClient, client: Client): Promise<any[]> {
  const response = await navAbilityClient.query({
    query: gql(
      `
      ${GQL_FRAGMENT_FACTORS}
      ${GQL_GETFACTORS}
      `,
    ),
    fetchPolicy: 'network-only',
    variables: {
      ...client,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.data?.users[0]?.robots[0]?.sessions[0]?.factors || [];
  }
}

export async function listFactors(navAbilityClient: NavAbilityClient, client: Client): Promise<string[]> {
  const factors = await getFactors(navAbilityClient, client);
  return factors.map((f) => f.label);
}

export async function lsf(navAbilityClient: NavAbilityClient, client: Client): Promise<string[]> {
  return listFactors(navAbilityClient, client);
}
