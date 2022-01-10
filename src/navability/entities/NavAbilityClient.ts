import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

export interface QueryOptions {
  query: any;
  variables?: any;
  fetchPolicy?: any;
}

export interface MutationOptions {
  mutation: any;
  variables?: any;
  fetchPolicy?: any;
}

export interface NavAbilityClient {
  query: (options: QueryOptions) => Promise<any>;
  mutate: (options: MutationOptions) => Promise<any>;
}

export function NavAbilityWebsocketClient(apiUrl: string): NavAbilityClient {
  throw Error('Not implemented yet');
}

export function NavAbilityHttpsClient(apiUrl: string): NavAbilityClient {
  const cache = new InMemoryCache();
  const link = createHttpLink({ uri: apiUrl, fetch });
  return new ApolloClient({ link, cache });
}
