import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client } from '../entities/Client';
import { MUTATION_DEMOCANONICALHEXAGONAL } from '../entities/Queries';

export function demoCanonicalHexagonal(navAbilityClient: NavAbilityClient, client: Client) {
  navAbilityClient.mutate({
    mutation: gql(MUTATION_DEMOCANONICALHEXAGONAL),
    variables: {
      client,
    },
  });
}
