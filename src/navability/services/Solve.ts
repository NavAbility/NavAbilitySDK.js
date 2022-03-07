import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client, Scope } from '../entities/Client';
import { MUTATION_SOLVESESSION, MUTATION_SOLVEFEDERATED } from '../graphql/QueriesDeprecated';

export async function solveSession(navAbilityClient: NavAbilityClient, client: Client) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_SOLVESESSION),
    variables: {
      client,
    },
  });
}

export async function solveFederated(navAbilityClient: NavAbilityClient, scope: Scope) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_SOLVEFEDERATED),
    variables: {
      scope,
    },
  });
}
