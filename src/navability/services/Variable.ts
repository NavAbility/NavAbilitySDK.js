import { gql } from '@apollo/client'

import { NavAbilityClient } from '../entities/NavAbilityClient'
import { Client } from '../entities/Client'
import { Variable } from '../entities/Variable'
import { MUTATION_ADDVARIABLE, QUERY_VARIABLE, QUERY_VARIABLES } from '../entities/Queries'

function dump(variable: Variable) {
    return JSON.stringify(variable)
}

export async function addVariable(navAbilityClient: NavAbilityClient, client: Client, variable: Variable) {
    const response = await navAbilityClient.mutate({
        mutation: gql(MUTATION_ADDVARIABLE),
        variables: {
            variable: {
                client: client,
                packedData: dump(variable)
            }
        }
    })
}

export async function getVariable(navAbilityClient:NavAbilityClient, client:Client, label:string):Promise<any> {
    const response = await navAbilityClient.query({
        query: gql(QUERY_VARIABLE),
        variables: {
            "label":label,
            "userId":client.userId,
            "robotId":client.robotId,
            "sessionId":client.sessionId
        }
    })
    if(response.Data.errors) {
        throw(`Error: ${response.Data.errors[0]}`)
    } else {
        return response.Data.data.USER[0].robots[0].session[0].variables[0]
    }
}

export async function getVariables(navAbilityClient:NavAbilityClient, client:Client):Promise<any[]> {
    const response = await navAbilityClient.query({
        query: gql(QUERY_VARIABLES),
        fetchPolicy: "network-only",
        variables: {
            "userId": client.userId,
            "robotId": client.robotId,
            "sessionId": client.sessionId
        }
    })
    if(response.data.errors) {
        throw(`Error: ${response.data.errors[0]}`)
    } else {
        return response.data?.USER[0]?.robots[0]?.sessions[0]?.variables || []
    }
}

export async function ls(navAbilityClient:NavAbilityClient, client:Client):Promise<string[]> {
    const variables:any[] = await getVariables(navAbilityClient,client)
    return variables.map(v => v.label)
}