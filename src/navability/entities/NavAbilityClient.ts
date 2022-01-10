export interface QueryOptions {
    query: any,
    variables?: any,
    fetchPolicy?: any
}

export interface MutationOptions {
    mutation: any,
    variables?: any,
    fetchPolicy?: any
}

export interface NavAbilityClient {
    query: (options:QueryOptions) => Promise<any>
    mutate: (options:MutationOptions) => Promise<any>

}