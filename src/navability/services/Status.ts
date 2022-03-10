import { gql } from '@apollo/client';
import { NavAbilityClient, GQL_GETSTATUSLATEST, GQL_GETSTATUSMESSAGES } from '../..';

export async function getStatusMessages(navAbilityClient: NavAbilityClient, id: string) {
  const response = await navAbilityClient.query({
    query: gql(GQL_GETSTATUSMESSAGES),
    variables: {
      id,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.data?.statusMessages || [];
  }
}

export async function getStatusLatest(navAbilityClient: NavAbilityClient, id: string) {
  const response = await navAbilityClient.query({
    query: gql(GQL_GETSTATUSLATEST),
    variables: {
      id,
    },
  });
  if (response.data.errors) {
    throw Error(`Error: ${response.Data.errors[0]}`);
  } else {
    return response.data?.statusLatest || [];
  }
}

export async function getStatusesLatest(navAbilityClient: NavAbilityClient, ids: string[]) {
  const statusPromises = ids.map((id) => getStatusLatest(navAbilityClient, id));
  return await Promise.all(statusPromises);
}
