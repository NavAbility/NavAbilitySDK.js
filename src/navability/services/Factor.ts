import { gql } from '@apollo/client'

import { NavAbilityClient } from '../entities/NavAbilityClient'
import { Client } from '../entities/Client'
import { Factor } from '../entities/Factor'
import { MUTATION_ADDFACTOR } from '../entities/Queries'

function dump(factor: Factor) {
    return JSON.stringify(factor)
}

export function addFactor(navAbilityClient: NavAbilityClient, client: Client, factor: Factor ) {
    navAbilityClient.mutate({
        mutation: gql(MUTATION_ADDFACTOR),
        variables: {
            factor: {
                client: client,
                packedData: dump(factor)
            }
        }
    })
}