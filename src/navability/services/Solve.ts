import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client, Scope } from '../entities/Client';
import { MUTATION_SOLVESESSION, MUTATION_SOLVEFEDERATED } from '../entities/Queries';

export function solveSession(navAbilityClient: NavAbilityClient, client: Client) {
  navAbilityClient.mutate({
    mutation: gql(MUTATION_SOLVESESSION),
    variables: {
      client,
    },
  });
}

export function solveFederated(navAbilityClient: NavAbilityClient, scope: Scope) {
  navAbilityClient.mutate({
    mutation: gql(MUTATION_SOLVEFEDERATED),
    variables: {
      scope,
    },
  });
}
