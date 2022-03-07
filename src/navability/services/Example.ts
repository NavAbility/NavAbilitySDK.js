import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client } from '../entities/Client';
import { MUTATION_DEMOCANONICALHEXAGONAL } from '../graphql/QueriesDeprecated';

export async function demoCanonicalHexagonal(navAbilityClient: NavAbilityClient, client: Client) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_DEMOCANONICALHEXAGONAL),
    variables: {
      client,
    },
  });
}
