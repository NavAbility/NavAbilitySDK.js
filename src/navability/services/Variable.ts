import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import { Client } from '../entities/Client';
import { Variable, QueryDetail } from '../entities/Variable';
import { MUTATION_ADDVARIABLE } from '../graphql/QueriesDeprecated';
import { GQL_FRAGMENT_VARIABLES, GQL_GETVARIABLE, GQL_GETVARIABLES } from '../graphql/Variable';

function dump(variable: Variable) {
  return JSON.stringify(variable);
}

export async function addVariable(navAbilityClient: NavAbilityClient, client: Client, variable: Variable) {
  const response = await navAbilityClient.mutate({
    mutation: gql(MUTATION_ADDVARIABLE),
    variables: {
      variable: {
        client,
        packedData: dump(variable),
      },
    },
  });
}

export async function getVariable(navAbilityClient: NavAbilityClient, client: Client, label: string): Promise<any> {
  const response = await navAbilityClient.query({
    query: gql(
      `
      ${GQL_FRAGMENT_VARIABLES}
      ${GQL_GETVARIABLE}
      `,
    ),
    variables: {
      ...client,
      label,
      fields_summary: true,
    },
  });
  if (response.Data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.Data.data.USER[0].robots[0].session[0].variables[0];
  }
}

export async function getVariables(
  navAbilityClient: NavAbilityClient,
  client: Client,
  detail: QueryDetail = QueryDetail.SKELETON,
): Promise<any[]> {
  const response = await navAbilityClient.query({
    query: gql(
      `
      ${GQL_FRAGMENT_VARIABLES}
      ${GQL_GETVARIABLES}
      `,
    ),
    fetchPolicy: 'network-only',
    variables: {
      ...client,
      fields_summary: detail === QueryDetail.SUMMARY,
      fields_full: detail === QueryDetail.FULL,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.data.errors[0]}`);
  } else {
    const result = response.data?.USER[0]?.robots[0]?.sessions[0]?.variables || [];
    return result;
  }
}

export async function ls(navAbilityClient: NavAbilityClient, client: Client): Promise<string[]> {
  const variables: any[] = await getVariables(navAbilityClient, client);
  return variables.map((v) => v.label);
}
