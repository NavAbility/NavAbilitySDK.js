import { gql } from '@apollo/client'

import { NavAbilityClient } from '../entities/NavAbilityClient'
import { Client } from '../entities/Client'
import { Variable } from '../entities/Variable'
import { MUTATION_ADDVARIABLE } from '../entities/Queries'

function dump(variable: Variable) {
    return JSON.stringify(variable)
}

export function addVariable(navAbilityClient: NavAbilityClient, client: Client, variable: Variable ) {
    navAbilityClient.mutate({
        mutation: gql(MUTATION_ADDVARIABLE),
        variables: {
            variable: {
                client: client,
                packedData: dump(variable)
            }
        }
    })
}